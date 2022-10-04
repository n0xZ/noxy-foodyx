export default function HomePage() {
	return (
		<section className="h-full grid xl:grid-cols-2 grid-cols-1 place-items-cener">
			<article className="flex flex-col justify-center space-y-3">
				<h1>Empieza a conectarte con tus amigos de todo el país!</h1>
				<Link to="/home/room">Comenzar ya</Link>
			</article>
			<article></article>
		</section>
	)
}
