import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from "react-dom/client"
import App from "./App";
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';
import { MantineProvider } from '@mantine/core';
const root = createRoot(document.getElementById('root'));
root.render(
    <MantineProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </MantineProvider>
    
); 