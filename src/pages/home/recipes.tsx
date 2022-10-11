import { useQuery } from '@tanstack/react-query'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import toast from 'react-hot-toast'
import { RecipeList } from '~/components/recipe/RecipeList'
import { RecipesSkeleton } from '~/components/skeleton/RecipesSkeleton'

import { getRecipes } from '~/services/recipes'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<section className="container mx-auto max-w-5xl mt-20 text-center ">
			<h2>Oops!😥 </h2>
			<p>Ha ocurrido un error. Por favor, inténtelo más tarde.</p>
			<button onClick={() => resetErrorBoundary()}>Actualizar página</button>
			<p>Error:{error.message}</p>
		</section>
	)
}

export default function RecipesPage() {
	const {
		data: recipes,
		isLoading,
		isError,
	} = useQuery(['recipes'], getRecipes, {
		onError(err: Error) {
			toast.error(`Ups! Ha ocurrido un error: ${err.message}`)
		},
	})
	if (isLoading && !isError)
		return (
			<section className="container mx-auto max-w-5xl mt-20">
				<RecipesSkeleton />
			</section>
		)
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => location.reload()}
		>
			<section className="container mx-auto max-w-5xl mt-20">
				{!isLoading && recipes && (
					<>
						<h2 className="text-center xl:text-3xl text-2xl font-bold mb-5 mt-3">
							Lista de recetas
						</h2>
						<RecipeList recipes={recipes.results} />
					</>
				)}
			</section>
		</ErrorBoundary>
	)
}
