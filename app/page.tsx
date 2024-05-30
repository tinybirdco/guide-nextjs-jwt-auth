"use client";

import { BarChart, Card, Subtitle, Text, Title } from "@tremor/react";
import useSWR from "swr";
import { getEndpointUrl } from "@/utils";
import { useFetcher } from "@/hooks/useFetch";

const REFRESH_INTERVAL_IN_MILLISECONDS = 5000; // five seconds

export default function Dashboard() {
  const endpointUrl = getEndpointUrl();
  const fetcher = useFetcher(); // This fetcher handles the token revalidation

  // Initializes variables for storing data
  let ranking_of_top_organizations_creating_signatures, latency, errorMessage;

  // Using SWR hook to handle state and refresh result every five seconds
  const { data } = useSWR(endpointUrl, fetcher, {
    refreshInterval: REFRESH_INTERVAL_IN_MILLISECONDS,
    onError: (error) => (errorMessage = error),
  });

  if (!data) return;

  if (data?.error) {
    errorMessage = data.error;
    return;
  }

  ranking_of_top_organizations_creating_signatures = data.data; // Setting the state with the fetched data
  latency = data.statistics?.elapsed; // Setting the state with the query latency from Tinybird

  return (
    <Card>
      <Title>Top Organizations Creating Signatures</Title>
      <Subtitle>Ranked from highest to lowest</Subtitle>
      {ranking_of_top_organizations_creating_signatures && (
        <BarChart
          className="mt-6"
          data={ranking_of_top_organizations_creating_signatures}
          index="organization"
          categories={["org_total"]}
          colors={["blue", "red"]}
          yAxisWidth={48}
          showXAxis={true}
        />
      )}
      {latency && <Text>Latency: {latency * 1000} ms</Text>}
      {errorMessage && (
        <div className="mt-4 text-red-600">
          <p>
            Oops, something happens: <strong>{errorMessage}</strong>
          </p>
          <p className="text-sm">Check your console for more information</p>
        </div>
      )}
    </Card>
  );
}
