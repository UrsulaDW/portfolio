<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IParcoursHeaderType } from './type'
import type { IParcoursType } from './type'
import { findOneParcoursHeader } from './parcours.api'
import { findAllParcours } from './parcours.api'

const parcours_header = ref<IParcoursHeaderType>()
onMounted(async () => {
  parcours_header.value = await findOneParcoursHeader()
})

const parcours_liste = ref<IParcoursType[]>([])
onMounted(async () => {
  parcours_liste.value = await findAllParcours()
})
</script>

<template>
  <section class="bg-[#08090C] px-30 pt-20 pb-20 border border-t-[#1E293B]">
    <!-- subtitle et title -->
    <div class="flex flex-col gap-4">
      <h2 class="font-geist-mono text-[#00F5FF] text-lg mb-4">{{ parcours_header?.subtitle }}</h2>
      <h1 class="font-geist font-bold text-4xl text-white">{{ parcours_header?.title }}</h1>
    </div>

    <!-- Tmeline -->
    <div class="mt-12">
      <div v-for="parcour in parcours_liste" :key="parcour.year" class="flex gap-4">
        <!-- Partie gauche : année et status -->
        <div class="flex gap-2 w-48 shrink-0 font-geist-mono">
          <span class="text-[#00F5FF]">{{ parcour?.year }}</span>
          <span class="text-[#00F5FF]">{{ parcour?.status }}</span>
        </div>

        <!-- Partie droite : ce que j'ai fait -->
        <div class="flex gap-4">
          <!-- rond et ligne horizontale -->
          <div class="flex flex-col">
            <span class="bg-[#00F5FF] rounded-full w-2 h-2"></span>
            <span class="bg-[#00F5FF] w-[1px] h-30 ml-1"></span>
          </div>

          <!-- Ce que j'ai fait -->
          <div class="flex gap-1 flex-col text-white font-geist">
            <h1 class="font-bold text-sm">{{ parcour?.titled }}</h1>
            <p class="text-[#94A3B8] text-sm">{{ parcour?.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
