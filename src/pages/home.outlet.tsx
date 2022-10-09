import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import type { ReactNode } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '~/lib/firebase'
import { removeUser, setUser } from '~/redux/reducers/auth'

export default function HomeOutlet() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const SignOut = () => {
		navigate('/')
		signOut(auth)
	}
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(setUser({ userInfo: user }))
		} else dispatch(removeUser())
	})
	console.log('Redireccionei')
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
			<main className="h-screen">
				<Outlet />
			</main>
		</>
	)
}
