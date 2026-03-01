<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { RootState } from "@/store";

  const store = useStore<RootState>();
  const isRunning = computed(() => store.state.race.isRunning);
  const hasSchedule = computed(() => store.state.race.schedule.length > 0);
  const canStart = computed(() => hasSchedule.value && !isRunning.value);

  function handleGenerate() {
    store.dispatch("horses/generateHorses");
    store.dispatch("race/generateSchedule");
  }

  function handleStart() {
    store.dispatch("race/startRace");
  }

  function handleReset() {
    store.commit("race/RESET");
  }
</script>

<template>
  <div
    class="flex justify-between items-center px-5 py-2.5 border-b-gray-600 border-b border-solid bg-(--top--bar--background)"
  >
    <div class="text-2xl text-center text-black font-bold-500">Horse Racing</div>
    <div class="flex gap-x-3">
      <button class="custom--button" @click="handleGenerate" :disabled="isRunning">
        GENERATE PROGRAM
      </button>

      <button class="custom--button" @click="handleStart" :disabled="!canStart">
        {{ isRunning ? "RUNNING..." : "START" }}
      </button>

      <button class="custom--button" @click="handleReset">RESET</button>
    </div>
  </div>
</template>
