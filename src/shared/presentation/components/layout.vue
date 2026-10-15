<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import SidebarContent from './sidebar-content.vue';

const { t } = useI18n();
const isSidebarVisible = ref(true);
const logoUrl = import.meta.env.VITE_APP_LOGO_URL;
</script>

<template>
  <div class="flex flex-column min-h-screen">
    <pv-toolbar :aria-label="t('aria.toolbar')">
      <template #start>
        <div class="flex align-items-center gap-3">
          <pv-button icon="pi pi-bars" text rounded :aria-label="t('aria.toggle-sidebar')"
                     :aria-expanded="isSidebarVisible" @click="isSidebarVisible = !isSidebarVisible" />
          <pv-image :src="logoUrl" :alt="t('toolbar.logo-alt')" width="32" />
          <span class="text-xl font-bold">{{ t('app.title') }}</span>
        </div>
      </template>
    </pv-toolbar>
    <div class="flex flex-1">
      <aside v-if="isSidebarVisible" class="w-18rem p-3 border-right-1 surface-border"
             :aria-label="t('aria.sidebar')">
        <sidebar-content />
      </aside>
      <main class="flex-1 p-4" :aria-label="t('aria.main-content')">
        <slot />
      </main>
    </div>
  </div>
</template>