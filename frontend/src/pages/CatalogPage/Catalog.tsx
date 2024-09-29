import { useLocation } from "react-router-dom";
import { CatalogOverview, CatalogSearch } from "../../features/Catalog";

export default function Catalog() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full py-8 px-4">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center mb-6">
            {location.search === "" ? <CatalogOverview /> : <CatalogSearch />}
          </h2>
          {/* <p className="text-lg text-center">
            {location.search === ""
              ? "Browse our catalog overview."
              : "Search for books in our catalog."}
          </p> */}
        </div>
      </div>
    </div>
  );
}
