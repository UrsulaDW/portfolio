<!--
  Il contient ce qui est commun à toutes tes pages — typiquement un header (menu de navigation) et un footer,
  qui doivent s'afficher peu importe la page visitée (Accueil, À propos, Contact...).
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
</script>

<template>
  <!--HeaderComponent /-->
  <RouterView />
</template>
