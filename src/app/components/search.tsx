"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { Input } from "./input";
import { useRouter } from "next/navigation";

export function Search(props: { bikeId?: string; vehicleType?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [bikeId, setBikeId] = useState(props.bikeId);
  const [vehicleType, setVehicleType] = useState(props.vehicleType);

  const [currentPage, setCurrentPage] = useState(1);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (bikeId === undefined && vehicleType === undefined) {
      params.delete("bike_id");
      params.delete("vehicle_type");
    } else {
      if (bikeId) {
        params.set("bike_id", bikeId);
      } else {
        params.delete("bike_id");
      }
      if (vehicleType) {
        params.set("vehicle_type", vehicleType);
      } else {
        params.delete("vehicle_type");
      }
    }

    params.set("page", currentPage.toString());

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }, [router, bikeId, vehicleType, currentPage]);

  return (
    <div className="flex items-center gap-x-4 w-1/2" role="form">
      <div className="relative w-full">
        <Input
          ref={inputRef}
          id="bike_id"
          name="bike_id"
          type="search"
          value={bikeId ?? ""}
          maxLength={5}
          minLength={2}
          onInput={(e) => {
            setBikeId(e.currentTarget.value);
          }}
          spellCheck={false}
          placeholder="Search by bike ID"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute top-2.5 left-2 h-5 w-5 stroke-slate-400 peer-disabled:cursor-not-allowed"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <div className="relative w-full">
        <select
          id="vehicle_type"
          name="vehicle_type"
          value={vehicleType ?? ""}
          onChange={(e) => {
            setVehicleType(e.currentTarget.value);
          }}
          className="peer relative h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all focus:border-gray-400 focus-visible:outline-none focus:focus-visible:outline-none"
        >
          <option value="">
            Choose vehicle type
          </option>
          <option value="scooter">Scooter</option>
          <option value="bike">Bike</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-gray-400 peer-disabled:cursor-not-allowed"
          viewBox="0 0 20 20"
          fill="currentColor"
          role="graphics-symbol"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex gap-x-2">
        <button
          type="button"
          onClick={() => {
            setBikeId("");
            setVehicleType("");
            setCurrentPage(1);
          }}
          className="h-10 px-4 flex gap-x-2 items-center text-sm font-normal text-gray-600 bg-white rounded-lg hover:bg-gray-300 focus:bg-gray-300 focus:outline-none transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
}
