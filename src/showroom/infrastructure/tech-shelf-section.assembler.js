import { TechShelfSection } from '../domain/model/tech-shelf-section.entity.js';
import { TechShelfSectionResource } from './tech-shelf-section.resource.js';

export class TechShelfSectionAssembler {
    static toEntityFromResource(resource) {
        return new TechShelfSection({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        return response.data
            .map(data => TechShelfSectionAssembler.toEntityFromResource(new TechShelfSectionResource(data)));
    }
}
