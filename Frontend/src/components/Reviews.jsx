import { useEffect, useState } from "react";
import api from "../api";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";

export default function ReviewsList() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState("latest");

  const getReviews = async () => {
    try {
      const res = await api.get(`/review/${id}?sort=${sort}`);
      setReviews(res.data);
    } catch (err) {
      console.log("Review Fetch Error => ", err);
    }
  };

  useEffect(() => {
    if (id) getReviews();
  }, [id, sort]);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Reviews ({reviews.length})
        </h2>

        <select
          className="border border-gray-300 px-4 py-2 rounded-lg"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="high">Highest Rating</option>
          <option value="low">Lowest Rating</option>
        </select>
      </div>

      <div className="space-y-5">
        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((r) => (
          <div
            key={r._id}
            className="border border-gray-200 bg-white rounded-2xl p-5 shadow-sm
                       grid grid-cols-[1fr_auto] gap-4 items-start"
          >
            <div className="flex gap-4">
              <img
                src={`https://i.pravatar.cc/60?u=${r._id}`}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{r.fullName}</h3>

                <p className="text-sm text-gray-500">
                  {new Date(r.createdAt).toLocaleDateString()} ,{" "}
                  {new Date(r.createdAt).toLocaleTimeString()}
                </p>

                <p className="text-gray-700 mt-1 whitespace-normal break-words leading-relaxed">
                  {r.reviewText}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  icon={
                    i < r.rating
                      ? "material-symbols:star"
                      : "material-symbols:star-outline"
                  }
                  className="text-yellow-400 text-xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
