import { LaptopInventoryItem } from '../domain/model/laptop-inventory-item.entity.js';
import { LaptopInventoryItemResource } from './laptop-inventory-item.resource.js';
import { LaptopInventoryItemRequest } from './laptop-inventory-item.request.js';

export class LaptopInventoryItemAssembler {
    static toEntityFromResource(resource) {
        return new LaptopInventoryItem({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        return response.data
            .map(data => LaptopInventoryItemAssembler.toEntityFromResource(new LaptopInventoryItemResource(data)));
    }

    static toEntityFromCreateResponse(response) {
        if (response.status !== 201) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        return LaptopInventoryItemAssembler.toEntityFromResource(new LaptopInventoryItemResource(response.data));
    }

    static toRequestFromEntity(entity) {
        return new LaptopInventoryItemRequest({
            sectionId: entity.sectionId,
            laptopCategoryId: entity.laptopCategoryId,
            laptopId: entity.laptopId,
            laptopName: entity.laptopName,
            price: entity.price,
            imageUrl: entity.imageUrl,
            quantity: entity.quantity,
            registeredAt: new Date().toISOString()
        });
    }
}
