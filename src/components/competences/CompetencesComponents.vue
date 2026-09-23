<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ICompetencesHeaderType } from './type'
import type { ICompetencesType } from './type'
import { findOneCompetencesHeader } from './competences.api'
import { findAllCompetences } from './competences.api'
import { cockpitApiBaseUrl } from '@/shared/config.env'

const competences_title = ref<ICompetencesHeaderType>()
onMounted(async () => {
  competences_title.value = await findOneCompetencesHeader()
})

const competences_liste = ref<ICompetencesType[]>([])
onMounted(async () => {
  competences_liste.value = await findAllCompetences()
})

const showCertification = ref(false)
</script>

<template>
  <section class="bg-[#11131C] px-30 pt-20 pb-20 border border-t-[#1E293B]">
    <!-- subtitle et title -->
    <div>
      <h2 class="font-geist-mono text-[#00F5FF] text-lg mb-4">{{ competences_title?.subtitle }}</h2>
      <h1 class="font-geist font-bold text-4xl text-white">{{ competences_title?.title }}</h1>
    </div>

    <!-- Tools présentation -->
    <div class="grid grid-cols-4 gap-14 mt-10">
      <div
        v-for="competence in competences_liste"
        :key="competence.name"
        class="border border-1 p-6 border-[#1E293B] rounded-2xl"
      >
        <!-- Éléments du haut -->
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <img
              v-if="competence?.logo?.path"
              :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${competence.logo.path}`"
              class="object-cover w-7 h-7 rounded-sm"
              alt="logo"
              loading="lazy"
            />
            <h2 class="text-white font-geist font-semibold text-xl">{{ competence?.name }}</h2>
          </div>

          <!-- Si CERTIFIÉ -->
          <button
            v-if="competence?.is_certified"
            @click="showCertification = true"
            class="bg-[#00F5FF24] text-[#00F5FF] font-geist-mono font-medium px-2 py-1 rounded"
          >
            {{ competence?.certification }}
          </button>
          <button
            v-else
            class="bg-[#80808024] text-[#808080] font-geist-mono font-medium px-2 py-1 rounded"
          >
            {{ competence?.certification }}
          </button>
        </div>

        <!-- Éléments du bas -->
        <div class="mt-8">
          <div class="flex justify-between items-center">
            <p class="text-[#94A3B8] font-geist text-xl">
              {{ competence?.master }}
            </p>

            <p class="text-lg text-[#00F5FF] font-geist-mono">
              {{ competence?.step }}
            </p>
          </div>

          <!-- Progression -->
          <div class="relative w-full h-1.5 mt-2">
            <!-- 100% : faible opacité -->
            <div class="absolute inset-0 bg-[#00F5FF]/20 rounded-full"></div>

            <!-- Progression : forte opacité -->
            <div
              class="absolute left-0 top-0 h-full bg-[#00F5FF] rounded-full transition-all duration-500"
              :style="{ width: `${competence?.step ?? 0}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
