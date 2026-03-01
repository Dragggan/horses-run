<template>
  <div class="w-screen relative flex-1 p-5">
    <div class="relative">
      <TrackLane
        v-for="(horse, index) in activeHorses"
        :key="horse.id"
        :laneNumber="index + 1"
        :horse="horse"
        :isRunning="isRunning"
      />
    </div>
    <div class="absolute w-0.75 right-5 inset-y-0" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { RootState } from "@/store";
  import TrackLane from "./TrackLane.vue";

  const store = useStore<RootState>();

  const activeHorses = computed(() => store.state.race.activeRound?.horses || []);

  const isRunning = computed(() => store.state.race.isRunning);
</script>

<style lang="css" scoped></style>
