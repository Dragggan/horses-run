<template>
  <div class="flex flex-col h-screen">
    <div class="top">
      <TopBar />
    </div>

    <div class="flex flex-1">
      <HorsesList />
      <RaceTrack />
      <div class="flex min-w-80 justify-between">
        <RaceProgram />
        <RaceResults />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TopBar from "./components/layout/TopBar.vue";
  import HorsesList from "./components/horses/HorsesList.vue";
  import RaceTrack from "./components/track/RaceTrack.vue";
  import RaceResults from "./components/results/RaceResults.vue";
  import RaceProgram from "./components/program/RaceProgram.vue";
</script>

<style></style>
