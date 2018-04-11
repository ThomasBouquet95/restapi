pragma solidity ^0.4.18;

contract AssetManagement {
   /*
   
   Status:
   0 = "DRAFT"
   1 = "APPROVED"
   2 = "REFUSED"
   
   */
  struct DocSruct {
   string name;
   uint timestamp;
   int status;
   uint originalDoc;
   }

   mapping(uint => DocSruct) private documents;
   mapping(address => int) private roles;
   
   address admin;
   
   event addressRegistered(address indexed add, int role);
   event docRegistered(address indexed add, uint hash,  string name, uint timestamp, int status);
   event docApproved(address indexed add, uint hash, string name, int status);
   event docRefused(address indexed add, uint hash, string name, int status);
   event newVersion(address indexed add, uint hash,  string name, uint timestamp, int status);
   
   
   function AssetManagement() public{
       admin = msg.sender;
   }
   
   modifier onlyAdmin {
       require(msg.sender == admin);
       _;
   }
   
   modifier onlyAssetManagers {
       require(roles[msg.sender] == 1);
	 _;
   }
   
   modifier onlyRegulators {
       require(roles[msg.sender] == 2);
	_;
   }
   
   modifier onlyDistributors {
       require(roles[msg.sender] == 3); _;
   }
   
   function addAddress(address _add, int _type) public onlyAdmin{
       if(roles[_add] != 0) revert();
       roles[_add] = _type;
       addressRegistered(msg.sender, _type);
   }
   
   function insertDoc(uint _hash, string _name, uint _timestamp, uint _hashP) public onlyAssetManagers{
       if(documents[_hash].timestamp != 0) revert();
       documents[_hash] = DocSruct(_name, _timestamp, 0, _hashP);
       if(_hashP == 0){
           docRegistered(msg.sender, _hash, documents[_hash].name, documents[_hash].timestamp, documents[_hash].status);
       }else{
           newVersion(msg.sender, _hash, documents[_hash].name, documents[_hash].timestamp, documents[_hash].status);
       }
   }
   
   function inserNewDoc(uint _hash, string _name, uint _timestamp) public onlyAssetManagers{
      insertDoc(_hash, _name,_timestamp, 0);
   }
   
   function approvedDoc(uint _hash) public onlyRegulators{
       documents[_hash].status = 1;
       docApproved(msg.sender, _hash, documents[_hash].name, documents[_hash].status);
   }
   
   function refusedDoc(uint _hash) public onlyRegulators{
       documents[_hash].status = 2;
       docRefused(msg.sender, _hash, documents[_hash].name, documents[_hash].status);
   }
   
   function getRole(address _address) view public returns (int){
       return roles[_address];
   } 
   
   function getDoc(uint _hash) view public returns (string, uint, int, uint){
       return (documents[_hash].name, documents[_hash].timestamp,documents[_hash].status, documents[_hash].originalDoc);
   }
}


