'use client'

import { BarChart } from '@tinybirdco/charts'

export function TopAirlines() {
  return (
    <BarChart
      endpoint="https://api.tinybird.co/v0/pipes/top_airlines.json"
      token="p.eyJ1IjogIjk1ZDhkYmJlLTg2ZDQtNDVhMC05ODA4LTVmYzdjNDQ0NGI4NiIsICJpZCI6ICI1NTQ4OTA0YS02MTlmLTQwMzQtOGUzYS1iNDNiNDBmOTVjMWMiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.FFurTAH_MdJkFKQA_bbTa0A7d_xe71pusQXI--39pHE"
      index="airline"
      categories={['bookings']}
      colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
      title="Top Airlines"
      description="Top airlines by booking volume"
      height="500px"
    />
  )
}