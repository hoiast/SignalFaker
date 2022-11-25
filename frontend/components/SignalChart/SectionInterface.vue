<script setup lang="ts">
import { ScatterDataPoint } from 'chart.js'
import { ref, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import SignalChart from './SignalChart.vue'

interface WebSocketMessage {
  type: string
  payload?: Object
}

// Connect to websocket
const ws = ref()
const connectWebsocket = () => {
  ws.value = new WebSocket('ws://localhost:3001')
  ws.value.onopen = () => {
    // console.log("Connected to websocket");
  }
  ws.value.onmessage = (event: any) => {
    const data: any = JSON.parse(event.data)
    if (data && data.time && data.signal) {
      while (chartData.value.length >= chartDataLimit.value) {
        chartData.value.shift()
      }
      const newPoint: ScatterDataPoint = { x: data.time, y: data.signal }
      chartData.value.push(newPoint)
    }
  }
  ws.value.onclose = () => {
    // console.log("Disconnected from websocket");
    connectWebsocket()
  }

  ws.value.onerror = () => {
    // console.log("Error on websocket connection");
    ws.value.close()
  }
}
onMounted(connectWebsocket)

// Option Variables
const chartData: Ref<Array<ScatterDataPoint>> = ref([])
const chartDataLimit: Ref<number> = ref(100)
const interval: Ref<number> = ref(20)

// Options Methods
const restart = async () => {
  sendMessage({ type: 'setInterval', payload: { interval: interval.value } })
  sendMessage({ type: 'stop' })
  await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for last messages to arrive. There might be a better way to do this
  chartData.value.splice(0, chartData.value.length)
  sendMessage({ type: 'restart' })
}
const stop = () => {
  sendMessage({ type: 'stop' })
}

const sendMessage = (message: WebSocketMessage) => {
  const json = JSON.stringify(message)
  ws.value.send(json)
}

// Couple interval and socket connection interval
watch(interval, (newInterval) => {
  sendMessage({ type: 'setInterval', payload: { interval: newInterval } })
})
// Prune excess data when changing dataLimit
watch(chartDataLimit, (newChartDataLimit) => {
  if (chartData.value.length > newChartDataLimit) {
    chartData.value.splice(0, chartData.value.length - newChartDataLimit)
  }
})
</script>
<template>
  <section class="mx-auto flex flex-col">
    <p class="text-center text-2xl">Fluxo contínuo de dados</p>
    <div class="flex items-center justify-center gap-2 flex-wrap">
      <SignalChart :data="chartData" />
      <div class="flex sm:flex-col gap-2 flex-wrap">
        <div class="flex flex-col justify-center gap-y-2">
          <!-- Slider: Interval -->
          <p>Intervalo: {{ interval }} ms</p>
          <input v-model="interval" type="range" max="200" min="20" />
          <!-- Slider: DataLimit -->
          <p class="w-40">Limite de pontos: {{ chartDataLimit }}</p>
          <input v-model="chartDataLimit" type="range" max="150" min="10" />
          <!-- Button: Start -->
        </div>
        <div class="flex flex-col justify-center gap-y-2">
          <div
            class="border p-4 flex item-center justify-center w-40 cursor-pointer bg-green-100 hover:bg-green-200"
            @click="restart"
          >
            Iniciar
          </div>
          <!-- Button: Start -->
          <div
            class="border p-4 flex item-center justify-center w-40 cursor-pointer bg-red-100 hover:bg-red-200"
            @click="stop"
          >
            Parar
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
