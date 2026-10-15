export class LaptopInventoryItemRequest {
    constructor({ sectionId, laptopCategoryId, laptopId, laptopName, price, imageUrl, quantity, registeredAt }) {
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
