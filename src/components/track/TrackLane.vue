<script setup lang="ts">
  import { Horse } from "@/types";

  defineProps<{
    horse: Horse;
    laneNumber: number;
    isRunning: boolean;
  }>();
</script>

<template>
  <div class="flex items-center h-15 border-b-[#666] border-b border-dashed">
    <div class="w-10 text-black text-center font-[bold]">
      {{ laneNumber }}
    </div>

    <div class="flex-1 relative">
      <div
        class="flex text-[28px] absolute -top-2.5e horse"
        :class="{ running: isRunning }"
      >
        <span class="text-[black] text-[10px] font-[bold]">{{ horse.name }}</span>
        <img src="../../assets/horse.svg" width="50" height="50" class="mt-12" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .horse.running {
    animation: run 3s linear forwards;
  }

  @keyframes run {
    from {
      left: 0%;
    }

    to {
      left: 87%;
    }
  }
</style>
