import { createContext, useState , useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { use } from "react";

// export indicated we can access it from any other components also
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        // creates a shallow copy of the current cartItems object
        const cartData = { ...cartItems };

        // specific size of that item (cartData[itemId][size]) exists
        // (cartData[itemId][size] || 0) + 1 => If the size exists, it increments the quantity by 1. If the size doesn't exist (undefined), it initializes it to 0 and then adds 1.
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            // If the item with the given itemId doesn't exist in the cart, it initializes it with an object where the key is the size and the value is 1
            cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);

        if(token)
        {
            try{
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }

    };



    // const getCartCount = () => {
    //     let totalCount = 0;
    //     for (const items of Object.values(cartItems)) {
    //         for (const count of Object.values(items)) {
    //             totalCount += count;
    //         }
    //     }
    //     return totalCount;
    // };

    const getCartCount =() =>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                } catch(error){

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token)
        {
            try
            {
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
            }catch(error)
            {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0 ;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }catch(error){

                }
            }
        }
        return totalAmount;
    }


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if(response.data.success)
            {
                setProducts(response.data.products)
            }
            else
            {
                toast.error(response.data.message)
            }
        }catch (error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try{
            const response = await axios.post(backendUrl + '/api/cart/get',{}, {headers:{token}})
            if(response.data.success)
            {
                setCartItems(response.data.cartData)
            }
        }catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    },[])

    useEffect(() => {
        if(!token &&localStorage.getItem('token'))
        {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    //within this value , we can use this in any components using Context api
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,setToken,token,setCartItems    
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
