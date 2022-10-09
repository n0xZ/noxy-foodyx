export default function Landing() {
	return (
		<div className="h-screen ">
			<header className="px-8 py-6 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl xl:text-lg text-base font-bold">
					<h1>
						<NavLink to="/" className="no-underline">
							Proyix
						</NavLink>
					</h1>
					<ul className="flex flex-row items-center space-x-4 font-bold ">
						<li>
							<NavLink to="/login" className="px-8 py-4 rounded-lg no-underline">
								Iniciar sesión
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/register"
								className="px-8 py-4 rounded-lg bg-orange-400  no-underline text-light-50"
							>
								Unete ya!
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
