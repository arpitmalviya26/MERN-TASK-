import defaultCompanies from "./DefaultCompanies.jsx";

export default function CompanyList() {
  return (
    <div className="mt-10">
      
      <p className="text-gray-600 mb-3">
        Result Found: {defaultCompanies.length}
      </p>

      <div className="space-y-5">
        {defaultCompanies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
