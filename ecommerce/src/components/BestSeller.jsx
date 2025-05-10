import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Seller"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
          aliquid vitae est maxime dolore voluptates eius accusantium non et.
          Natus sit dignissimos blanditiis earum neque aliquid numquam ipsum,
          consequatur nemo. Architecto, inventore.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestSeller.map((item,index) => (
        // <div key={item._id} onClick={() => handleProductClick(item._id)}>
            <ProductItem
                key={index}
                id={item._id}  // Ensure consistent use of the ID field
                name={item.name}
                image={item.image}
                price={item.price}
            />
        // </div>
        ))}
</div>

    </div>
  );
};

export default BestSeller;
