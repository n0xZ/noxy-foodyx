import { Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useAppDispatch } from './redux/hooks'
import { removeUser, setUser } from './redux/reducers/auth'

const Landing = lazy(() => import('./pages/landing'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const HomeOutlet = lazy(() => import('./pages/home.outlet'))
const Home = lazy(() => import('./pages/home/general'))
const Recipes = lazy(() => import('./pages/home/recipes'))
function App() {
	const dispatch = useAppDispatch()

	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(setUser({ userInfo: user }))
		} else dispatch(removeUser())
	})

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
