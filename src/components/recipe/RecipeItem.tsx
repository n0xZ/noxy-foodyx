import { FC } from 'react'
import { Recipe } from '~/types'

type Props = {
	recipe: Recipe
}
export default function RecipeItem({ recipe }: Props) {
	return (
		<aside className="flex flex-col justify-center space-y-4">
			<p>{recipe.name}</p>
		</aside>
	)
}
