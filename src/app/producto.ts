export class Producto {

    private id!:String;
    private name!: String
    private description!: String
    private price!: Number
    private availability!: Boolean
    private type!: String
    private image!: String;

    public constructor(id:String, name: String, price: Number, description: String, image: String, availability: Boolean, type: String) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.availability = availability;
        this.type = type;
    }


    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getPrice(){
        return this.price;
    }
    getImage(){
        return this.image;
    }
    getType(){
        return this.type;
    }
    getAvailability(){
        return this.availability;
    }

    setDescription(value:String){
        this.description = value;
    }
    setPrice(value:Number){
        this.price = value;
    }
    setAvailability(){
        this.availability = !this.availability;
    }

}
