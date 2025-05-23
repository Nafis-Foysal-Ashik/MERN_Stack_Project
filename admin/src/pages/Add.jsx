// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios  from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const Add = ({token}) => {

//   const [image1,setImage1] = useState(false)
//   const [image2,setImage2] = useState(false)
//   const [image3,setImage3] = useState(false)
//   const [image4,setImage4] = useState(false)

//   const [name,setName] = useState("")
//   const [description,setDescription] = useState("")
//   const [price,setPrice] = useState("")
//   const [category,setCategory] = useState("Men")
//   const [subCategory,setSubCategory] = useState("Topwear")
//   const [bestseller,setBestseller] = useState(false)
//   const [sizes,setSizes] = useState([])

//   const onSubmitHandler = async (e) =>{
//     e.preventDefault();
//     try {
//       const formData = new FormData()

//       formData.append("name",name)
//       formData.append("description",description)
//       formData.append("price",price),
//       formData.append("category",category),
//       formData.append("subCategory",subCategory)
//       formData.append("bestseller",bestseller)
//       //convert the array into string
//       formData.append("sizes",JSON.stringify(sizes))

//       //this ensure there is no need to upload exactly 4 images
//       image1 && formData.append("image1",image1)
//       image2 && formData.append("image2",image2) 
//       image3 && formData.append("image3",image3)
//       image4 && formData.append("image4",image4)

//       //const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

//       const response = await axios.post(backendUrl + "/api/product/add", formData, {
//         headers: { 
//             token,
//             "Content-Type": "multipart/form-data"
//         }
//     });
    

//       if(response.data.success){
//         toast.success(response.data.message)
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setPrice('')
//       }
//       else
//       {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   /*<img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="w-20" />

//   here this ternary operator will check if the image is upload in the image file or not
//   if it uploaded then it will show the image else it will show the image of assets.upload_area

//   <p className={`${sizes.includes("S") ? "bg-rose-500" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>
//   If we click any size in the sizes section then the bg color will be pink else gray

//   */

//   /*if the image is not uploaded then it will show the upload_area image else it will show the uploaded image
  
//   <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="w-20" />
//   */
//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col ml-10 w-full items-start gap-3">
//       <div>
//         <p className="mb-2">Upload Image</p>
        
//         <div className="flex gap-2">
//           <label htmlFor="image1">
//             <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="w-20" />
//             <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
//           </label>
//           <label htmlFor="image2">
//             <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className="w-20" />
//             <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
//           </label>
//           <label htmlFor="image3">
//             <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className="w-20" />
//             <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
//           </label>
//           <label htmlFor="image4">
//             <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className="w-20" />
//             <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
//           </label>
//         </div>

//         <div className="mt-2 w-full">
//           <p className="mb-2">Product Name</p>
//           <input
//             type="text"
//             className="w-full max-w-[500px] px-3 py-2"
//             placeholder="Type Here" required
//             onChange={(e)=>setName(e.target.value)} value={name}
//           />
//         </div>

//         <div className="mt-2 w-full">
//           <p className="mb-2">Product Description</p>
//           <textarea
//             onChange={(e)=>setDescription(e.target.value)} value={description}
//             type="text"
//             className="w-full max-w-[500px] px-3 py-2"
//             placeholder="Write product Description"
//           />
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
//           <div>
//             <p className="mb-2">Product Category</p>
//             <select
//             onChange={(e)=>setCategory(e.target.value)}
//             className="w-full px-3 py-2">
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Kids">Kids</option>
//             </select>
//           </div>

//           <div>
//             <p className="mb-2">Product SubCategory</p>
//             <select 
//             onChange={(e)=>setSubCategory(e.target.value)}
//             className="w-full px-3 py-2">
//               <option value="Topwear">Topwear</option>
//               <option value="Bottomwear">Bottomwear</option>
//               <option value="Winterwear">Winterwear</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-2">
//           <p>Product Price</p> 
//           <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" className="w-full px-3 py-2 sm:w[120px]" />
//         </div>
//       </div>
//       <div>
//         <p className="mb-2">
//           Product Size
//         </p>
//         <div className="flex gap-3"> 
//           <div onClick={()=>setSizes(prev=>prev.includes("S") ? prev.filter(item=>item!=="S") : [...prev,"S"])}>
//             <p className={`${sizes.includes("S") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>
//               S
//             </p>
//           </div>

//           <div onClick={()=>setSizes(prev=>prev.includes("M") ? prev.filter(item=>item!=="M") : [...prev,"M"])}>
//             <p className={`${sizes.includes("M") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>
//               M
//             </p>
//           </div>

//           <div onClick={()=>setSizes(prev=>prev.includes("L") ? prev.filter(item=>item!=="L") : [...prev,"L"])}>
//             <p className={`${sizes.includes("L") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>
//               L
//             </p>
//           </div>

//           <div onClick={()=>setSizes(prev=>prev.includes("XL") ? prev.filter(item=>item!=="XL") : [...prev,"XL"])}>
//             <p className={`${sizes.includes("XL") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>
//               XL
//             </p>
//           </div>

//           <div onClick={()=>setSizes(prev=>prev.includes("XXL") ? prev.filter(item=>item!=="XXL") : [...prev,"XXL"])}>
//             <p className={`${sizes.includes("XXL") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>
//               XXL
//             </p>
//           </div>

//         </div>
//       </div> 

//       <div className="flex gap-2 mt-2">
//         <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id="bestseller" />
//         <label htmlFor="bestseller" className="cursor-pointer">Add to BestSeller</label>
//       </div>

//       <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>

//     </form>
//   );
// };

// export default Add;

















import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      //if the insert is successful then it will clear all the fields -> this logic is used to clear the fields in the below code
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col ml-10 w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="w-20" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className="w-20" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className="w-20" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className="w-20" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>

        <div className="mt-2 w-full">
          <p className="mb-2">Product Name</p>
          <input
            type="text"
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Type Here"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="mt-2 w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Write product Description"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product SubCategory</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>
        <div className="mt-2">
          <p>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className="w-full px-3 py-2 sm:w[120px]" />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Size</p>
        <div className="flex gap-3">
          <div onClick={() => setSizes((prev) => (prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"]))}>
            <p className={`${sizes.includes("S") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes((prev) => (prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"]))}>
            <p className={`${sizes.includes("M") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes((prev) => (prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"]))}>
            <p className={`${sizes.includes("L") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes((prev) => (prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"]))}>
            <p className={`${sizes.includes("XL") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes((prev) => (prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"]))}>
            <p className={`${sizes.includes("XXL") ? "bg-rose-600" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label htmlFor="bestseller" className="cursor-pointer">Add to BestSeller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
    </form>
  );
};

export default Add;