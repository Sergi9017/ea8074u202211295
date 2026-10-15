export class LaptopInventoryItemResource {
    constructor({
                    id = null, sectionId = null, laptopCategoryId = '', laptopId = null, laptopName = '',
                    price = 0, imageUrl = '', quantity = 0, registeredAt = null
                }) {
        this.id = id;
        this.sectionId = sectionId;
        this.laptopCategoryId = laptopCategoryId;
        this.laptopId = laptopId;
        this.laptopName = laptopName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.registeredAt = registeredAt;
    }
}
