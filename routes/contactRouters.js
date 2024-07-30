const express = require('express');
const router = express.Router();
const {getContacts,getContactsbyId,createContact,updateContact,deleteContact} = require('../controller/contactController');
const validationToken = require('../middleware/validationHandler');

router.use(validationToken);
router.route(`/`).get(getContacts).post(createContact);
router.route(`/:id`).get(getContactsbyId).put(updateContact).delete(deleteContact);


module.exports = router;