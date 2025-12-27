import { useState } from "react";
import { Icon } from "@iconify/react";
import api from "../api";

export default function AddReviewModal({ close, companyId, reload }) {

  const gradient =
    "linear-gradient(136.93deg, #D100F3 9.08%, #002BC5 108.36%)";

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    subject: "",
    description: "",
    rating: 0,
  });

  const submit = async () => {
    if (!data.fullName || !data.subject || !data.description || data.rating === 0) {
      alert("Please fill all fields & rating");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/review/${companyId}`, {
        companyId,
        fullName: data.fullName,
        subject: data.subject,
        reviewText: data.description,
        rating: Number(data.rating)
      });

      reload && reload();   // refresh reviews list
      close();

    } catch (err) {
      console.log(err);
      alert("Something went wrong while posting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50">

      <div className="relative bg-white rounded-3xl shadow-xl w-[400px] px-7 py-7 overflow-hidden">

        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-500 text-xl hover:text-black z-50"
        >
          ✕
        </button>

        <div className="absolute -top-6 -left-8 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="absolute -top-6 left-10 w-20 h-20 rounded-full bg-gradient-to-l from-gray-300 via-gray-400 to-gray-500" />

        <h2 className="text-xl font-bold text-center mb-5 relative z-10">
          Add Review
        </h2>

        <div className="flex flex-col gap-3 relative z-10">

          <div>
            <p className="text-sm text-gray-600 mb-1">Full Name</p>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Subject</p>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              onChange={(e) => setData({ ...data, subject: e.target.value })}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Enter your Review</p>
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none resize-none"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>

          <div>
            <p className="text-xl font-semibold mb-1">Rating</p>

            <div className="flex justify-between items-center">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    icon={
                      star <= data.rating
                        ? "material-symbols:star"
                        : "material-symbols:star-outline"
                    }
                    className={`text-2xl cursor-pointer ${
                      star <= data.rating
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                    onClick={() => setData({ ...data, rating: star })}
                  />
                ))}
              </div>

              <span className="text-xs text-gray-600">
                {data.rating >= 4
                  ? "Satisfied"
                  : data.rating === 3
                  ? "Average"
                  : data.rating === 0
                  ? ""
                  : "Not Good"}
              </span>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full mt-6 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
          style={{ background: gradient }}
          onClick={submit}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
