import { ThisReceiver } from "@angular/compiler";

export class Order{
    id: string;

    number: number;

    date: Date;

    status: string;

    constructor(id, number, date, status){

        this.id = id;

        this.number = number;

        this.date = new Date(date.toDate());
        
        this.status = status;
        
    }

}