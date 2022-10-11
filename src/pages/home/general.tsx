import { useFavorites } from '~/hooks/useFavorites'
import { Recipe } from '~/types'

function FavouriteRecipe({
	recipe,
	removeFromFavourites,
}: {
	recipe: Recipe
	removeFromFavourites: (item: Recipe) => void
}) {
	const reducedTags =
		recipe.tags.length > 3 ? recipe.tags.slice(0, 3) : recipe.tags
	return (
		<aside
			className="h-2xl w-96 rounded-md bg-light-100  flex flex-col  justify-between items-center text-center p-2 space-y-2"
			key={recipe.id}
		>
			<div className="flex flex-col justify-center w-full top-0">
				<img
					src={recipe.thumbnail_url}
					className="rounded-lg aspect-video"
					alt={recipe.thumbnail_alt_text}
				/>
				<h3
					className="font-bold h-12 mb-6 mt-4 xl:text-2xl text-xl"
					data-test-id={`${recipe.name}-recipe`}
				>
					{recipe.name}
				</h3>
				<div className="flex flex-row items-center justify-center space-x-3 w-full">
					{reducedTags.map((tag) => (
						<p className="px-2 py-1 rounded-md bg-orange-300 mb-6 mt-3" key={tag.id}>
							{tag.name}
						</p>
					))}
				</div>
				<div
					className="h-full"
					dangerouslySetInnerHTML={{ __html: recipe.description }}
				></div>
			</div>
			<button
				onClick={() => removeFromFavourites(recipe)}
				className="px-8 py-4 rounded-lg bg-light-500 w-full text-orange-400 hover:bg-orange-200 duration-100 ease-in-out"
			>
				Quitar de mi lista de favoritos
			</button>
		</aside>
	)
}

function FavouriteRecipes({
	favouriteRecipes,
	removeFromFavourites,
}: {
	favouriteRecipes: Recipe[]
	removeFromFavourites: (item: Recipe) => void
}) {
	return (
		<article
			className="grid xl:grid-cols-2 grid-cols-1 place-items-center container mx-auto gap-7"
			data-test-id="favourite-recipes"
		>
			{favouriteRecipes.map((recipe) => (
				<FavouriteRecipe
					removeFromFavourites={removeFromFavourites}
					recipe={recipe}
					key={recipe.id}
				/>
			))}
		</article>
	)
}

function EmptyFavourites() {
	return (
		<article className="flex flex-col justify-center h-screen items-center">
			<p data-test-id="empty-favourites">
				Parece que no tienes recetas escogidas por el momento.
			</p>
			<p>
				Para ver la lista de recetas,{' '}
				<Link to="/home/recipes"> Haga click aquí</Link>
			</p>
		</article>
	)
}

export default function HomePage() {
	const { favourites, removeFromLocalStorage } = useFavorites()

	if (!favourites || (favourites && favourites.length === 0))
		return <EmptyFavourites />
	return (
		<>
			<h2 className="text-center text-2xl mb-12">Mis recetas favoritas</h2>
			<FavouriteRecipes
				removeFromFavourites={removeFromLocalStorage}
				favouriteRecipes={favourites}
			/>
		</>
	)
}
