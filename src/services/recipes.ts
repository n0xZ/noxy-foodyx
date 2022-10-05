import { RecipeResponse } from '~/types'
import { api } from './api'
type RecipeQuery = {
	from: number
	size: number
}
export const getRecipes = async ({
	from,
	size,
}: RecipeQuery): Promise<RecipeResponse> => {
	return await api
		.get(`/recipes/list?from=${from}&size=${size}&tags=under_30_minutes`)
		.then((res) => res.data)
}
