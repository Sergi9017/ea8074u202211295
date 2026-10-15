export class TechShelfSectionResource {
    constructor({ id = null, name = '', laptopCategory = '', maxCapacity = 0 }) {
        this.id = id;
        this.name = name;
        this.laptopCategory = laptopCategory;
        this.maxCapacity = maxCapacity;
    }
}
