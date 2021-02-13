//Importamos el Schema del producto
import Product from '../models/Products';

//Clase para el control de productos
class productController {
    constructor(data) {
        data = data;
    };
    // Obtener la lista de productos   
    async getProduct(req, res) {
        const products = await Product.find();
        res.status(200).json(products);
    };
    // Obtener un producto por ID
    async getProductByID(req, res) {
        const products = await Product.findById(req.params.id);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(400).json({ value: false })
        }
    };
    // Crear un nuevo producto
    async createProduct(req, res) {
        const { name, category, price, imgURL } = req.body;
        /*Creamos el producto y lo agregamos al Schema*/
        const newProduct = new Product({
            name,
            category,
            price,
            imgURL
        });
        // guardamos los datos en la base de datos
        await newProduct.save();
        //Devolvemos la info a la base de datos
        res.status(201).json({
            value: true,
            product: newProduct
        });
    };
    // Actualizar un producto
    async updateProductByID(req, res) {

        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json(updateProduct)
    };
    // Eliminar un producto
    async deleteProductByID(req, res) {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(204).json();
    };
};

export default productController;