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

    <div class="flex-1">
      <div
        class="flex text-[28px] -top-2.5e horse relative"
        :style="{
          animationDuration: horse.speed * 3 + 's',
        }"
        :class="{ running: isRunning }"
      >
        <span class="text-[black] text-[10px] font-[bold] mt-10 pr-2">{{
          horse.name
        }}</span>
        <img src="../../assets/horse.svg" width="50" height="50" class="mt-6" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .horse {
    left: 0;
  }

  .horse.running {
    animation-name: run;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes run {
    from {
      left: 0%;
    }

    to {
      left: 85%;
    }
  }
</style>
