import { Suspense } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useAppDispatch } from './redux/hooks'
import { removeUser, setUser } from './redux/reducers/auth'

const Landing = lazy(() => import('./pages/landing'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const HomeOutlet = lazy(() => import('./pages/home.outlet'))
const Home = lazy(() => import('./pages/home/index'))
const Room = lazy(() => import('./pages/home/room/index'))
function App() {
	const dispatch = useAppDispatch()

	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(
				setUser({
					userInfo: {
						photoURL: user.photoURL,
						displayName: user.displayName,
						email: user.email,
					},
				})
			)
		}
		if (!user) {
			dispatch(removeUser())
		}
	})
	return (
		<Suspense fallback={<div>Cargando pagina...</div>}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="home" element={<HomeOutlet />}>
					<Route path="general" element={<Home />} />
					<Route path="room" element={<Room />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
