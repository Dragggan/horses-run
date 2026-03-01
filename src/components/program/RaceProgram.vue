<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { RootState } from "@/store";
  import { Round } from "@/types";

  const store = useStore<RootState>();

  const schedule = computed<Round[]>(() => store.state.race.schedule);
</script>

<template>
  <div class="mb-3 w-full border bg-[#f0f0f0]">
    <div class="bg-[#4a79c9] p-1.5 text-center font-bold text-black">Program</div>

    <div
      v-for="round in schedule"
      :key="round.round"
      class="m-2 border border-[#ddd] bg-white"
    >
      <div class="bg-[#d9534f] p-1 text-[12px] font-bold text-white">
        {{ round.round }}. Lap - {{ round.distance }}m
      </div>

      <table class="w-full border-collapse text-[12px] text-black">
        <thead>
          <tr>
            <th class="border border-[#ddd] p-0.75 text-center">Position</th>
            <th class="border border-[#ddd] p-0.75 text-center">Name</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(horse, index) in round.horses" :key="horse.id">
            <td class="border border-[#ddd] p-0.75 text-center">{{ index + 1 }}</td>
            <td class="border border-[#ddd] p-0.75 text-center">{{ horse.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
