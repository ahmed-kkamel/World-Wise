import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
// import { useEffect, useState } from "react";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoutes from "./Pages/ProtectedRoutes";

// import HomePage from "./Pages/HomePage";
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Login from "./Pages/Login";
// import NotFound from "./Pages/NotFound";
// import AppLayout from "./Pages/AppLayout";

import CityList from "./Componants/CityList";
import CountryList from "./Componants/CountryList";
import City from "./Componants/City";
import Form from "./Componants/Form";
import SpinnerFullPage from "./Componants/SpinnerFullPage";

const HomePage = lazy(() => import("./Pages/HomePage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
const NotFound = lazy(() => import("./Pages/NotFound"));
function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<HomePage />} />
							<Route path="product" element={<Product />} />
							<Route path="pricing" element={<Pricing />} />
							<Route
								path="app"
								element={
									<ProtectedRoutes>
										<AppLayout />
									</ProtectedRoutes>
								}
							>
								<Route index element={<Navigate replace to="cities" />} />
								<Route path="cities" element={<CityList />} />
								<Route path="cities/:id" element={<City />} />
								<Route path="countries" element={<CountryList />} />
								<Route path="form" element={<Form />} />
							</Route>
							<Route path="login" element={<Login />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
