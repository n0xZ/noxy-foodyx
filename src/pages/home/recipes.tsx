import { useQuery } from '@tanstack/react-query'
import { RecipeList } from '~/components/recipe/RecipeList'
import { RecipesSkeleton } from '~/components/skeleton/RecipesSkeleton'

import { getRecipes } from '~/services/recipes'

export default function RecipesPage() {
	const { data: recipes, isLoading } = useQuery(['recipes'], getRecipes)
	if (isLoading)
		return (
			<section className="container mx-auto max-w-5xl mt-20">
				<RecipesSkeleton />
			</section>
		)
	return (
		<section className="container mx-auto max-w-5xl">
			{!isLoading && recipes && (
				<>
				<h2 className='text-center xl:text-3xl text-2xl font-bold mb-5 mt-3'>Lista de recetas</h2>
					<RecipeList recipes={recipes.results} />
				</>
			)}
		</section>
	)
}
