import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import CompanyCard from "../components/CompanyCard";
import ReviewsList from "../components/Reviews";

// Company Details Page
// Displays detailed information about a specific company and its reviews
// Fetches data from the backend API using the company ID from the URL parameters
// AddReview component can be integrated here for adding new reviews
// Uses CompanyCard and ReviewsList components for structured display
// details button from company card hide in this page

export default function CompanyDetails() {

  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await api.get(`/company/${id}`);
      setCompany(res.data.company);
      setReviews(res.data.reviews);
      console.log("Company details fetched:", res.data.company); 
      console.log("Associated reviews fetched:", res.data.reviews);  // DEBUG LOG
    } catch (err) {
      console.log("Company details fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (!company) return <p className="px-24 pt-14 text-gray-600">Loading...</p>;

  return (
    <div className="px-24 pt-14">
      <CompanyCard c={company} reviewsLength={reviews.length} mode="details" />
      <ReviewsList reviews={reviews} />
    </div>
  );
}
