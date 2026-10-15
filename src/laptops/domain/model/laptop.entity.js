export class Laptop {
    constructor({ id = null, name = '', price = 0, imageUrl = '' }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
