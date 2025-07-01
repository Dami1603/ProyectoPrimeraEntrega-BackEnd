/*const fs = require ('fs').promises
const path = './data/product.json'

class ProductManager {
    async getProducts() {
        try {
            const data = await fs.readFile(path, 'utf-8')
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            
        }
    }


    async getProductsById(id){
        const productos = await this.getProducts()
        return productos.find(p=> p.id === id)
    }


    async addProduct(productos) {
        if (productos.some(p => p.id === productos.id)) {
        throw new Error('El id del producto ya existe');
        }

        productos.push(newProducto);
        await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
        return newProducto;
    }


}

module.exports = ProductManager;
*/