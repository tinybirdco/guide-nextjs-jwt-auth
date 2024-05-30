const TINYBIRD_HOST = process.env.TINYBIRD_HOST ?? "https://api.tinybird.co";

export function getEndpointUrl() {
  // Define date range for the query
  const today = new Date(); // Get today's date
  const dateFrom = new Date(today.setMonth(today.getMonth() - 1)); // Start the query's dateFrom to the one month before today
  const dateTo = new Date(today.setMonth(today.getMonth() + 1)); // Set the query's dateTo to be one month from today

  // Format for passing as a query parameter
  const dateFromFormatted = dateFrom.toISOString().substring(0, 10);
  const dateToFormatted = dateTo.toISOString().substring(0, 10);

  // Constructing the URL for fetching data, including host, token, and date range
  const endpointUrl = new URL(
    "/v0/pipes/ranking_of_top_organizations_creating_signatures.json",
    TINYBIRD_HOST
  );
  endpointUrl.searchParams.set("date_from", dateFromFormatted);
  endpointUrl.searchParams.set("date_to", dateToFormatted);

  return endpointUrl.toString();
}
