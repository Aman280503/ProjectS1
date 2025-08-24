import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartitem: [],
    cartslider: false
}

const cartslice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addtocart(state, action) {
            const freshid = action.payload.id;
            const existingid = state.cartitem.find(item => item.id === freshid)

            if (existingid) {
                existingid.quantity++;
            } else {
                state.cartitem.push(action.payload)
            }
        },

        removeProduct(state, action) {
            state.cartitem = state.cartitem.filter(item => item.id !== action.payload);
        },

        increaseQuantity(state, action) {
            state.cartitem = state.cartitem.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            })
        },

        decreaseQuantity(state, action) {
            state.cartitem = state.cartitem.map(item => {
                if (item.id === action.payload) {
                    item.quantity--;
                }
                return item;
            }).filter((product) => product.quantity > 0)
        },

        carttoogle(state, action) {
            state.cartslider = action.payload;
        },

        clearCart(state, action) {
            state.cartitem = [];
            localStorage.removeItem("cart");
        },
        
    }
})

export const { addtocart, carttoogle, decreaseQuantity, increaseQuantity, removeProduct, clearCart,setCart  } = cartslice.actions;

export default cartslice.reducer;
