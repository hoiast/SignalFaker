<template>
  <main class="flex flex-col items-center justify-center gap-y-8">
    <SignalRequester />
    <SignalChartSectionInterface />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import SignalRequester from "~/components/SignalRequester.vue";
import SignalChartSectionInterface from "~/components/SignalChart/SectionInterface.vue";

export default Vue.extend({
  name: "IndexPage",
  components: { SignalRequester, SignalChartSectionInterface },
});
</script>
