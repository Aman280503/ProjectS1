import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishitem: [],
    wishslider: false
};

const wishslice = createSlice({
    name: "wish",
    initialState,
    reducers: {
        toggleWishSlider(state, action) {
  state.wishslider = action.payload;
},

        addwish(state, action) {
            const freshid = action.payload.id;

            const existingid = state.wishitem.find(item => item.id === freshid);

            if (existingid) {
                existingid.quantity++;
            } else {
                state.wishitem.push({ ...action.payload, quantity: 1 });
            }
        },
        removewishitem(state, action) {
            const idToRemove = action.payload;
            state.wishitem = state.wishitem.filter(item => item.id !== idToRemove);
        },
        incrementwishitem(state, action) {
            state.wishitem = state.wishitem.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },
        decrementwishitem(state, action) {
            state.wishitem = state.wishitem.map(item => {
                if (item.id === action.payload) {
                    item.quantity--;
                }
                return item;
            }).filter(product => product.quantity > 0);
        }
    }
});

// export const { addwish, decrementwishitem, incrementwishitem, removewishitem } = wishslice.actions;
export const { addwish, decrementwishitem, incrementwishitem, removewishitem, toggleWishSlider } = wishslice.actions;

export default wishslice.reducer;
