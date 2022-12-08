<script setup lang="ts">
import { Ref, ref } from 'vue'
import type { ChartOptions, ChartData, ScatterDataPoint } from 'chart.js'

const props = defineProps({
  data: {
    type: Array<ScatterDataPoint>,
    default: () => [
      { x: 0, y: 10 },
      { x: 1, y: 15 },
      { x: 2, y: 5 },
    ],
  },
})

const chartOptions: Ref<ChartOptions> = ref({
  elements: {
    point: {
      radius: 3,
    },
  },
  animation: {
    duration: 0,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Tempo (ms)',
      },
      ticks:{
        maxRotation: 45,
        minRotation: 45,
      }
    },
    y: {
      title: {
        display: true,
        text: 'Intensidade do Sinal (unidade arbitrária)',
      },
    },
  },
})
const chartData: Ref<ChartData> = ref({
  datasets: [
    {
      label: 'Dados via Websocket',
      backgroundColor: '#FBBF24',
      showLine: true,
      data: props.data,
    },
  ],
})
</script>

<template>
  <div>
    <ScatterChart :chart-options="chartOptions" :chart-data="chartData" />
  </div>
</template>
