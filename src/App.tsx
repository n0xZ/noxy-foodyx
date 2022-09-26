import { Suspense } from 'react'
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
} from 'react-router-dom'

const Landing = lazy(() => import('./pages/landing'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
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
		<Route path="" element={<Layout />} >
			<Route path="/" element={<Landing />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
		</Route>
	)
)
function App() {
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
