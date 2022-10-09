import { FC } from 'react'
import { Recipe } from '~/types'

type Props = {
	recipe: Recipe
}
export function RecipeItem({ recipe }: Props) {
	return (
		<aside className="h-24 w-72 rounded-md border-2  flex flex-row  justify-center items-center text-center p-2 space-x-2">
			<img
				src={recipe.thumbnail_url}
				className="rounded-full h-12"
				alt={recipe.thumbnail_alt_text}
			/>
			<p>{recipe.name}</p>
		</aside>
	)
}
