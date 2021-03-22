import { callbackify } from "util";

export class Customer{
    
    private id: string;
    private firstname: string;
    private lastname: string;
    private phone: string;
    private gender: string;
    private email: string;

    constructor(id: string, firstname: string, lastname: string, phone: string, gender: string, email: string){
        this.id = id;

        this.firstname = firstname;

        this.lastname = lastname;

        this.phone = phone;

        this.gender = gender;

        this.email = email;

    }

    public getId(){ 
        return this.id;
    }

    public geteName(){
        return this.firstname;
    }

    public getSurname(){
        return this.lastname;
    }

    public getGender(){
        return this.gender;
    }
    
    public getPhone(){
        return this.phone;
    }

    public getEmail(){
        return this.email;
    }
}