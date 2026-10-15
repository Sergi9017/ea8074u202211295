<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatCurrency } from '../../../shared/presentation/utils/currency-formatter.js';

const props = defineProps({
  section: { type: Object, required: true },
  items: { type: Array, default: () => [] }
});

const { t, locale } = useI18n();
const totalLaptops = computed(() => props.section.getTotalLaptops(props.items));
const availableCapacity = computed(() => props.section.getAvailableCapacity(props.items));
</script>

<template>
  <pv-card class="h-full" role="region" :aria-labelledby="`section-title-${section.id}`">
    <template #header>
      <h3 :id="`section-title-${section.id}`" class="m-0 p-3 text-xl">{{ section.name }}</h3>
    </template>
    <template #content>
      <p v-if="items.length === 0" aria-live="polite">{{ t('tech-shelf-section-summary.no-laptops') }}</p>
      <ul v-else class="list-none m-0 p-0 flex flex-column gap-3">
        <li v-for="item in items" :key="item.id" class="flex align-items-center gap-3">
          <pv-image :src="item.imageUrl" :alt="item.laptopName" width="64" />
          <div class="flex flex-column">
            <span class="font-bold">{{ item.laptopName }}</span>
            <span>{{ formatCurrency(item.price, locale) }}</span>
            <span>{{ t('tech-shelf-section-summary.quantity') }}: {{ item.quantity }}</span>
          </div>
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex justify-content-between">
        <span>{{ t('tech-shelf-section-summary.total-laptops') }}: <strong>{{ totalLaptops }}</strong></span>
        <span>{{ t('tech-shelf-section-summary.available-capacity') }}: <strong>{{ availableCapacity }}</strong></span>
      </div>
    </template>
  </pv-card>
</template>
