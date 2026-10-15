import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

export class LaptopsApi extends BaseApi {
    #laptopsByCategoryEndpoint;

    constructor() {
        super(import.meta.env.VITE_DUMMY_JSON_API_URL);
        this.#laptopsByCategoryEndpoint = new BaseEndpoint(this,
            import.meta.env.VITE_LAPTOPS_BY_CATEGORY_ENDPOINT_PATH);
    }

    getLaptopsByCategory(category) {
        return this.#laptopsByCategoryEndpoint.getAllByPath(category);
    }
}
