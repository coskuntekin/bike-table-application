"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { BikeItem } from "../types/bike";
import Skeleton from "./skeleton";
import Modal from "./modal";

export function BikeTable(props: {
  bikeArray: BikeItem[];
  bikeObject: BikeItem;
  totalCount: number;
  currentPage: number;
}) {
  const [currentPage, setCurrentPage] = useState<number>(props.currentPage);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState<BikeItem | null>(null);

  const bikeArray = props.bikeArray;
  const isArray = Array.isArray(props.bikeArray);

  const bikeObject = props.bikeObject;
  const isObject = typeof bikeObject === "object" && bikeObject !== null && !isArray;

  const totalPages = Math.ceil(props.totalCount / 8);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const randomNumber = Math.floor(Math.random() * 100);

  const openModal = (item: BikeItem) => {
    setIsModalVisible(true);
    setSelectedBike(item);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vehicleType = params.get("vehicle_type");
    const bikeId = params.get("bike_id");
    if (vehicleType || bikeId) {
    }
    if (props.currentPage === undefined) {
      params.delete("page");
    } else {
      params.set("page", currentPage.toString());
    }
    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }, [router, currentPage, props.currentPage]);

  return (
    <div
      aria-label="Bike table"
      className="w-full overflow-x-auto bg-white rounded-lg"
    >
      <table
        className="w-full text-center border border-collapse rounded-lg sm:border-separate border-slate-200"
        cellSpacing="0"
      >
        <thead>
          {((isArray && bikeArray.length > 0) || isObject) && (
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                Bike ID
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                Vechile Type
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                Reserved
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                Disabled
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                Total Bookings
              </th>
              <th
                scope="col"
                className="h-12 w-12 px-6 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                Action
              </th>
            </tr>
          )}
        </thead>

        {isPending && <Skeleton />}

        <tbody aria-label="Bikes table has no data">
          {!isPending && bikeObject === null  && (
            <tr>
              <td
                colSpan={6}
                className="h-12 text-center px-6 py-8 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                <svg
                  width="484.67"
                  height="290.311"
                  viewBox="0 0 794.67 615.311"
                  className="inline-block mb-4"
                  role="graphics-symbol"
                >
                  <use xlinkHref="/img-bike.svg#bike" />
                </svg>
                <p className="text-xl">No data available base on your search</p>
              </td>
            </tr>
          )}
        </tbody>
        <tbody aria-label="Bike table data loop">
          {!isPending &&
            isArray &&
            bikeArray.map((item) => (
              <tr key={item?.bike_id ?? randomNumber}>
                <td className="h-12 px-6 py-2 text-sm text-center border-t border-slate-200 stroke-slate-500 text-slate-500">
                  {item?.bike_id ?? "N/A"}
                </td>
                <td className="h-12 px-6 first-letter:uppercase text-center py-2 text-sm border-t border-slate-200 stroke-slate-500 text-slate-500">
                  {item?.vehicle_type ?? "N/A"}
                </td>
                <td className="h-12 px-6 py-2 text-sm text-center border-t border-slate-200 stroke-slate-500 text-slate-500">
                  {item?.is_reserved === 0 ? "Yes" : "No"}
                </td>
                <td className="h-12 px-6 py-2 text-sm text-center border-t border-slate-200 stroke-slate-500 text-slate-500">
                  {item?.is_disabled === 0 ? "Yes" : "No"}
                </td>
                <td className="h-12 px-6 py-2 text-sm text-center border-t border-slate-200 stroke-slate-500 text-slate-500">
                  {item?.total_bookings ?? "N/A"}
                </td>
                <td className="h-12 px-6 py-2 text-sm text-center border-t border-slate-200 stroke-slate-500 text-slate-500">
                  <button
                    type="button"
                    onClick={() => openModal(item)}
                    aria-label="Detail of bike row"
                    className="flex items-center gap-x-2 border rounded-md py-1.5 px-4 hover:border-gray-400 transition-colors hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    Location
                  </button>
                </td>
              </tr>
            ))}

          {isObject && (
            <tr key={bikeObject?.bike_id}>
              <td className="h-12 px-6 py-2 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                {bikeObject?.bike_id}
              </td>
              <td className="h-12 px-6 py-2 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                {bikeObject?.vehicle_type}
              </td>
              <td className="h-12 px-6 py-2 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                {bikeObject?.is_reserved === 0 ? "Yes" : "No"}
              </td>
              <td className="h-12 px-6 py-2 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                {bikeObject?.is_disabled === 0 ? "Yes" : "No"}
              </td>
              <td className="h-12 px-6 py-2 text-sm text-center border-t border-slate-200 stroke-slate-500 text-slate-500">
                {bikeObject?.total_bookings ?? "N/A"}
              </td>
              <td className="h-12 px-6 py-2 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                <button
                  type="button"
                  aria-label="Detail of bike row"
                  className="flex items-center gap-x-2 border rounded-md py-1.5 px-4 hover:border-gray-400 transition-colors hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Detail
                </button>
              </td>
            </tr>
          )}
        </tbody>
        {isArray && bikeArray.length > 0 && (
          <tfoot aria-label="Bike table pagination">
            <tr>
              <td
                colSpan={6}
                className="px-6 pt-2 pb-6 text-sm font-normal stroke-slate-700 text-slate-400"
              >
                <nav role="navigation" aria-label="Pagination Navigation">
                  <ul className="flex list-none items-center justify-center text-sm text-slate-700 md:gap-1">
                    <li>
                      <button
                        type="button"
                        aria-label="Goto Page 1"
                        disabled={currentPage === 1 || isPending}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="inline-flex h-10 items-center disabled:text-gray-300 justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-500 focus-visible:outline-none"
                      >
                        <span className="order-2">Prev</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="-mx-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          role="graphics-symbol"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    </li>
                    <li className="shadow-md bg-white text-gray-600 rounded-full px-4 py-2.5">
                      {currentPage} / {totalPages}
                    </li>
                    <li>
                      <button
                        type="button"
                        disabled={currentPage === totalPages || isPending}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="inline-flex h-10 items-center disabled:text-gray-300 justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-500 focus-visible:outline-none"
                      >
                        <span>Next </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="-mx-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          role="graphics-symbol"
                          aria-labelledby="title-10 desc-10"
                        >
                          <title id="title-10">Next page</title>
                          <desc id="desc-10">link to next page</desc>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <Modal
        title={selectedBike?.bike_id || ""}
        content={selectedBike?.vehicle_type || ""}
        onClose={closeModal}
        isShowing={isModalVisible}
      />
    </div>
  );
}
