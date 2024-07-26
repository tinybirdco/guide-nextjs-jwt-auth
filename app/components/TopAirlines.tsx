'use client'

import { BarChart, ChartProvider } from '@tinybirdco/charts'
import { useFetcher } from "@/hooks/useFetch";

export function TopAirlines() {
  const fetcher = useFetcher(); // This fetcher handles the token revalidation
  let token;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("tinybirdJWT") || ''
  }
  return (
    <ChartProvider
      queryConfig={{
        endpoint: 'https://api.tinybird.co/v0/pipes/top_airlines.json',
        token,
        fetcher,
      }}
    >
      <BarChart
        index="airline"
        categories={['bookings']}
        colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
        title="Top Airlines"
        description="Top airlines by booking volume"
        height="500px"
      />
    </ChartProvider>
  )
}


