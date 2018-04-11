pragma solidity ^0.4.18;
contract AMassets {

//Document Status:
//   0 = "DRAFT"
//   1 = "APPROVED"
//   2 = "REFUSED"

//User Roles:
//   1 = "Asset Manager"
//   2 = "Regulator"

 struct DocSruct {
  string name;
  string isin;
  string docType;
  bool isnew;
  address senderAddress;
  uint timestamp;
  address validatorAddress;
  uint validationtimestamp;
  int status;
  }

  mapping(string => DocSruct) private documents;
  mapping(address => int) private roles;
  mapping(address => string) private urls;
  mapping(address => string) private address_doc_repos;

  address admin;

  event userAdded(address indexed add, int role, string doc_repos);
  event docRegistered(address indexed add, string hash,  string name, uint timestamp, int status);
  event docApproved(address indexed add, string hash, string name, int status);
  event docRefused(address indexed add, string hash, string name, int status);
  event newVersion(address indexed add, string hash,  string name, uint timestamp, int status);

  function AssetManagement() public{
      admin = msg.sender;
  }

  modifier onlyAdmin {
      require(msg.sender == admin);
      _;
  }

  modifier onlyAssetManagers {
      require(roles[msg.sender] == 1) ;
      _;
  }

  modifier onlyRegulators {
      require(roles[msg.sender] == 2) ;
      _;
  }

  function addUser(address _add, int _role, string _url) public onlyAdmin{
      if(roles[_add] != 0) revert();
      roles[_add] = _role;
      urls[_add] = _url;
      userAdded(msg.sender, _role, _url);
  }

  function insertDoc(string _doc_hash, string _name, string _isin, string _doctype, bool _isnew, uint _timestamp) public onlyAssetManagers{
      if(documents[_doc_hash].timestamp != 0) revert(); // Can't overwrite a doc already inserted
      documents[_doc_hash] = DocSruct(_name, _isin, _doctype, _isnew, msg.sender, _timestamp, 0, 0, 0); // Insert doc with status draft
      docRegistered(msg.sender, _doc_hash, documents[_doc_hash].name, documents[_doc_hash].timestamp, documents[_doc_hash].status);
  }

  function approveDoc(string _hash, uint _timestamp) public onlyRegulators{
      documents[_hash].status = 1;
      documents[_hash].validatorAddress = msg.sender;
      documents[_hash].validationtimestamp = _timestamp;
      docApproved(msg.sender, _hash, documents[_hash].name, documents[_hash].status);
  }

  function refuseDoc(string _hash) public onlyRegulators{
      documents[_hash].status = 2;
      docRefused(msg.sender, _hash, documents[_hash].name, documents[_hash].status);
  }

  function getRole(address _address) view public returns (int){
      return roles[_address];
  }

  function getDocValidations(string _hash) view public returns (address, uint, address, uint){
      return (documents[_hash].senderAddress, documents[_hash].timestamp, documents[_hash].validatorAddress, documents[_hash].validationtimestamp);
  }

  function getDocInfos(string _hash) view public returns (string, string, string, bool, int, string){
      return (documents[_hash].name, documents[_hash].isin, documents[_hash].docType, documents[_hash].isnew, documents[_hash].status, urls[documents[_hash].senderAddress]);
  }
}