import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ShowroomApi } from '../infrastructure/showroom-api.js';
import { TechShelfSectionAssembler } from '../infrastructure/tech-shelf-section.assembler.js';
import { LaptopInventoryItemAssembler } from '../infrastructure/laptop-inventory-item.assembler.js';

const showroomApi = new ShowroomApi();

const useShowroomStore = defineStore('showroom', () => {
    const sections = ref([]);
    const items = ref([]);
    const errors = ref([]);
    const isLoading = ref(false);

    async function loadShowroom() {
        isLoading.value = true;
        errors.value = [];
        try {
            const [sectionsResponse, itemsResponse] = await Promise.all([
                showroomApi.getTechShelfSections(),
                showroomApi.getLaptopInventoryItems()
            ]);
            sections.value = TechShelfSectionAssembler.toEntitiesFromResponse(sectionsResponse);
            items.value = LaptopInventoryItemAssembler.toEntitiesFromResponse(itemsResponse);
        } catch (error) {
            errors.value.push(error);
        } finally {
            isLoading.value = false;
        }
    }

    function getItemsBySectionId(sectionId) {
        return items.value.filter(item => item.sectionId === sectionId);
    }

    async function createLaptopInventoryItem(item) {
        try {
            const request = LaptopInventoryItemAssembler.toRequestFromEntity(item);
            const response = await showroomApi.createLaptopInventoryItem(request);
            items.value.push(LaptopInventoryItemAssembler.toEntityFromCreateResponse(response));
            return true;
        } catch (error) {
            errors.value.push(error);
            return false;
        }
    }

    return { sections, items, errors, isLoading, loadShowroom, getItemsBySectionId, createLaptopInventoryItem };
});

export default useShowroomStore;
