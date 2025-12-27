import { useState } from "react";
import api from "../api";

export default function AddReviewModal({ close, reload, companyId }) {
  const [data, setData] = useState({ companyId });

  const submit = async () => {
    await api.post("/review", {
      companyId,
      fullName: data.fullName,
      subject: data.subject,
      reviewText: data.reviewText,  // backend expects reviewText
      rating: Number(data.rating)   // ensure number
    });

    reload();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[420px] rounded-2xl p-6 relative">
        <button className="absolute right-4 top-4" onClick={close}>
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Add Review</h2>

        <input
          className="w-full border p-2 mb-2"
          placeholder="Full Name"
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Subject"
          onChange={(e) => setData({ ...data, subject: e.target.value })}
        />
        <textarea
          className="w-full border p-2 mb-2"
          placeholder="Review"
          onChange={(e) => setData({ ...data, reviewText: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Rating (1-5)"
          onChange={(e) => setData({ ...data, rating: e.target.value })}
        />

        <button
          className="w-full mt-3 py-2 text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600"
          onClick={submit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
