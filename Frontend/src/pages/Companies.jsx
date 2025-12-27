import { useState, useEffect } from "react";
import api from "../api";
import CompanyCard from "../components/CompanyCard";
import AddCompanyModal from "../components/AddCompanyModal";
import { Icon } from "@iconify/react";



export default function Companies() {

  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("Indore , Madhya Pradesh");
  const [sortValue, setSortValue] = useState("Name");
  const [openSort, setOpenSort] = useState(false);


 const findCompanies = async () => {
  try {
    const res = await api.get(
      `/company/by-city?city=${encodeURIComponent(city)}&sort=${sortValue.toLowerCase()}`
    );

    const list = res.data;

    // Get review length for each company
    const companiesWithReviewCount = await Promise.all(
      list.map(async (c) => {
        const r = await api.get(`/review/${c._id}`);
        return { ...c, reviewLength: r.data.length };
      })
    );

    setCompanies(companiesWithReviewCount);

  } catch (err) {
    console.log("Fetch Error => ", err);
  }
};


  useEffect(() => {
    if (companies.length > 0) {
      findCompanies();
    }
  }, [sortValue]);

  return (
    <div className="px-20 py-10 poppins-regular">
      <div className="flex justify-between items-end">
        <div className="flex items-end gap-4">
          <div className="flex flex-col">
            <span className="text-gray-500 mb-1">Select City</span>

            <div className="relative ">
              <select
                className="border rounded-lg border-gray-300 px-4 py-2 w-[350px] appearance-none pr-10"
                placeholder ="Select City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option>Indore, Madhya Pradesh</option>
                <option>Mumbai, Maharashtra</option>
                <option>Delhi, Delhi</option>
              </select>

              <Icon
                icon="akar-icons:location"
                className="w-5 h-5 absolute right-3 top-3 text-[#8A00FF]"
              />
            </div>
          </div>

          <button
            className="px-6 py-2 rounded-lg poppins-semibold text-white  bg-gradient-to-r from-[#D100F3] to-[#002BC5] cursor-pointer hover:opacity-90 active:scale-95 transition"
            onClick={findCompanies}
          >
            Find Company
          </button>
        </div>

        <div className="flex items-end gap-5">


          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#D100F3] to-[#002BC5]"
          >
            + Add Company
          </button>

          <div className="flex flex-col relative">
            <span className="text-gray-600 mb-1">Sort</span>

            <div
              className="border border-gray-300 rounded-lg px-4 py-2 w-[160px] flex items-center justify-between cursor-pointer"
              onClick={() => setOpenSort(!openSort)}
            >
              <span>{sortValue}</span>

              <Icon
                icon="gridicons:dropdown"
                className="w-5 h-5 text-gray-600"
              />
            </div>

            {openSort && (
              <div className="absolute animate-fade top-[60px] left-0 w-[160px] bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">

                <button
                  className="w-full text-left hover:bg-gray-100 px-4 py-2"
                  onClick={() => {
                    setSortValue("Name");
                    setOpenSort(false);
                  }}
                >
                  Name
                </button>

                <button
                  className="w-full text-left hover:bg-gray-100 px-4 py-2"
                  onClick={() => {
                    setSortValue("Rating");
                    setOpenSort(false);
                  }}
                >
                  Rating
                </button>

                <button
                  className="w-full text-left hover:bg-gray-100 px-4 py-2"
                  onClick={() => {
                    setSortValue("Newest");
                    setOpenSort(false);
                  }}
                >
                  Newest
                </button>

                <button
                  className="w-full text-left hover:bg-gray-100 px-4 py-2"
                  onClick={() => {
                    setSortValue("Oldest");
                    setOpenSort(false);
                  }}
                >
                  Oldest
                </button>

              </div>
            )}
          </div>

        </div>
      </div>

      <hr className="mt-6 mb-6 text-gray-400" />

      <p className="text-gray-600 mb-3">
        Result Found: {companies.length}
      </p>


      <div className="space-y-5">
        {companies.length === 0 && (
          <p className="text-gray-500">No companies found.</p>
        )}

        {companies.map((c) => (
          <CompanyCard key={c._id} c={c} mode="list" reviewsLength={c.reviewLength} />
        ))}
      </div>

      {open && (
        <AddCompanyModal
          close={() => setOpen(false)}
          reload={findCompanies}
        />
      )}
    </div>
  );
}
