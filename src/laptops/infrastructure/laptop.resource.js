export class LaptopResource {
    constructor({ id = null, title = '', price = 0, thumbnail = '' }) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}
