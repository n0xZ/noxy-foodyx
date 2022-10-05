

export default function Landing() {
	return (
		<div className="h-screen bg-sky-100">
			<header className="px-8 py-6 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<h1>
						<NavLink to="/">Proyix</NavLink>
					</h1>
					<ul className="flex flex-row items-center space-x-4">
						<li>
							<NavLink to="/login" className="px-8 py-4 rounded-lg bg-sky-400">
								Iniciar sesión
							</NavLink>
						</li>
						<li>
							<NavLink to="/register">Unete ya!</NavLink>
						</li>

						<li>
							<NavLink to="/home" className="px-8 py-4 rounded-lg bg-sky-400">
								Home
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main className="h-full">
				<section className="h-full grid grid-cols-2">
					<article className="flex flex-col justify-center space-y-3">
						<p>!</p>
					</article>
					<article></article>
				</section>
			</main>
		</div>
	)
}
