<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import useShowroomStore from '../../application/showroom.store.js';
import TechSelfSectionSummary from '../components/tech-self-section-summary.vue';

const { t } = useI18n();
const showroomStore = useShowroomStore();
const { sections, errors } = storeToRefs(showroomStore);

onMounted(() => showroomStore.loadShowroom());
</script>

<template>
  <section aria-labelledby="home-title" class="flex flex-column gap-4">
    <header>
      <h1 id="home-title" class="m-0">{{ t('home.title') }}</h1>
      <p>{{ t('home.content') }}</p>
    </header>
    <pv-message v-if="errors.length > 0" severity="error" aria-live="polite">
      {{ t('home.load-error') }}
    </pv-message>
    <section aria-labelledby="my-tech-collections-title">
      <h2 id="my-tech-collections-title">{{ t('home.my-tech-collections') }}</h2>
      <div class="grid">
        <div v-for="section in sections" :key="section.id" class="col-12 md:col-6">
          <tech-self-section-summary :section="section" :items="showroomStore.getItemsBySectionId(section.id)" />
        </div>
      </div>
    </section>
  </section>
</template>
