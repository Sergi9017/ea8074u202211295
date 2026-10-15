<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const languages = [
  { label: 'EN', value: 'en' },
  { label: 'ES', value: 'es' }
];
</script>

<template>
  <div role="group" :aria-label="t('aria.language-switcher')">
    <pv-select-button v-model="locale" :options="languages" option-label="label" option-value="value"
                      :allow-empty="false" :aria-label="t('aria.language-switcher')" />
  </div>
</template>
