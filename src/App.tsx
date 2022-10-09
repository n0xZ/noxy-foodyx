import { Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'

const Landing = lazy(() => import('./pages/landing'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const HomeOutlet = lazy(() => import('./pages/home.outlet'))
const Home = lazy(() => import('./pages/home/general'))
const Recipes = lazy(() => import('./pages/home/recipes'))
function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route
				path="/login"
				element={
					<Suspense fallback={<div>Cargando...</div>}>
						<Login />
					</Suspense>
				}
			/>
			<Route
				path="/register"
				element={
					<Suspense fallback={<div>Cargando página...</div>}>
						<Register />
					</Suspense>
				}
			/>
			<Route
				path="/home"
				element={
					<Suspense fallback={<div>Cargando...</div>}>
						<HomeOutlet />
					</Suspense>
				}
			>
				<Route path="general" element={<Home />} />
				<Route path="recipes" element={<Recipes />} />
			</Route>
		</Routes>
	)
}

export default App
