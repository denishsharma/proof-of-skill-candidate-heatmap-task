'use client'

import { heatmapDataAtom, store } from "@/stores/store";
import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Heatmap() {
  const heatmapData = useAtomValue(heatmapDataAtom, { store })

  return heatmapData.length > 0
    ? (
      <Chart
        options={{
          chart: {
            type: 'heatmap',
            toolbar: { show: false },
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            type: 'category',
            title: {
              text: 'Candidates',
            },
          },
          yaxis: {
            title: {
              text: 'Skills',
            },
          },
          plotOptions: {
            heatmap: {
              shadeIntensity: 0.5,
              colorScale: {
                ranges: [
                  { from: 0, to: 1, color: '#ecfff1' },
                  { from: 1.1, to: 2, color: '#f8f8a7' },
                  { from: 2.1, to: 3, color: '#a6d96a' },
                  { from: 3.1, to: 4, color: '#003f0b' },
                ],
              },
            },
          },
        }}
        series={heatmapData}
        type="heatmap"
        height={500}
      />
    )
    : (
      <div className={'size-full flex items-center justify-center text-neutral-400 grow'}>
        Add candidates to see their skills
      </div>
    )

}
