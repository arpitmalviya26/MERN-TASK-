import { useState } from "react";
import { Icon } from "@iconify/react";
import api from "../api";

export default function AddCompanyModal({ close, reload }) {
  const gradient =
    "linear-gradient(136.93deg, #D100F3 9.08%, #002BC5 108.36%)";
  const [data, setData] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: ""
  });
  const submit = async () => {
    await api.post("/company", data);   // <-- backend hit here
    reload && reload();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50">

      <div className="relative bg-white rounded-3xl shadow-xl w-[430px] px-8 py-9 overflow-hidden">
        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-500 text-xl hover:text-black z-50"
        >
          ✕
        </button>
        <div className="absolute -top-8 -left-10 w-32 h-32 z-10 rounded-full opacity-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="absolute -top-8 left-14 w-24 h-24 z-0 rounded-full opacity-85 bg-gradient-to-l from-gray-300 via-gray-400 to-gray-500" />
        <h2 className="text-2xl font-bold text-center mb-7 relative z-10">
          Add Company
        </h2>
        <div className="flex flex-col gap-4 relative z-10">
          <div>
            <p className="text-sm text-gray-600 mb-1">Company name</p>
            <input
              placeholder="Enter..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 appearance-none outline-none"
                onChange={(e) => setData({ ...data, location: e.target.value })}
              >
                <option>Select Location</option>
                <option>Indore, Madhya Pradesh</option>
                <option>Mumbai, Maharashtra</option>
                <option>Delhi, Delhi</option>
              </select>

              <Icon
                icon="akar-icons:location"
                className="absolute right-3 top-2.5 text-[#8A00FF] text-xl"
              />
            </div>
          </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Founded on</p>
        
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none cursor-pointer"
              onChange={(e) =>
                setData({ ...data, foundedOn: e.target.value })
              }
              id="foundedDate"
            />
        
            <Icon
              icon="mdi:calendar-month-outline"
              className="absolute right-3 top-2.5 text-[#8A00FF] text-xl cursor-pointer"
              onClick={() => document.getElementById("foundedDate").showPicker()}
            />
          </div>
        </div>
        </div>
        <button
          className="w-full mt-7 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ background: gradient }}
          onClick={submit}
        >
        Save
        </button>
      </div>
    </div>
  );
}
