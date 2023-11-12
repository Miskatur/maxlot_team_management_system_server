// import Product from "../models/products.model";
// import { Request, Response } from 'express';


// const getAllProduct = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const allProducts = await Product.find();

//         res.status(200).json({
//             status: 200,
//             products: allProducts
//         });
//     } catch (error: any) {
//         res.status(500).json({ status: 500, error: error.message });
//     }
// }

// const createProduct = async (req: Request, res: Response): Promise<void> => {
//     const product = req.body;
//     try {
//         const result = new Product(product);
//         await result.save()

//         res.status(200).json({
//             status: 200,
//             data: result
//         });
//     } catch (error: any) {
//         res.status(500).json({
//             status: 500,
//             error: error.message
//         });
//     }
// }

// const deleteProduct = async (req: Request, res: Response): Promise<void> => {
//     const id = req.params.id
//     try {
//         const product = await Product.findOneAndDelete({ _id: id })

//         res.status(200).json({
//             status: 200,
//             data: product
//         });

//     } catch (error: any) {
//         res.status(500).json({
//             status: 500,
//             error: error.message
//         })
//     }
// }


// export default {
//     getAllProduct,
//     createProduct,
//     deleteProduct
// }