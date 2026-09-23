<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IPresentationType } from './type'
import { findOnePresentation } from './presentation.api'
import { cockpitApiBaseUrl } from '@/shared/config.env'

const presentation = ref<IPresentationType>()
onMounted(async () => {
  presentation.value = await findOnePresentation()
})
</script>

<template>
  <section class="bg-[#11131C] px-30 pt-20 pb-20 border border-t-[#1E293B]">
    <!-- subtitle et title -->
    <div>
      <h2 class="font-geist-mono text-[#00F5FF] text-lg mb-4">{{ presentation?.subtitle }}</h2>
      <h1 class="font-geist font-bold text-4xl text-white">{{ presentation?.title }}</h1>
    </div>

    <div class="flex gap-20 mt-8">
      <!-- Colonne gauche : image -->
      <div class="aspect-video rounded-3xl overflow-hidden border-2">
        <img
          :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${presentation?.picture.path}`"
          class="object-cover w-full h-full"
          alt="Photo de présentation"
          loading="lazy"
        />
      </div>

      <!-- Colonne droite -->
      <div class="flex flex-col gap-4">
        <!-- petit texte de presentation -->
        <div class="text-[#94A3B8] font-geist text-justify w-5/6">
          {{ presentation?.presentation }}
        </div>

        <!-- les infos -->
        <div class="flex gap-40 mt-20">
          <div class="flex flex-col gap-2">
            <span class="text-[#00F5FF] font-geist-mono text-4xl font-semibold">{{
              presentation?.number1
            }}</span>
            <span class="text-[#94A3B8] font-geist">{{ presentation?.info1 }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-[#00F5FF] font-geist-mono text-4xl font-semibold">{{
              presentation?.number2
            }}</span>
            <span class="text-[#94A3B8] font-geist">{{ presentation?.info2 }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-[#00F5FF] font-geist-mono text-4xl font-semibold">{{
              presentation?.number3
            }}</span>
            <span class="text-[#94A3B8] font-geist">{{ presentation?.info3 }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
