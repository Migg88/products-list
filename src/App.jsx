import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import LoginView from './views/login';
import Products from './views/Products';
import Product from './views/Product';
import Form from './views/Form';
import ProtectedRoute from './components/ProtectedRoute';
import ProductThemeProvider from './themes/ThemeProvider';
import Wrapper from './layouts/Wrapper';
import './App.scss'

function App() {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	return (
		<ProductThemeProvider>
			<Router>
				<Wrapper>
					<Routes>
						<Route path="/" element={isAuthenticated ? <Navigate to="/products" /> : <LoginView />} />
						<Route
							path="/products"
							element={
								<ProtectedRoute>
									<Products />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/products/:id"
							element={
								<ProtectedRoute>
									<Product />
								</ProtectedRoute>
							}
						/>
						<Route 
							path="/form"
							element={
								<ProtectedRoute>
									<Form />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Wrapper>
			</Router>
		</ProductThemeProvider>
	)
}

export default App
