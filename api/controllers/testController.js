//If using blockchain (web3), uncomment the line bellow ...
//const library = require('../blockchain/library')


// define your functions here

exports.helloworld = function (req, res, next) {
    res.status(200).json({Message: "Hello World"})
}

// Other examples bellow


/*
exports.getDocument = function(req, res, next){
    document.findById(req.params.id, function(err, doc){
        if (err) {
            return res.status(400).json(err);
        }
        res.status(200).json(doc);
    });
}


exports.getAllDrafts = function(req, res, next){
    console.log("get all drafts!");
    library.asset.docRegistered({},{
     fromBlock: 0,
     toBlock: 'latest'
     }).get(function(error, events){
        res.status(200).json(events);
     });
};



exports.getAllApproved = function(req, res, next){
    console.log("get all approved docs!");
    library.asset.docApproved({},{
     fromBlock: 0,
     toBlock: 'latest'
     }).get(function(error, events){
        res.status(200).json(events);
     });
};


exports.getAllRefused = function(req, res, next){
    console.log("get all refused docs!");
    library.asset.docRefused({},{
     fromBlock: 0,
     toBlock: 'latest'
     }).get(function(error, events){
        res.status(200).json(events);
     });
};

exports.approveDraft = function(req, res, next){
    var userPublicAddress = req.body.publicAddress;
    var userEncryptionPassword = req.body.password;
    var unlocked = library.web3.personal.unlockAccount(userPublicAddress, userEncryptionPassword);
     if(!unlocked){
        return res.status(403).json({Message: "Wrong address / password"});
    }
    console.log(userPublicAddress +"  unlocked!!");
    var documentHash = req.body.documentHash;
    var txHash = library.asset.approvedDoc(documentHash, {from: userPublicAddress});
    console.log("Document Approval request sent. TxHash :"+txHash);
    if(txHash){
        res.status(201).json({Transaction: txHash});
    }
};

exports.publishDraft = function(req, res, next){
    var userPublicAddress = req.body.publicAddress;
    var userEncryptionPassword = req.body.password;
    var documentHash = req.body.documentHash;
    var parentHash =req.body.parentHash;
    var documentName = req.body.documentName;
    var documentDate = req.body.documentDate;
    var unlocked = library.web3.personal.unlockAccount(userPublicAddress, userEncryptionPassword);

    if(!unlocked){
        return res.status(403).json({Message: "Wrong address / password"});
    }
    console.log(userPublicAddress +"  unlocked!!");
    var txHash = library.asset.insertDoc(documentHash, documentName, documentDate, parentHash, {from: userPublicAddress});
    console.log("insert Document request sent. TxHash :"+txHash);

    return res.status(201).json({Transaction: txHash});
};


exports.refuseDraft = function(req, res, next){
    var userPublicAddress = req.body.publicAddress;
    var userEncryptionPassword = req.body.password;
    var unlocked = library.web3.personal.unlockAccount(userPublicAddress, userEncryptionPassword);
     if(!unlocked){
        return res.status(403).json({Message: "Wrong address / password"});
    }
    console.log(userPublicAddress +"  unlocked!!");
    var documentHash = req.body.documentHash;
    var txHash = library.asset.refusedDoc(documentHash, {from: userPublicAddress});
    console.log("Document Refusal request sent. TxHash :"+txHash);
    if(txHash){
        res.status(201).json({Transaction: txHash});
    }
};

*/