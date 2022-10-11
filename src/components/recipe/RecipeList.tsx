import { Recipe } from '~/types'
import { RecipeItem } from './RecipeItem'
type Props = {
	recipes?: Recipe[]
	container: (node: HTMLElement) => void
}
export function RecipeList({ recipes, container }: Props) {
	return (
		<article
			ref={container}
			className="grid xl:grid-cols-2 grid-cols-1 place-items-center container mx-auto gap-7"
		>
			{recipes?.map((recipe) => (
				<RecipeItem recipe={recipe} key={recipe.id} />
			))}
		</article>
	)
}
