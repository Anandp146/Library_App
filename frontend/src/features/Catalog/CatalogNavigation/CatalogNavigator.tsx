// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/ReduxStore";
// import { useLocation, useNavigate } from "react-router-dom";
// import { calculatePaging } from "../utils/CatalogUtils";

// export const CatalogNavigator: React.FC = () => {
//   const pagingInformation = useSelector(
//     (state: RootState) => state.book.pagingInformation
//   );
//   const navigate = useNavigate();
//   const { search } = useLocation();

//   const navigateprev = () => {
//     if (pagingInformation && pagingInformation.currentPage !== 1) {
//       if (search.includes("&page=")) {
//         let splitString = search.split("&page=");
//         let newTerms =
//           splitString[0] + `&page=${pagingInformation.currentPage - 1}`;
//         navigate(`/catalog${newTerms}`);
//       } else {
//         let newTerms = search + `&page=${pagingInformation.currentPage - 1}`;
//         navigate(`/catalog${newTerms}`);
//       }
//     }
//   };
//   const navigatenum = (e: React.MouseEvent<HTMLParagraphElement>) => {
//     if (search.includes("&page=")) {
//       let splitString = search.split("&page=");
//       let newTerms = splitString[0] + `&page=${e.currentTarget.id}`;
//       navigate(`/catalog${newTerms}`);
//     } else {
//       let newTerms = search + `&page=${e.currentTarget.id}`;
//       navigate(`/catalog${newTerms}`);
//     }
//   };
//   const navigateNext = () => {
//     if (
//       pagingInformation &&
//       pagingInformation.currentPage !== pagingInformation.totalPages
//     ) {
//       if (search.includes("&page=")) {
//         let splitString = search.split("&page=");
//         let newTerms =
//           splitString[0] + `&page=${pagingInformation.currentPage + 1}`;
//         navigate(`/catalog${newTerms}`);
//       } else {
//         let newTerms = search + `&page=${pagingInformation.currentPage + 1}`;
//         navigate(`/catalog${newTerms}`);
//       }
//     }
//   };
//   return (
//     // <div className="">
//     //   <p className="" onClick={navigateprev}>
//     //     Prev
//     //   </p>
//     //   <div className=""></div>
//     //   <p className="" onClick={navigateNext}>
//     //     Next
//     //   </p>
//     // </div>
//     <div className="flex items-center justify-center space-x-4 mt-6">
//       <button
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
//         onClick={navigateprev}
//         disabled={!pagingInformation || pagingInformation.currentPage === 1}
//       >
//         Prev
//       </button>
//       <div className="flex space-x-2">
//         {/* {Array.from(
//           { length: pagingInformation?.totalPages || 0 },
//           (_, index) => (
//             <p
//               key={index + 1}
//               id={(index + 1).toString()}
//               className={`cursor-pointer px-3 py-1 rounded-md ${
//                 pagingInformation?.currentPage === index + 1
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               } hover:bg-indigo-500 hover:text-white`}
//               onClick={navigatenum}
//             >
//               {index + 1}
//             </p>
//           )
//         )} */}
//         {pagingInformation &&
//           calculatePaging(pagingInformation).map((num) => {
//             if (num === `${pagingInformation.currentPage}`)
//               return (
//                 <p
//                   key={num}
//                   className={`cursor-pointer px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white`}
//                   onClick={navigatenum}
//                 >
//                   {num}
//                 </p>
//               );

//             return (
//               <p className="bg-gray-200 hover:bg-indigo-500 hover:text-white text-gray-700 cursor-pointer px-3 py-1 rounded-md ">
//                 {num}
//               </p>
//             );
//           })}
//       </div>
//       <button
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
//         onClick={navigateNext}
//         disabled={
//           !pagingInformation ||
//           pagingInformation.currentPage === pagingInformation.totalPages
//         }
//       >
//         Next
//       </button>
//     </div>
//   );
// };
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/ReduxStore";
import { useLocation, useNavigate } from "react-router-dom";
import { calculatePaging } from "../utils/CatalogUtils";

export const CatalogNavigator: React.FC = () => {
  const pagingInformation = useSelector(
    (state: RootState) => state.book.pagingInformation
  );
  const navigate = useNavigate();
  const { search } = useLocation();

  const navigatePrev = () => {
    if (pagingInformation && pagingInformation.currentPage !== 1) {
      if (search.includes("&page=")) {
        let splitString = search.split("&page=");
        let newTerms =
          splitString[0] + `&page=${pagingInformation.currentPage - 1}`;
        navigate(`/catalog${newTerms}`);
      } else {
        let newTerms = search + `&page=${pagingInformation.currentPage - 1}`;
        navigate(`/catalog${newTerms}`);
      }
    }
  };

  const navigateNum = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (search.includes("&page=")) {
      let splitString = search.split("&page=");
      let newTerms = splitString[0] + `&page=${e.currentTarget.id}`;
      navigate(`/catalog${newTerms}`);
    } else {
      let newTerms = search + `&page=${e.currentTarget.id}`;
      navigate(`/catalog${newTerms}`);
    }
  };

  const navigateNext = () => {
    if (
      pagingInformation &&
      pagingInformation.currentPage !== pagingInformation.totalPages
    ) {
      if (search.includes("&page=")) {
        let splitString = search.split("&page=");
        let newTerms =
          splitString[0] + `&page=${pagingInformation.currentPage + 1}`;
        navigate(`/catalog${newTerms}`);
      } else {
        let newTerms = search + `&page=${pagingInformation.currentPage + 1}`;
        navigate(`/catalog${newTerms}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        onClick={navigatePrev}
        disabled={!pagingInformation || pagingInformation.currentPage === 1}
      >
        Prev
      </button>
      <div className="flex space-x-2">
        {pagingInformation &&
          calculatePaging(pagingInformation).map((num) => {
            if (num === `${pagingInformation.currentPage}`)
              return (
                <p
                  key={num}
                  className={`cursor-pointer px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white`}
                  onClick={navigateNum}
                >
                  {num}
                </p>
              );

            return (
              <p
                key={num}
                id={num}
                className="bg-gray-200 hover:bg-indigo-500 hover:text-white text-gray-700 cursor-pointer px-3 py-1 rounded-md "
              >
                {num}
              </p>
            );
          })}
      </div>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        onClick={navigateNext}
        disabled={
          !pagingInformation ||
          pagingInformation.currentPage === pagingInformation.totalPages
        }
      >
        Next
      </button>
    </div>
  );
};
