const express = require("express");
const {
  addCompany,
  getCompanies,
  getCompanyDetails,
  getCompaniesByCity
} = require("../controllers/companyController");

const router = express.Router();

router.post("/", addCompany);
router.get("/", getCompanies);
router.get("/by-city", getCompaniesByCity);
router.get("/:id", getCompanyDetails);


module.exports = router;
