import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import type { ReactNode } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '~/lib/firebase'
import { removeUser, setUser } from '~/redux/reducers/auth'
function PrivateLayout({ children }: { children: ReactNode }) {
	const navigate = useNavigate()
	const SignOut = () => {
		navigate('/')
		signOut(auth)
	}
	return (
		<>
			<header className="px-8 py-4 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<h1>
						<NavLink to="/home/general">Proyix</NavLink>
					</h1>
					<ul className="xl:flex flex-row items-center space-x-4 hidden ">
						<li>
							<NavLink
								to="/home/recipes"
								className="px-4 py-4 rounded-lg   no-underline text-dark-50"
							>
								Buscar recetas
							</NavLink>
						</li>
						<li>
							<button
								type="button"
								className="px-8 py-4 rounded-lg  bg-orange-400 text-dark-50"
								onClick={SignOut}
							>
								Cerrar sesión
							</button>
						</li>
					</ul>
				</nav>
			</header>
			<main className="h-screen">{children}</main>
		</>
	)
}

export default function HomeOutlet() {
	const { userInfo, isLoading } = useAppSelector((state) => state.auth)

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
		if (!user) dispatch(removeUser())
	})

	if (!isLoading && !userInfo) return <Navigate to="/login" replace={true} />
	return (
		<PrivateLayout>
			<Outlet />
		</PrivateLayout>
	)
}
