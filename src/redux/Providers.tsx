"use client";
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}