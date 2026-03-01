<script>
  import { mapState } from "vuex";

  export default {
    computed: {
      ...mapState("race", ["results"]),
    },
  };
</script>

<template>
  <div class="bg-white text-black w-full">
    <div class="bg-[#a0cd78] p-1.5 text-center font-bold text-black">Results</div>
    <div
      class="divide-y-2 divide-gray-300 border-b-2 border-gray-300 mb-2"
      v-for="result in results"
      :key="result.round"
    >
      <h3 class="bg-gray-200">Round {{ result.round }} - {{ result.distance }}m</h3>
      <div v-for="horse in result.standings" :key="horse.horseId">
        {{ horse.name }} - {{ horse.time.toFixed(2) }}
      </div>
    </div>
  </div>
</template>
