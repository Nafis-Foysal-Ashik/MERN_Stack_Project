// import { v2 as cloudinary } from "cloudinary" 
// import productModel from "../models/productModel.js"

// //function for add product
// const addProduct = async(req,res)=>{

//     try {

//         const {name,description,price,category,subCategory,sizes,bestseller}=req.body

//         // const image1 =/*req.files.image1 && */ req.files.image1[0]
//         // const image2 =/*req.files.image2 && */ req.files.image2[0]
//         // const image3 =/*req.files.image3 && */ req.files.image3[0]
//         // const image4 =/*req.files.image4 && */ req.files.image4[0]

//         //check if any image file box is empty or not
//         //we can upload max 4 image as defined in the programme if any of the image 
//         //input field is empty it will be undefined
//         //image1[0] is used to get the first image from the array of images
//         const image1 = req.files.image1 && req.files.image1[0] 
//         const image2 = req.files.image2 && req.files.image2[0] 
//         const image3 = req.files.image3 && req.files.image3[0] 
//         const image4 = req.files.image4 && req.files.image4[0] 

//         // console.log(name,description,price,category,subCategory,sizes,bestseller)
//         // console.log(image1,image2,image3,image4)

//         // res.json({})

//         //check if any image file box is empty or not 
//         //we can upload max 4 image as defined in the programme if any of the image 
//         //input field is empty it will be undefined


//         //filter is used to remove the undefined image from the array
//         const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

//         //upload the images to cloudinary
//         //form the cloudinary we will get the secure url of the image and we will store the url in the database
//         //all the cloudinary upload image url will be stored in the imageUrl array
//         let imageUrl = await Promise.all(
//             images.map(async (item) => {
//                 let result = await cloudinary.uploader.upload_stream(
//                     { resource_type: "image" },
//                     (error, result) => {
//                         if (error) throw new Error(error.message);
//                         return result.secure_url;
//                     }
//                 ).end(item.buffer); // Use buffer instead of path
//                 return result;
//             })
//         );
        

//         //console.log(imageUrl)

//         const productData={
//             name,
//             description,
//             category,
//             price:Number(price),
//             subCategory,
//             //true will be a string so we have to compare it
//             bestseller: bestseller==="true" ? true : false,
//             sizes:JSON.parse(sizes),
//             //convert the json array into string and then again convert it into array
//             image:imageUrl,
//             date:Date.now()
//         }

//         console.log(productData)

//         //create a new product model object with the product data
//         const product = new productModel(productData);
//         //save the product to the database
//         await product.save()
//         res.json({success:true , message:"Product added"})

//     }catch(error){
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// //function for list product
// const listProducts=async(req,res)=>{
//     try{
//         //find all the products from the database
//         const products = await productModel.find({});
//         res.json({success:true,products})
//     }catch(error)
//     {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// //function for removing product
// const removeProduct=async(req,res)=>{

//     try{
//         //delete the product from the database with the id
//         await productModel.findByIdAndDelete(req.body.id)
//         res.json({success:true , message:"Product Removed"})
//     }catch(error)
//     {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }


// //function for single product
// const singleProduct=async(req,res)=>{

//     try
//     {
//         /*
//         const {productId} = req.body
//         req.body is an object with a productId field, and it assigns the value of req.body.productId directly to the variable productId

//         const req = { body: { productId: '12345', name: 'Test Product' } };
//         const { productId } = req.body; // productId = '12345'

//         const productId = req.body
//         This directly assigns the entire req.body object to productId

//         const req = { body: { productId: '12345', name: 'Test Product' } };
//         const productId = req.body; // productId = { productId: '12345', name: 'Test Product' }
//         */
//         const {productId} = req.body
//         const product = await productModel.findById(productId)
//         res.json({success:true,product})
//     }catch(error)
//     {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// export {addProduct,listProducts,removeProduct,singleProduct}








import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              resolve(result.secure_url);
            }
          ).end(item.buffer);
        });
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };