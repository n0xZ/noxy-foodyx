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

function App() {
	const dispatch = useAppDispatch()
	const location = useLocation()
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
		if (!user) dispatch(removeUser())
	})
	return (
		<AnimatePresence mode="wait" key={location.pathname}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="home" element={<HomeOutlet />}>
					<Route
						path="general"
						element={
							<Suspense fallback={<div>Loading recipes...</div>}>
								<Home />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</AnimatePresence>
	)
}

export default App
