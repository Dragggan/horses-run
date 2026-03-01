<script setup lang="ts">
  defineProps<{
    horse: Horse;
  }>();
</script>

<template>
  <tr class="text-black">
    <td>{{ horse.name }}</td>
    <td>{{ horse.condition }}</td>
    <td>
      <div class="w-10 h-3 mx-auto" :style="{ backgroundColor: horse.color }" />
    </td>
  </tr>
</template>
