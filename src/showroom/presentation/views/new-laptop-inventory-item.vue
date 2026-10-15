<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useShowroomStore from '../../application/showroom.store.js';
import useLaptopsStore from '../../../laptops/application/laptops.store.js';
import { LaptopInventoryItem } from '../../domain/model/laptop-inventory-item.entity.js';
import { formatCurrency } from '../../../shared/presentation/utils/currency-formatter.js';

const { t, locale } = useI18n();
const router = useRouter();
const showroomStore = useShowroomStore();
const laptopsStore = useLaptopsStore();
const { sections, isLoading } = storeToRefs(showroomStore);
const { laptops, isLoading: isLoadingLaptops } = storeToRefs(laptopsStore);

const selectedSectionId = ref(null);
const selectedLaptop = ref(null);
const quantity = ref(1);
const hasCreateError = ref(false);
const isSaving = ref(false);

const selectedSection = computed(() => sections.value.find(section => section.id === selectedSectionId.value));
const sectionItems = computed(() => showroomStore.getItemsBySectionId(selectedSectionId.value));
const availableCapacity = computed(() =>
    selectedSection.value ? selectedSection.value.getAvailableCapacity(sectionItems.value) : 0);
const isQuantityValid = computed(() =>
    selectedSection.value ? selectedSection.value.canRegister(quantity.value, sectionItems.value) : false);
const isWholePositive = computed(() => Number.isInteger(quantity.value) && quantity.value >= 1);
const canCreate = computed(() =>
    !isLoading.value && !isSaving.value && !!selectedLaptop.value && isQuantityValid.value);

watch(selectedSectionId, async () => {
  selectedLaptop.value = null;
  laptopsStore.clearLaptops();
  if (selectedSection.value) {
    await laptopsStore.fetchLaptopsByCategory(selectedSection.value.laptopCategory);
  }
});

onMounted(() => showroomStore.loadShowroom());

async function onCreate() {
  isSaving.value = true;
  hasCreateError.value = false;
  const item = new LaptopInventoryItem({
    sectionId: selectedSection.value.id,
    laptopCategoryId: selectedSection.value.laptopCategory,
    laptopId: selectedLaptop.value.id,
    laptopName: selectedLaptop.value.name,
    price: selectedLaptop.value.price,
    imageUrl: selectedLaptop.value.imageUrl,
    quantity: quantity.value
  });
  const created = await showroomStore.createLaptopInventoryItem(item);
  isSaving.value = false;
  if (created) {
    router.push({ name: 'home' });
  } else {
    hasCreateError.value = true;
  }
}

function onCancel() {
  router.push({ name: 'home' });
}
</script>

<template>
  <section aria-labelledby="new-item-title" class="flex flex-column gap-4">
    <header>
      <h1 id="new-item-title" class="m-0">{{ t('new-laptop-inventory-item.title') }}</h1>
      <p>{{ t('new-laptop-inventory-item.subtitle') }}</p>
    </header>

    <pv-card>
      <template #content>
        <div class="flex flex-column gap-4">
          <div class="flex flex-column gap-2">
            <label for="section-select" class="font-bold">{{ t('new-laptop-inventory-item.section') }}</label>
            <pv-select v-model="selectedSectionId" input-id="section-select" :options="sections"
                       option-label="name" option-value="id" :loading="isLoading"
                       :placeholder="t('new-laptop-inventory-item.section-placeholder')" class="w-full" />
          </div>

          <div class="flex flex-column gap-2">
            <label for="laptop-select" class="font-bold">{{ t('new-laptop-inventory-item.laptop') }}</label>
            <pv-select v-model="selectedLaptop" input-id="laptop-select" :options="laptops"
                       option-label="name" data-key="id" :loading="isLoadingLaptops"
                       :disabled="!selectedSection"
                       :placeholder="t('new-laptop-inventory-item.laptop-placeholder')" class="w-full" />
          </div>

          <div v-if="selectedLaptop" class="flex align-items-center gap-4" aria-live="polite">
            <pv-image :src="selectedLaptop.imageUrl" :alt="selectedLaptop.name" width="120" />
            <div class="flex flex-column">
              <span class="font-bold">{{ selectedLaptop.name }}</span>
              <span>{{ t('new-laptop-inventory-item.price') }}: {{ formatCurrency(selectedLaptop.price, locale) }}</span>
            </div>
          </div>

          <div class="flex flex-column gap-2">
            <label for="quantity-input" class="font-bold">{{ t('new-laptop-inventory-item.quantity') }}</label>
            <pv-input-number v-model="quantity" input-id="quantity-input" :min="1" :use-grouping="false"
                             show-buttons class="w-full" />
            <small v-if="selectedSection">
              {{ t('new-laptop-inventory-item.available-capacity') }}: {{ availableCapacity }}
            </small>
            <small aria-live="polite" class="p-error">
              <template v-if="!isWholePositive">{{ t('new-laptop-inventory-item.invalid-quantity') }}</template>
              <template v-else-if="selectedSection && !isQuantityValid">
                {{ t('new-laptop-inventory-item.exceeds-capacity') }}
              </template>
            </small>
          </div>

          <pv-message v-if="hasCreateError" severity="error" aria-live="polite">
            {{ t('new-laptop-inventory-item.create-error') }}
          </pv-message>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2">
          <pv-button icon="pi pi-check" :label="t('new-laptop-inventory-item.create')" :disabled="!canCreate"
                     @click="onCreate" />
          <pv-button icon="pi pi-times" severity="secondary" :label="t('new-laptop-inventory-item.cancel')"
                     @click="onCancel" />
        </div>
      </template>
    </pv-card>
  </section>
</template>
