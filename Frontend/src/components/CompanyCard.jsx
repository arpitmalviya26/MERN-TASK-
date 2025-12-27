import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import AddReviewModal from "../components/AddReview";   

export default function CompanyCard({ c, mode, reviewsLength }) {
  const [openReview, setOpenReview] = useState(false);  
  const renderStars = (rating = 0) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) {
      stars.push(
        <Icon
          key={`full-${i}`}
          icon="material-symbols:star"
          className="text-yellow-400 text-xl"
        />
      );
    }

    if (half) {
      stars.push(
        <Icon
          key="half"
          icon="material-symbols:star-half"
          className="text-yellow-400 text-xl"
        />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <Icon
          key={`empty-${stars.length}`}
          icon="material-symbols:star-outline"
          className="text-gray-300 text-xl"
        />
      );
    }

    return stars;
  };

  let foundedDate = "—";
  if (c?.foundedOn) {
    const [year, month, day] = c.foundedOn.split("T")[0].split("-");
    foundedDate = `${day}-${month}-${year}`;
  }

  const ratingValue = c.rating || c.averageRating || 0;

  return (
    <>
      <div className="flex justify-between items-center bg-white rounded-xl p-6 min-h-[150px] shadow-lg">
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-center items-center text-3xl font-bold">
            {c.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl poppins-semibold leading-tight">
              {c.name}
            </h2>
            <p className="text-sm text-gray-500 mt-[2px] flex items-center gap-1 ">
              <Icon icon="akar-icons:location" className="w-4 h-4 text-[#8A00FF]" />
              {c.address || c.location || "Not Available"}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-md poppins-semibold">{ratingValue}</span>
              <div className="flex">{renderStars(ratingValue)}</div>
              <span className="text-md poppins-semibold">
                {reviewsLength || "0"} Reviews
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Founded on: <span className="text-gray-800 font-medium">{foundedDate}</span>
          </p>
          {mode === "details" ? (
            <button
              onClick={() => setOpenReview(true)}
              className="mt-2 px-5 py-2 rounded-lg text-white bg-[#303030] hover:opacity-90 transition"
            >
              Add Review
            </button>
          ) : (
            <Link to={`/company/${c._id}`}>
              <button className="mt-2 px-5 py-2 rounded-lg text-white bg-[#303030] hover:opacity-90 transition">
                Detail Review
              </button>
            </Link>
          )}
        </div>
      </div>
      {openReview && (
        <AddReviewModal
        close={() => setOpenReview(false)}
        companyId={c._id}     // <-- IMPORTANT
        reload={() => window.location.reload()}
        />
      )}

    </>
  );
}
