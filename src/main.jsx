import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.js';
import { PersistGate } from "redux-persist/integration/react";
import ProductThemeProvider from './themes/ThemeProvider.jsx';
import './index.scss';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Auth0Provider
			domain="dev-lny054pdz5b35njs.us.auth0.com"
			clientId="62N1ClbE2OS02mgaibc2FL58bIgIfvwR"
			authorizationParams={{
				redirect_uri: window.location.origin
			}}
		>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor} >
					<ProductThemeProvider>
						<App />
					</ProductThemeProvider>
				</PersistGate>
			</Provider>
		</Auth0Provider>
	</StrictMode>,
)
