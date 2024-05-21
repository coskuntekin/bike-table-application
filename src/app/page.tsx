import { LoadScript } from "@react-google-maps/api";
import Link from "next/link";
import { Search } from "./components/search";
import { BikeTable } from "./components/table";
import { observe } from "./lib/observe";
import { BikeResponse } from "./types/bike";

export default async function Home({
  searchParams,
}: {
  searchParams: { bike_id: string; vehicleType: string; page: string };
}) {
  const endpoint = "/items";
  let response: BikeResponse = await observe(endpoint, searchParams);
  let ttl = response.ttl;

  let bikes = response.data.bikes || response.data.bike;

  if (bikes === null) {
    bikes = [];
  }

  const totaCount = response.total_count;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  let countdown = ttl ? ttl * 1000 : 10000;

  const interval = setInterval(async () => {
    countdown -= 1000;
    if (countdown <= 0) {
      clearInterval(interval);
      response = await observe(endpoint, searchParams);
      ttl = response.ttl;
    }
  }, 1000);

  return (
    <main className="flex w-full min-h-screen flex-col p-12 bg-white" role="main">
      <section className="bg-noise bg-opacity-80 backdrop-blur-md w-full h-full rounded-xl p-12 shadow-lg">
        <Link href={"/?page=1"}>
          <h1
            aria-label="Page title"
            className="text-gray-700 leading-10 text-5xl font-semibold mb-12"
          >
            Bike Table
            <span className="text-gray-400">&nbsp;Application</span>
          </h1>
        </Link>
        <div aria-label="Search form" className="mb-4 flex justify-between">
          <Search
            bikeId={searchParams.bike_id}
            vehicleType={searchParams.vehicleType}
          />
        </div>
        <BikeTable currentPage={page} totalCount={totaCount} array={bikes} />
      </section>
    </main>
  );
}
