import { Laptop } from '../domain/model/laptop.entity.js';
import { LaptopResource } from './laptop.resource.js';
import { LaptopsResponse } from './laptops.response.js';

export class LaptopAssembler {
    static toEntityFromResource(resource) {
        return new Laptop({
            id: resource.id,
            name: resource.title,
            price: resource.price,
            imageUrl: resource.thumbnail
        });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const laptopsResponse = new LaptopsResponse(response.data);
        return laptopsResponse.products
            .map(product => LaptopAssembler.toEntityFromResource(new LaptopResource(product)));
    }
}
