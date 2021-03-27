export class Product{
    
    id: string;

    name: string;

    desc: string;

    price: number;

    cat?: string;

    url?: string;


    constructor(id, name, desc, price, cat?: string, url?: string){

        this.id = id;

        this.name = name;

        this.desc = desc;

        this.price = price;

        this.cat = cat;

        this.url = url;

    }

}