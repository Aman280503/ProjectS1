import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart"; 
import wishReducer from "./wishlist"; 
import authReducer from './auth';
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage"; // localStorage

// Step 1: Combine reducers
const createStore=(uid)=>{
const rootReducer = combineReducers({
    cart: cartReducer,
    wish: wishReducer,
    auth: authReducer


});
if(!uid){
    return configureStore({reducer:rootReducer});
}
const persistConfig={
    key:`${uid}`,
    storage,
    Wishlist:["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
return configureStore({ reducer: persistedReducer });
}


// Step 2: Create persist configuration
// Step 3: Wrap rootReducer with persistReducer

// Step 4: Create store
// Step 5: Create persistor

// Step 6: Export store
export default createStore;
