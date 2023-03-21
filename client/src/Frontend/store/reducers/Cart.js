import { createSlice } from "@reduxjs/toolkit";

const getCartData = () => {
  
const data = JSON.parse(localStorage.getItem("cart"))
  if(data){
    return data;
  }else{
    return [];
  }
}

const initialState = {
    cart : getCartData() ,
    total_item : 0 ,
    total_price : 0,
    shipping_fee : 40,
}

const CartSlice = createSlice({
    name : "cart",
    initialState ,
    reducers : {
        addToCart : (state , action) => {

            const {_id , price} = action.payload;

      let existingProduct = state.cart.findIndex((item) => item.product._id === _id)

    
      if(existingProduct >= 0){
                state.cart[existingProduct].quantity += 1;
      }else{
        const cartProduct = {
            id : _id,
            amount : price ,
            max: action.payload.quantity,
            quantity : 1 ,
            product : action.payload,

        }
         state.cart.push(cartProduct)
      }   
        },

        removeToCart : (state , action) => {
          state.cart = state.cart.filter((item) => item.id !== action.payload)
        } ,

        increaseProduct : (state , {payload} ) => {
          const indexofItem = state.cart.findIndex((item) => item.id === payload)
          const findItem = state.cart.find((item) => item.id === payload)
          if(findItem.quantity !== findItem.max){
            state.cart[indexofItem].quantity += 1;
          }
        } ,
        decreaseProduct : (state , {payload} ) => {
          const indexofItem = state.cart.findIndex((item) => item.id === payload);
         const findItem = state.cart.find((item) => item.id === payload);
      
         if(findItem.quantity === 1){
        state.cart = state.cart.filter((item) => item.id !== payload)
        }else{
           state.cart[indexofItem].quantity -= 1;
         }
         
        }
    }

})


export default CartSlice.reducer

export const {
    addToCart,
    removeToCart ,increaseProduct ,decreaseProduct
} = CartSlice.actions