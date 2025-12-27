const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");

const companyRoutes = require("./routes/companyRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

dotenv.config();
const app = express();

 
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());    
connectDB();

app.use("/api/company", companyRoutes);
app.use("/api/review", reviewRoutes); 

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);    