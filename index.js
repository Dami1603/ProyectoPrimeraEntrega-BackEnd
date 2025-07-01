
const express = require('express'); 

const app= express()

/*
const ProductManager = require('./managers/ProductManager')
const manager = new ProductManager('./data/products.json')
*/
app.set('port', 8080);

const productos = [
    {id:1,title:"producto1",description:"descripcion del producto 1",code:"001",price:100,status:true,stock:10,category:"general",thumbnails:[]},
    {id:2,title:"producto2",description:"descripcion del producto 2",code:"002",price:200,status:true,stock:20,category:"general",thumbnails:[]},
    {id:3,title:"producto3",description:"descripcion del producto 3",code:"003",price:300,status:true,stock:30,category:"general",thumbnails:[]},
    {id:4,title:"producto4",description:"descripcion del producto 4",code:"004",price:400,status:true,stock:40,category:"general",thumbnails:[]},
    {id:5,title:"producto5",description:"descripcion del producto 5",code:"005",price:500,status:true,stock:50,category:"general",thumbnails:[]}    
]

app.use(express.json());

app.get('/api/products/', /*async*/ (req, res) => {
    /*const productos = await manager.getProducts()*/
    res.json(productos);
});

app.get('/api/products/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const producto = productos.find(p => p.id === parseInt(pid))/*await manager.getProductsById(parseInt(pid))*/;
        console.log(producto);
        if(!producto) {
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el producto'});
    }
});

app.post('/api/products/', /*async*/ (req, res) => {
    const {title, description, code, price, status, stock, category} = req.body;
    try {
        const newProducto = /*await manager.AddProduct(*/{
            id: productos.length + 1, 
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails: [],
        };
        productos.push(newProducto);
        res.status(201).json(newProducto);
    } catch (error) {   
        res.status(500).json({error: 'Error al agregar el producto'});
    }
}); 


app.put('/api/products/:pid', (req, res) => {
    const {pid} = req.params; 
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    try {
        const productosFound = productos.find((productos)=> productos.id === parseInt(pid));
        if(!productosFound) {
            return res.status(404).json({error: 'Producto no encontrado'});
        }
            productosFound.title = title,
            productosFound.description = description,
            productosFound.code = code,
            productosFound.price = price,
            productosFound.status = status,
            productosFound.stock = stock,
            productosFound.category = category,
            productosFound.thumbnails = thumbnails || [],
        res.status(200).json(productosFound);   
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el producto'});
    }
});

app.delete('/api/products/:pid', (req, res) => {
    const {pid} = req.params;
    try {
        const productosDelete = productos.findIndex(producto => producto.id === parseInt(pid));
        if (productosDelete === -1) {
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        productos.splice(productosDelete, 1);
        res.status(200).json({message: 'Producto eliminado correctamente'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el producto'});
    }
});


app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
})

carrito = [];

app.post('/api/carts/', (req, res) => {
    const {id, products} = req.body;
    try {
        const newCarrito = {
            id: id,
            productos : [products]
        }
        carrito.push(newCarrito);
        res.status(201).json(newCarrito);
    } catch (error) {
        res.status(500).json({error: 'Error al crear el carrito'});
    }
});

app.get('/api/carts/:cid', (req, res) => {
    
    try {
        const {cid} = req.params;
        const carritoFound = carrito.find(c=> c.id === parseInt(cid))
        if(!carritoFound) {
            return res.status(404).json({error: 'Carrito no encontrado'})
        }
        res.status(200).json(carritoFound)
    } catch (error) {
        return res.status(500).json({error:'Error al obtener el carrito'})
    }
    res.json(carrito);
});


app.post('/api/carts/:cid/products/:pid', (req, res) => {
    try {
        const {cid,pid} = req.params
        const quantity = req.body;
        const carritoFound = carrito.find(c=>c.id === parseInt(cid))
        if(!carritoFound){
            return res.status(404).json({error: 'Carrito no encontrado'})
        }
        const productoFound = productos.find(p=> p.id === parseInt(pid))    
        if(!productFound){
            return res.status(404).json({error: 'Carrito no encontrado'})
        }
        const cart = carrito[cartIndex];
        const productInCartIndex = cart.productos.findIndex(p => p.product === parseInt(pid));
        
        if (productInCartIndex !== -1) {
            cart.productos[productInCartIndex].quantity += quantity;
        } else {
            cart.productos.push({
                product: parseInt(pid),
                quantity: quantity
            });
        }
        res.status(201).json(newCarritoProduct)
    } catch (error) {
        res.status(500).json({error: 'Error al crear el carrito'});
    }
});


/*
Entrega N° 1
Descripción General

Desarrollar un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra para tu API.
Requisitos de la Primera Entrega
Desarrollo del Servidor

El servidor debe estar basado en Node.js y Express, y debe escuchar en el puerto 8080
. Se deben disponer dos grupos de rutas: /products
 y /carts
. Estos endpoints estarán implementados con el router de Express, con las siguientes especificaciones:
Rutas para Manejo de Productos (/api/products/
)

    GET /
    :

        Debe listar todos los productos de la base de datos.

    GET /:pid
    :

        Debe traer solo el producto con el id
         proporcionado.

    POST /
    :

        Debe agregar un nuevo producto con los siguientes campos:

            id
            : Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).

            title
            : String

            description
            : String

            code
            : String

            price
            : Number

            status
            : Boolean

            stock
            : Number

            category
            : String

            thumbnails
            : Array de Strings (rutas donde están almacenadas las imágenes del producto).

    PUT /:pid
    :

        Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el id
        al momento de hacer la actualización.

    DELETE /:pid
    :

        Debe eliminar el producto con el pid
         indicado.

Rutas para Manejo de Carritos (/api/carts/
)

    POST /
    :

        Debe crear un nuevo carrito con la siguiente estructura:

            id
            : Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).

            products
            : Array que contendrá objetos que representen cada producto.

    GET /:cid
    :

        Debe listar los productos que pertenecen al carrito con el cid
         proporcionado.

    POST /:cid/product/:pid
    :

        Debe agregar el producto al arreglo products
         del carrito seleccionado, utilizando el siguiente formato:

            product
            : Solo debe contener el ID del producto.

            quantity
            : Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).

        Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity
         de dicho producto.

Persistencia de la Información

    La persistencia se implementará utilizando el sistema de archivos, donde los archivos products.json
     y carts.json
     respaldarán la información.

    Se debe utilizar el ProductManager
     desarrollado en el desafío anterior y crear un CartManager
     para gestionar el almacenamiento de estos archivos JSON.

    Nota: No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

Formato del Entregable

    Proporcionar un enlace al repositorio de GitHub con el proyecto completo, sin la carpeta node_modules
    .

Criterios de evaluación 
*/
