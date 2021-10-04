const products = [];

module.exports = class Product{
    constructor(title, price, description){
        this.title= t;
        this.price = p;
        this.description =d ;
    }

    save(){
        products.push(this);
    }

    static fetchAll(){
        return this.products;
    }
}

