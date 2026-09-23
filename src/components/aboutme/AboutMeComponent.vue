<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IAboutMeType } from './type'
import { findOneAboutMe } from './aboutme.api'
import { cockpitApiBaseUrl } from '@/shared/config.env'

const aboutme = ref<IAboutMeType>()
onMounted(async () => {
  aboutme.value = await findOneAboutMe()
})
</script>

<template>
  <section class="grid grid-cols-2 gap-10 mt-8 bg-[#08090c] px-30 pb-20">
    <!-- Colonne gauche -->
    <div>
      <span
        class="text-[#00F5FF] font-geist-mono border-[0.5px] border-[#00F5FF] rounded-full px-3 py-1"
      >
        {{ aboutme?.availability }}
      </span>

      <h1 class="text-white font-geist font-bold text-6xl mt-6 mb-4">{{ aboutme?.name }}</h1>

      <p class="text-cyan-400 font-geist-mono font-medium text-xl mb-6">{{ aboutme?.job }}</p>

      <p class="text-gray-400 font-geist text-lg mb-8 w-5/6 text-justify">
        {{ aboutme?.presentation }}
      </p>

      <div class="flex gap-4">
        <a href="#projects">
          <button
            class="bg-cyan-400 font-geist font-semibold rounded-lg px-5 py-3 transition-all duration-300 hover:scale-105"
          >
            {{ aboutme?.box1 }}
          </button>
        </a>
        <a href="#contact">
          <button
            class="border border-[#334155] text-white font-geist font-semibold px-5 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            {{ aboutme?.box2 }}
          </button>
        </a>
      </div>
    </div>

    <!-- Colonne droite : faux éditeur de code -->
    <div class="flex flex-col border border-[#475569] rounded-xl">
      <div class="flex gap-3 border-b border-[#475569] py-2 px-4">
        <span class="bg-[#00F5FF] rounded-full w-4 h-4"></span>
        <span class="bg-[#00F5FF] rounded-full w-4 h-4"></span>
        <span class="bg-[#27C93F] rounded-full w-4 h-4"></span>
        <span class="ml-2 text-gray-500 font-mono tewt-xs">dev</span>
      </div>

      <div class="flex flex-col gap-2 text-lg px-4 pt-8 pb-16 rounded-xl bg-[#11131C]">
        <p>
          <span class="text-[#475569]">01</span>
          <span class="text-[#00F5FF] ml-2">const</span>
          <span class="ml-2 text-white">developpeur</span>
          <span class="ml-2 text-cyan-400">=</span>
          <span class="text-white">{</span>
        </p>
        <p>
          <span class="text-[#475569]">02</span>
          <span class="text-[#94A3B8] ml-8">name:</span>
          <span class="ml-2 text-[#A5D6FF]">"Ursula EDOH"</span>
        </p>
        <p>
          <span class="text-[#475569]">03</span>
          <span class="text-[#94A3B8] ml-8">role:</span>
          <span class="ml-2 text-[#A5D6FF]">"Data Engineer"</span>
        </p>
        <p>
          <span class="text-[#475569]">04</span>
          <span class="text-[#94A3B8] ml-8">skills:</span>
          <span class="ml-2 text-[#94A3B8]">[</span>
          <span class="ml-2 text-[#A5D6FF]">"React", "Node", "Docker"</span>
          <span class="ml-2 text-[#94A3B8]">]</span>
        </p>
        <p>
          <span class="text-[#475569]">05</span>
          <span class="text-white ml-4">};</span>
        </p>
        <p>
          <span class="text-[#00F5FF]">$</span>
          <span class="text-white ml-5">npm run build:success</span>
        </p>
        <p>
          <span class="text-[#475569]">&gt;</span>
          <span class="text-green-400 ml-5">Portfolio compiled successfully.</span>
        </p>
        <p>
          <span class="text-[#475569]">&gt;</span>
          <span class="text-[#00F5FF] ml-5">Active session on port 3000</span>
        </p>
      </div>
    </div>
  </section>
</template>
