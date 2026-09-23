<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import type { IProjectsHeaderType, IProjectsType } from './type'
import { findOneProjectsHeader, findAllProjects } from './projects.api'
import { cockpitApiBaseUrl } from '@/shared/config.env'

import Swiper from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const projects_header = ref<IProjectsHeaderType>()
const projects_liste = ref<IProjectsType[]>([])

const swiperContainer = ref<HTMLElement | null>(null)
let swiper: Swiper | null = null

const swiperConfig = {
  modules: [Autoplay, Navigation],

  slidesPerView: 1,
  spaceBetween: 20,

  loop: true,
  speed: 600,
  grabCursor: true,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  navigation: {
    nextEl: '.projects-button-next',
    prevEl: '.projects-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },

    1280: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
  },
}

onMounted(async () => {
  projects_header.value = await findOneProjectsHeader()
  projects_liste.value = await findAllProjects()

  setTimeout(() => {
    if (swiperContainer.value && projects_liste.value.length > 0) {
      swiper = new Swiper(swiperContainer.value, swiperConfig)
    }
  }, 100)
})

onUnmounted(() => {
  if (swiper) {
    swiper.destroy(true, true)
    swiper = null
  }
})

const goToNext = () => {
  if (swiper) {
    swiper.slideNext()
  }
}

const goToPrev = () => {
  if (swiper) {
    swiper.slidePrev()
  }
}
</script>

<template>
  <section
    id="projects"
    class="bg-[#08090C] px-6 md:px-12 lg:px-30 pt-20 pb-20 border-t border-[#1E293B]"
  >
    <!-- HEADER -->
    <div>
      <h2 class="font-geist-mono text-[#00F5FF] text-lg mb-4">
        {{ projects_header?.subtitle }}
      </h2>

      <h1 class="font-geist font-bold text-4xl text-white">
        {{ projects_header?.title }}
      </h1>
    </div>

    <!-- SLIDER -->
    <div class="relative mt-20">
      <div ref="swiperContainer" class="swiper projects-swiper">
        <div class="swiper-wrapper">
          <div
            v-for="project in projects_liste"
            :key="project.title"
            class="swiper-slide transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer justify-center"
          >
            <article class="w-full h-full border-2 border-[#1E293B] rounded-2xl bg-[#171A26]">
              <!-- IMAGE -->
              <div class="h-52">
                <img
                  :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${project.picture.path}`"
                  :alt="project.title"
                  class="w-full h-full object-cover rounded-t-2xl"
                  loading="lazy"
                />
              </div>

              <!-- CONTENT -->
              <div class="p-7">
                <h2 class="text-white font-geist font-bold text-2xl">
                  {{ project.title }}
                </h2>

                <p class="text-[#94A3B8] font-geist mt-3 text-lg leading-relaxed">
                  {{ project.description }}
                </p>

                <!-- TECHNOLOGIES -->
                <div class="flex flex-wrap gap-2 mt-5 mb-6">
                  <span
                    v-for="technology in project.technologies.split(',')"
                    :key="technology"
                    class="px-3 py-1 rounded bg-[#2d34473d] text-[#94A3B8] font-geist-mono text-sm"
                  >
                    {{ technology.trim() }}
                  </span>
                </div>

                <!-- LINK -->
                <a
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-[#00F5FF] font-geist-mono font-semibold transition-opacity hover:opacity-70"
                >
                  Voir le projet
                  <span>↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- PREVIOUS -->
      <button
        type="button"
        @click="goToPrev"
        class="projects-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20"
        aria-label="Projet précédent"
      >
        ←
      </button>

      <!-- NEXT -->
      <button
        type="button"
        @click="goToNext"
        class="projects-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20"
        aria-label="Projet suivant"
      >
        →
      </button>
    </div>
  </section>
</template>

<style scoped>
.projects-swiper {
  width: 100%;
}

.swiper-wrapper {
  align-items: stretch;
}

.swiper-slide {
  height: auto;
  display: flex;
}

.swiper-slide > article {
  width: 85%;
}

/* BOUTONS */
.projects-button-prev,
.projects-button-next {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #1e293b;
  border-radius: 9999px;

  background: #171a26;
  color: #00f5ff;

  font-family: monospace;
  font-size: 20px;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.projects-button-prev:hover,
.projects-button-next:hover {
  background: #00f5ff;
  color: #08090c;
}

/* MOBILE */
@media (max-width: 768px) {
  .projects-button-prev,
  .projects-button-next {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .projects-button-prev {
    left: 8px;
  }

  .projects-button-next {
    right: 8px;
  }
}
</style>
