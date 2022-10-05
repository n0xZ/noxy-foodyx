import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '~/services/recipes'

export default function HomePage() {
	const { data: recipes, isLoading } = useQuery(['recipes'], () =>
		getRecipes({ from: 0, size: 20 })
	)
	return (
		<section className="h-full grid xl:grid-cols-2 grid-cols-1 place-items-cener">
			{!isLoading && JSON.stringify(recipes?.results)}
		</section>
	)
}
