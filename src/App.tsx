import { Suspense } from 'react'

import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useAppDispatch } from './redux/hooks'
import { removeUser, setUser } from './redux/reducers/auth'
const Landing = lazy(() => import('./pages/landing'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const Home = lazy(() => import('./pages/home'))
const Layout = () => {
	return (
		<>
			<header className="px-8 py-4 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<h1>
						<NavLink to="/">Proyix</NavLink>
					</h1>
					<ul className="flex flex-row items-center space-x-4">
						<li>
							<NavLink to="/login">Iniciar sesión</NavLink>
						</li>
						<li>
							<NavLink to="/register">Unete ya!</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main className="h-screen">
				<Outlet />
			</main>
		</>
	)
}
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="" element={<Layout />}>
			<Route path="/" element={<Landing />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="home" element={<Home />} />
		</Route>
	)
)
function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(setUser({ user }))
		}
		if (!user) {
			dispatch(removeUser())
			navigate('/')
		}
	})
	return (
		<Suspense fallback={<div>Cargando pagina...</div>}>
			<RouterProvider
				router={router}
				fallbackElement={<div>Cargando contenido de esta ruta....</div>}
			/>
		</Suspense>
	)
}

export default App
