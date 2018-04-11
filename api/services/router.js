//var documentController = require('../controllers/documentController');
//var userController = require('../controllers/userController');
var testController = require('../controllers/testController');
var router = require("express").Router();

router.route("/testController")
    .get(documentController.getAllDrafts);

/* Define your path here !
router.route("/drafts")
    .get(documentController.getAllDrafts)
    .post(documentController.publishDraft);

router.route("/approved")
    .get(documentController.getAllApproved);

router.route("/refused")
    .get(documentController.getAllRefused);


router.route("/drafts/:id/approve")
    .post(documentController.approveDraft);


router.route("/drafts/:id/refuse")
    .post(documentController.refuseDraft);


router.route("/signup")
    .post(userController.signup)


router.route("/login")
    .post(userController.login)

router.route("/users/:address/role")
    .post(userController.add_role)


router.route("/signup")
    .post(userController.signup);


router.route("/login")
    .post(userController.login);

router.route("/user/:id/give-role")
    .post(userController.giveRole);
*/

module.exports = router;
