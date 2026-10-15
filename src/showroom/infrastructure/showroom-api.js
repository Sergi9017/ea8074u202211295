import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

export class ShowroomApi extends BaseApi {
    #techShelfSectionsEndpoint;
    #laptopInventoryItemsEndpoint;

    constructor() {
        super(import.meta.env.VITE_PLATFORM_API_URL);
        this.#techShelfSectionsEndpoint = new BaseEndpoint(this,
            import.meta.env.VITE_TECH_SHELF_SECTIONS_ENDPOINT_PATH);
        this.#laptopInventoryItemsEndpoint = new BaseEndpoint(this,
            import.meta.env.VITE_LAPTOP_INVENTORY_ITEMS_ENDPOINT_PATH);
    }

    getTechShelfSections() {
        return this.#techShelfSectionsEndpoint.getAll();
    }

    getLaptopInventoryItems() {
        return this.#laptopInventoryItemsEndpoint.getAll();
    }

    createLaptopInventoryItem(request) {
        return this.#laptopInventoryItemsEndpoint.create(request);
    }
}
