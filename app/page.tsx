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
  let top_airline, latency, errorMessage;

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

  top_airline = data.data; // Setting the state with the fetched data
  latency = data.statistics?.elapsed; // Setting the state with the query latency from Tinybird

  return (
    <Card>
      <Title>Top airlines by bookings</Title>
      <Subtitle>Ranked from highest to lowest</Subtitle>
      {top_airline && (
        <BarChart
          className="mt-6"
          data={top_airline}
          index="airline"
          categories={["bookings"]}
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
