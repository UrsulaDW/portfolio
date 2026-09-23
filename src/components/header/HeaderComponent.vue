<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IHeaderType } from './type'
import { findOneHeader } from './header.api'

const header = ref<IHeaderType>()
onMounted(async () => {
  header.value = await findOneHeader()
})
</script>

<template>
  <div class="m-auto max-w-md mt-15">
    <h1 class="text-7xl text-black font-800">{{ header?.title }}</h1>
  </div>
</template>
