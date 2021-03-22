export class Order{
    id: string;
    number: number;
    date: Date;

    constructor(id, number, date){
        this.id = id;

        this.number = number;

        this.date = new Date(date.toDate());
    }

}