const Company = require("../models/Company");
const Review = require("../models/Review");

const addCompany = async (req, res) => {
  const company = await Company.create(req.body);
  console.log("New Company Added => ", company);
  res.json(company);
};
 
const getCompanies = async (req, res) => {
  const search = req.query.search || "";
  const companies = await Company.find({
    name: { $regex: search, $options: "i" }
  });
  res.json(companies);
};

const getCompanyDetails = async (req, res) => {
  const company = await Company.findById(req.params.id);
  const reviews = await Review.find({ companyId: req.params.id });

  const avg =
    reviews.reduce((a, b) => a + b.rating, 0) / (reviews.length || 1);

  company.averageRating = avg.toFixed(1);
  await company.save();

  res.json({ company, reviews });
};
const getCompaniesByCity = async (req, res) => {
  try {
    const city = req.query.city;
    const sort = req.query.sort || "name";

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    let sortQuery = {};
    if (sort === "name") sortQuery = { name: 1 };
    if (sort === "rating") sortQuery = { averageRating: -1 };
    if (sort === "newest") sortQuery = { foundedOn: -1 };
    if (sort === "oldest") sortQuery = { foundedOn: 1 };

    let companies = await Company.find({
      location: { $regex: city, $options: "i" }
    }).sort(sortQuery);

    // ⭐ Calculate Rating For Each Company
    for (let company of companies) {
      const reviews = await Review.find({ companyId: company._id });

      const avg =
        reviews.reduce((a, b) => a + b.rating, 0) / (reviews.length || 1);

      company.averageRating = avg.toFixed(1);

      await company.save();
    }

    res.json(companies);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching city companies" });
  }
};



module.exports = {
  addCompany,
  getCompanies,
  getCompanyDetails,
  getCompaniesByCity
};
