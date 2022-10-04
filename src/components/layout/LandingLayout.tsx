import type { ReactNode } from 'react'
import { useAppSelector } from '~/redux/hooks'

export default function LandingLayout({ children }: { children: ReactNode }) {
  const { isLoading, userInfo } = useAppSelector(state => state.auth)
  return (
		<div className='h-screen bg-sky-100'>
			<header className="px-8 py-6 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<h1>
						<NavLink to="/">Proyix</NavLink>
					</h1>
					<ul className="flex flex-row items-center space-x-4">
						{isLoading || (!isLoading && !userInfo)
						  ? (
							<>
								<li>
									<NavLink to="/login" className="px-8 py-4 rounded-lg bg-sky-400">
										Iniciar sesión
									</NavLink>
								</li>
								<li>
									<NavLink to="/register">Unete ya!</NavLink>
								</li>
							</>
						    )
						  : (
							<>
								<li>
									<NavLink to="/home" className="px-8 py-4 rounded-lg bg-sky-400">
										Home
									</NavLink>
								</li>
							</>
						    )}
					</ul>
				</nav>
			</header>
			<main className="h-full">{children}</main>
		</div>
  )
}
