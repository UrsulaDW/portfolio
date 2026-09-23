<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IContactHeaderType } from './type'
import type { IContactType } from './type'
import type { IContactFormulaireType } from './type'
import { findOneContactHeader } from './contact.api'
import { findOneContact } from './contact.api'
import { findOneContactFormulaire } from './contact.api'
import { cockpitApiBaseUrl } from '@/shared/config.env'
import emailjs from '@emailjs/browser'

const contact_header = ref<IContactHeaderType>()
onMounted(async () => {
  contact_header.value = await findOneContactHeader()
})

const contact = ref<IContactType>()
onMounted(async () => {
  contact.value = await findOneContact()
})

onMounted(async () => {
  contact.value = await findOneContact()
})

const contact_formulaire = ref<IContactFormulaireType>()
onMounted(async () => {
  contact_formulaire.value = await findOneContactFormulaire()
})

const form = ref({
  name: '',
  mail_sender: '',
  message: '',
})

const sending = ref(false)
const success = ref(false)

const sendMessage = async () => {
  sending.value = true
  success.value = false

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.value.name,
        mail_sender: form.value.mail_sender,
        message: form.value.message,
      },
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      },
    )

    success.value = true

    form.value = {
      name: '',
      mail_sender: '',
      message: '',
    }
  } catch (error) {
    console.error('Erreur EmailJS :', error)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contact" class="bg-[#11131C] px-30 pt-20 pb-20 border border-t-[#1E293B]">
    <div class="flex gap-150">
      <!-- Partie de gauche -->
      <div>
        <!-- subtitle et title -->
        <div>
          <h2 class="font-geist-mono text-[#00F5FF] text-lg mb-4">
            {{ contact_header?.subtitle }}
          </h2>
          <h1 class="font-geist font-bold text-4xl text-white">{{ contact_header?.title }}</h1>
        </div>
        <!-- Paragraphe -->
        <p class="text-white mt-15">{{ contact?.description }}</p>
        <!-- Mail -->
        <div class="mt-7">
          <a :href="contact?.mail_url" class="flex gap-4">
            <img
              v-if="contact?.mail_logo?.path"
              :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${contact?.mail_logo.path}`"
              class="object-cover w-7 h-7 text-[#00F5FF] rounded-sm"
              alt="logo"
              loading="lazy"
            />
            <span class="text-white">{{ contact?.mail }}</span>
          </a>
        </div>
        <!-- Téléphone -->
        <div class="mt-4">
          <a :href="contact?.tel_url" class="flex gap-4">
            <img
              v-if="contact?.tel_logo?.path"
              :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${contact?.tel_logo.path}`"
              class="object-cover w-7 h-7 rounded-sm"
              alt="logo"
              loading="lazy"
            />
            <span class="text-white">{{ contact?.tel }}</span>
          </a>
        </div>
        <!-- Mobilité -->
        <div class="mt-4 flex gap-4">
          <img
            v-if="contact?.mobility_logo?.path"
            :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${contact?.mobility_logo.path}`"
            class="object-cover w-7 h-7 rounded-sm"
            alt="logo"
            loading="lazy"
          />
          <span class="text-white">{{ contact?.mobility }}</span>
        </div>
        <!-- Réseaux sociaux -->
        <div class="flex gap-6 mt-10">
          <a :href="contact?.linkedin_url">
            <img
              v-if="contact?.linkedin_logo?.path"
              :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${contact?.linkedin_logo.path}`"
              class="object-cover w-10 h-10 bg-[#171A26] rounded-lg p-2 border border-[#1E293B]"
              alt="logo"
              loading="lazy"
            />
          </a>
          <a :href="contact?.git_url">
            <img
              v-if="contact?.git_logo?.path"
              :src="`${cockpitApiBaseUrl.replace('/api', '')}/storage/uploads${contact?.git_logo.path}`"
              class="object-cover w-10 h-10 bg-[#171A26] rounded-lg p-2 border border-[#1E293B]"
              alt="logo"
              loading="lazy"
            />
          </a>
        </div>
      </div>
      <!-- Formulaire -->
      <div
        class="border border-1 border-[#1E293B] pl-10 pr-30 py-6 text-left bg-[#08090C] rounded-2xl"
      >
        <form @submit.prevent="sendMessage">
          <label for="name" class="block mb-2 text-[#00F5FF] font-geist-mono">
            {{ contact_formulaire?.name }}
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Nom"
            required
            class="py-2 w-110 border border-[#1E293B] rounded-lg bg-transparent outline-none text-[#475569] font-geist mb-6"
          />
          <label for="mail_sender" class="block mb-2 text-[#00F5FF] font-geist-mono">
            {{ contact_formulaire?.mail_sender }}
          </label>
          <input
            id="mail_sender"
            v-model="form.mail_sender"
            type="email"
            placeholder="Email"
            required
            class="py-2 w-110 border border-[#1E293B] rounded-lg bg-transparent text-[#475569] font-geist outline-none mb-6"
          />
          <label for="message" class="block mb-2 text-[#00F5FF] font-geist-mono">
            {{ contact_formulaire?.message }}
          </label>
          <textarea
            v-model="form.message"
            placeholder="Votre message"
            required
            class="pt-1 pl-1 py-20 w-110 border border-[#1E293B] rounded-lg bg-transparent text-[#475569] font-geist outline-none mb-6"
          ></textarea>

          <button
            type="submit"
            class="bg-[#00F5FF] rounded-lg px-10 py-3 mx-auto w-full text-[#1E293B] font-semibold font-geist cursor-pointer"
          >
            Envoyer
          </button>
          <p v-if="success" class="mt-4 text-[#00F5FF] font-geist-mono">
            Message envoyé avec succès !
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
