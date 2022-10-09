import { useQuery } from '@tanstack/react-query'
import { RecipeList } from '~/components/recipe/RecipeList'
import { getRecipes } from '~/services/recipes'

export default function RecipesPage() {
	const { data: recipes, isLoading } = useQuery(['recipes'], getRecipes)
	return (
		<section className="container mx-auto max-w-5xl">
			{!isLoading && recipes && <RecipeList recipes={recipes.results} />}
		</section>
	)
}
