import { Product } from "./product.model";

export class Item{

    id: string;

    name: string;

    desc: string;

    price: number;

    quantity: number;

    total_price: number;

    constructor(id, product: Product, quantity, total_price){

        this.id = id;

        this.name = product.name;

        this.desc = product.desc;

        this.price = product.price;

        this.quantity = quantity;

        this.total_price = total_price;

    }
}