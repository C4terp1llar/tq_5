<script setup lang="ts">
defineProps<{
  heading: string,
  text?: string
}>()
</script>

<template>
  <div class="notice-block__wrapper text-center">
    <h3>{{heading}}</h3>
    <span v-if="text">{{text}}</span>
  </div>
</template>

<style scoped>

</style>