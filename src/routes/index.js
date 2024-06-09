const express = require("express");
const { URLS } = require("../data/constants");
const { auth } = require("./auth");
const { user } = require("./user");
const { inquiry } = require("./inquiry");
const { patient } = require("./patient");
const { prescription } = require("./prescription");

const router = express.Router();

app.use(URLS.auth.root, auth);
app.use(URLS.user.root, user);
app.use(URLS.patient.root, patient);
app.use(URLS.inquiry.root, inquiry);
app.use(URLS.prescription.root, prescription);

module.exports.api = router;
