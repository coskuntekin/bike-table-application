export async function observe(
  endpoint: string,
  params: { [key: string]: string }
) {
  const url = new URL(endpoint, process.env.NEXT_API_URL);

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const response = await fetch(url.toString(), { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log("response");

  return await response.json();
}
