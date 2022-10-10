import { Recipe } from '~/types'
import { RecipeItem } from './RecipeItem'
type Props = {
	recipes: Recipe[]
}
export function RecipeList({ recipes }: Props) {
	return (
		<article className="grid xl:grid-cols-2 grid-cols-1 place-items-center container mx-auto gap-7">
			{recipes.map((recipe) => (
				<RecipeItem recipe={recipe} key={recipe.id} />
			))}
		</article>
	)
}
