import type { ReactNode } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '~/lib/firebase'
export default function PrivateLayout({ children }: { children: ReactNode }) {
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
					<ul className="xl:flex flex-row items-center space-x-4 hidden">
						<li>
							<NavLink
								to="/home/room"
								className="px-4 py-4 rounded-lg  bg-sky-200 no-underline"
							>
								Crear nueva sala
							</NavLink>
						</li>
						<li>
							<button type="button" className="px-8 py-4 rounded-lg  bg-sky-400" onClick={SignOut}>
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
