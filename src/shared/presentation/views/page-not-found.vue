<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
</script>

<template>
  <section class="flex flex-column align-items-center gap-3 p-4" aria-labelledby="page-not-found-title">
    <h1 id="page-not-found-title" class="m-0">{{ t('page-not-found.title') }}</h1>
    <p aria-live="polite">{{ t('page-not-found.message', { route: route.fullPath }) }}</p>
    <pv-button icon="pi pi-home" :label="t('page-not-found.go-home')" @click="router.push({ name: 'home' })" />
  </section>
</template>
