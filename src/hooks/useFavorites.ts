import { Recipe } from '~/types'
import { toast } from 'react-hot-toast'
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
			toast.success('Receta agregada a favoritos!')
		} else {
			const existingFavourites = JSON.parse(
				String(localStorage.getItem('favouritesRecipes'))
			) as Recipe[]
			if (!existingFavourites.some((el) => el.id === item.id)) {
				existingFavourites.push(item)

				localStorage.setItem(
					'favouritesRecipes',
					JSON.stringify(existingFavourites)
				)
				setFavourites(existingFavourites)
				toast.success('Nueva receta agregada a favoritos!')
			} else
				toast.error('No se puede agregar una receta ya existente en favoritos')
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
