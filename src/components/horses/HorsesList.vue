<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { RootState } from "@/store/index";
  import HorseRow from "./HorseRow.vue";

  const store = useStore<RootState>();

  const horses = computed(() => store.state.horses.all);
</script>

<template>
  <div class="w-65 border border-[#ccc] bg-white">
    <div class="bg-(--horse-list-header-background) p-2 font-bold">
      Horse List (1 - 20)
    </div>
    <table class="w-full border-collapse text-[12px]">
      <thead>
        <tr class="text-black">
          <th class="horser-list--header">Name</th>
          <th class="horser-list--header">Condition</th>
          <th class="horser-list--header">Color</th>
        </tr>
      </thead>

      <tbody>
        <HorseRow
          v-for="horse in horses"
          :key="horse.id"
          :horse="horse"
          class="[&>td]:border [&>td]:border-[#ddd] [&>td]:p-1 [&>td]:text-center"
        />
      </tbody>
    </table>
  </div>
</template>

<style>
  /* @import "../../style.css"; */
  @reference "../../style.css";
  .horser-list--header {
    @apply border border-gray-400 p-1 text-center;
  }
</style>
