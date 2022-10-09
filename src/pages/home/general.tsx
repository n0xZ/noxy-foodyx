import { useFavorites } from '~/hooks/useFavorites'

function EmptyFavourites() {
	return (
		<article className="flex flex-col justify-center h-screen">
			<p>Parece que no tienes recetas escogidas por el momento.</p>
			<p>
				Para ver la lista de recetas,{' '}
				<Link to="/home/recipes"> Haga click aquí</Link>
			</p>
		</article>
	)
}

export default function HomePage() {
	const { favourites } = useFavorites()
	console.log(favourites)
	if (!favourites) return <EmptyFavourites />
	return (
		<section className="h-full grid xl:grid-cols-2 grid-cols-1 place-items-cener"></section>
	)
}
