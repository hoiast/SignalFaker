<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
const signal = ref(0)
const time = ref(0)
const inputTime = ref(0)
const minInputTime = 0
const maxInputTime = 1000
const allowInput = ref(true)
const baseURL = ref('http://localhost:3001/api/signal')

const requestSignal = async () => {
  let url = baseURL.value
  if (allowInput.value) {
    url += `?time=${inputTime.value}`
  }

  try {
    const response = await axios.get(url)
    signal.value = response.data.signal
    time.value = response.data.time
  } catch (error) {
    // console.log(error)
  }
}
</script>
<template>
  <section
    class="mx-auto flex flex-col items-center justify-center gap-y-4 my-4"
  >
    <div class="text-center text-2xl flex gap-x-2">
      <p>API</p>
      <p class="italic">Endpoint</p>
    </div>

    <div>
      <p class="text-center">Resposta</p>
      <pre class="bg-orange-100 pr-6 pt-6 rounded w-60">
      {
        "signal": {{ signal.toFixed(4) }},
        "time": {{ time }}
      }
      </pre>
    </div>

    <div class="flex flex-col gap-y-2" :class="{ 'mb-[2px]': !allowInput }">
      <div class="flex justify-center gap-x-1">
        <p class="p-2 bg-yellow-100 rounded">
          {{ baseURL + (allowInput ? '?time=' : '') }}
        </p>
        <p v-if="allowInput" class="p-2 w-14 bg-yellow-300 rounded text-center">
          {{ inputTime }}
        </p>
      </div>
      <div v-if="allowInput" class="flex items-center justify-center gap-x-2">
        <p>{{ minInputTime }}</p>
        <input
          v-model="inputTime"
          type="range"
          :min="minInputTime"
          :max="maxInputTime"
          @input="requestSignal"
        />
        <p>{{ maxInputTime }}</p>
      </div>
      <div
        v-else
        class="border p-2 flex justify-center items-center cursor-pointer bg-yellow-400 hover:bg-yellow-500"
        @click="requestSignal"
      >
        <p>Consultar</p>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-center gap-x-2">
        <div
          class="w-30 border p-2 flex item-center justify-center cursor-pointer hover:bg-yellow-200"
          :class="{ 'bg-yellow-100': allowInput }"
          @click="allowInput = true"
        >
          Manual
        </div>
        <div
          class="w-30 border p-2 flex item-center justify-center cursor-pointer hover:bg-yellow-200"
          :class="{ 'bg-yellow-100': !allowInput }"
          @click="allowInput = false"
        >
          Automático
        </div>
      </div>
    </div>
  </section>
</template>
