import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LaptopsApi } from '../infrastructure/laptops-api.js';
import { LaptopAssembler } from '../infrastructure/laptop.assembler.js';

const laptopsApi = new LaptopsApi();

const useLaptopsStore = defineStore('laptops', () => {
    const laptops = ref([]);
    const errors = ref([]);
    const isLoading = ref(false);

    async function fetchLaptopsByCategory(category) {
        isLoading.value = true;
        try {
            const response = await laptopsApi.getLaptopsByCategory(category);
            laptops.value = LaptopAssembler.toEntitiesFromResponse(response);
        } catch (error) {
            laptops.value = [];
            errors.value.push(error);
        } finally {
            isLoading.value = false;
        }
    }

    function clearLaptops() {
        laptops.value = [];
    }

    return { laptops, errors, isLoading, fetchLaptopsByCategory, clearLaptops };
});

export default useLaptopsStore;
