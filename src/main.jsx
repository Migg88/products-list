import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.js';
import { PersistGate } from "redux-persist/integration/react";
import ProductThemeProvider from './themes/ThemeProvider.jsx';
import './index.scss';
import App from './App.jsx';

const env = import.meta.env;


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Auth0Provider
			domain={env.VITE_AUTH0_DOMAIN}
			clientId={env.VITE_AUTH0_CLIENT_ID}
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
