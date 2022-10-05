import { Recipe } from '~/types'
import RecipeItem from './RecipeItem'
type Props = {
	recipes: Recipe[]
}
export default function RecipeList({ recipes }: Props) {
	return (
		<article className="grid grid-cols-2 place-items-center container mx-auto">
			{recipes.map((recipe) => (
				<RecipeItem recipe={recipe} />
			))}
		</article>
	)
}
