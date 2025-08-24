import React, { useState } from 'react'
import createStore from './store/slice/store';
import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';

export default function AppWrapper() {
    const [store, setStore] = useState(createStore());
    const [persistor, setPersistor] = useState(null);

    const handleLogin = (uid) => {
        const newStore = createStore(uid);
        const newPersistor = persistStore(newStore);
        setStore(newStore);
        setPersistor(newPersistor);
    };
    return persistor ? (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App onLogin={handleLogin} />
        </PersistGate>
        </Provider>
    ) : (
        <Provider store={store}>
            <App onLogin={handleLogin} />
        </Provider>
  );
}

 