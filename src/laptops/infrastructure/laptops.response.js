export class LaptopsResponse {
    constructor({ products = [], total = 0, skip = 0, limit = 0 }) {
        this.products = products;
        this.total = total;
        this.skip = skip;
        this.limit = limit;
    }
}
