import { Recipe } from '~/types'

const getActualFavourites = () => {
	const actualFavourites = JSON.parse(
		String(localStorage.getItem('favouritesRecipes'))
	) as Recipe[]
	return actualFavourites
}

export const useFavorites = () => {
	const [favourites, setFavourites] = useState<Recipe[] | null>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setFavourites(getActualFavourites())
		}
	}, [])

	const addToLocalStorage = (item: Recipe) => {
		if (localStorage.getItem('favouritesRecipes') === null) {
			const newFavourites = [] as Recipe[]

			newFavourites.push(item)
			localStorage.setItem('favouritesRecipes', JSON.stringify(newFavourites))
			setFavourites(newFavourites)
		} else {
			const existingFavourites = JSON.parse(
				String(localStorage.getItem('favouritesRecipes'))
			) as Recipe[]

			existingFavourites.push(item)

			localStorage.setItem('favouritesRecipes', JSON.stringify(existingFavourites))
			setFavourites(existingFavourites)
		}
	}
	const removeFromLocalStorage = (item: Recipe) => {
		const existingFavourites = JSON.parse(
			String(localStorage.getItem('favouritesRecipes'))
		) as Recipe[]
		const filteredFavourites = existingFavourites.filter(
			(fav) => item.id !== fav.id
		)
		localStorage.setItem('favouritesRecipes', JSON.stringify(filteredFavourites))

		setFavourites(filteredFavourites)
	}
	return {
		favourites,
		addToLocalStorage,
		removeFromLocalStorage,
	}
}
