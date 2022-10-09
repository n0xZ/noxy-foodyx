import { Recipe } from '~/types'

const getActualFavourites = () => {
	const actualFavourites = JSON.parse(
		String(localStorage.getItem('selected-heroes'))
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

	const addHeroToLocalStorage = (char: Recipe) => {
		if (localStorage.getItem('selected-heroes') === null) {
			const newFavourites = [] as Recipe[]

			newFavourites.push(char)
			localStorage.setItem('selected-heroes', JSON.stringify(newFavourites))
			setFavourites(newFavourites)
		} else {
			const existingFavourites = JSON.parse(
				String(localStorage.getItem('selected-heroes'))
			) as Recipe[]

			existingFavourites.push(char)

			localStorage.setItem('selected-heroes', JSON.stringify(existingFavourites))
			setFavourites(existingFavourites)
		}
	}
	const removeHeroFromLocalStorage = (char: Recipe) => {
		const existingFavourites = JSON.parse(
			String(localStorage.getItem('selected-heroes'))
		) as Recipe[]
		const filteredFavourites = existingFavourites.filter(
			(fav) => char.id !== fav.id
		)
		localStorage.setItem('selected-heroes', JSON.stringify(filteredFavourites))

		setFavourites(filteredFavourites)
	}
	return {
		favourites,
		addHeroToLocalStorage,
		removeHeroFromLocalStorage,
	}
}
