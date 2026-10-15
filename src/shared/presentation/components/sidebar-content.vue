<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './language-switcher.vue';

const { t } = useI18n();
const options = [
  { label: 'option.home', icon: 'pi pi-home', to: { name: 'home' } },
  { label: 'option.new-laptop-inventory-item', icon: 'pi pi-plus-circle', to: { name: 'laptop-inventory-item-new' } }
];
</script>

<template>
  <div class="flex flex-column justify-content-between h-full gap-4">
    <nav class="flex flex-column gap-2" :aria-label="t('aria.navigation')">
      <router-link v-for="option in options" :key="option.label" :to="option.to" custom
                   v-slot="{ navigate, isActive }">
        <pv-button :label="t(option.label)" :icon="option.icon" :text="!isActive"
                   class="w-full justify-content-start" :aria-current="isActive ? 'page' : undefined"
                   @click="navigate" />
      </router-link>
    </nav>
    <language-switcher />
  </div>
</template>
