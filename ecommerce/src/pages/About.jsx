import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Exclusive Designs: Discover a range of clothing
            that’s as unique as you are. From everyday essentials to statement
            pieces, our designs are crafted to elevate your wardrobe.<br></br> Premium
            Quality: We source the finest materials to ensure that every piece
            not only looks great but feels great too. Expect durability,
            comfort, and style with every purchase.<br></br> Affordable Luxury: Look and
            feel your best without breaking the bank. We believe in offering
            high-quality fashion at prices that are accessible to everyone.<br></br>
            Sustainable Fashion: We’re committed to doing our part for the
            planet. Our eco-friendly fabrics and sustainable practices mean you
            can shop with a clear conscience.<br></br> Customer-Centric Service: Your
            satisfaction is our priority. From easy navigation and secure
            checkout to fast shipping and hassle-free returns, we’re here to
            make your shopping experience seamless and enjoyablel.
          </p>{" "}
          <b className="text-gray-800">Our Mission</b>
          <p>
            Fashion is more than just clothing – it’s a way of life. Join our
            community on social media to stay up-to-date with the latest trends,
            styling tips, and exclusive offers. Share your style with us using
            #[YourHashtag] and be featured on our page.
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default About;
