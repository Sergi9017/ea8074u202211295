export class TechShelfSection {
    constructor({ id = null, name = '', laptopCategory = '', maxCapacity = 0 }) {
        this.id = id;
        this.name = name;
        this.laptopCategory = laptopCategory;
        this.maxCapacity = maxCapacity;
    }

    getTotalLaptops(items) {
        return items
            .filter(item => item.sectionId === this.id)
            .reduce((total, item) => total + item.quantity, 0);
    }

    getAvailableCapacity(items) {
        return this.maxCapacity - this.getTotalLaptops(items);
    }

    canRegister(quantity, items) {
        return Number.isInteger(quantity) && quantity >= 1 && quantity <= this.getAvailableCapacity(items);
    }
}
