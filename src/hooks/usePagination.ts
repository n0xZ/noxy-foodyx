import { useCallback, useEffect, useState } from 'react'
import type { Recipe } from '~/types'

export const usePagination = (
	isContentReady: boolean,
	contentToPaginate?: Recipe[]
) => {
	const [pagination, setPagination] = useState(6)
	const [contentPaginated, setContentPaginated] = useState<Recipe[] | undefined>(
		[]
	)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [clientHeight, setClientHeight] = useState(0)
	const [ContainerHeight, setContainerHeightHeight] = useState(0)
	const setupContent = (content?: Recipe[]) => {
		setContentPaginated(content)
	}
	//Se declara un useEffect que se encargará unicamente de tomar los eventos de scroll, y de actualizar los valores de los estados de Scroll y de clientHeight
	useEffect(() => {
		const scrollListener = () => {
			setClientHeight(window.innerHeight)
			setScrollPosition(window.scrollY)
		}
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', scrollListener)
		}
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('scroll', scrollListener)
			}
		}
	}, [])

	//El segundo useEffect se encargará de hacer la paginación de los heroes, basado en un condicional:
	//Si la posición del scroll, sumado al clientHeight y a 100 (un margen de altura para paginar), es mayor que el contenedor de HeroList, se realizará la correspondiente paginación
	useEffect(() => {
		if (ContainerHeight === 0) return
		if (scrollPosition + clientHeight + 100 > ContainerHeight) {
			setPagination((prev) => prev + 6)
			setContentPaginated(contentToPaginate?.slice(0, pagination))
		}
	}, [scrollPosition, clientHeight])

	// Este useCallback se encargará de memoizar  el callback de la función, que en este caso, la función actualizará la altura del contenedor.
	//Esta función se volverá a recalcular únicamente cuando 'heroesPaginated' Tienda a cambiar. (Que en este caso, lo hará en el segundo useEffect)

	useEffect(() => {
		if (isContentReady) {
			setupContent(contentToPaginate?.slice(0, 6))
		}
	}, [isContentReady])

	const heroContainer = useCallback(
		(node: HTMLElement) => {
			if (node !== null) {
				setContainerHeightHeight(node.getBoundingClientRect().height)
			}
		},
		[contentPaginated]
	)
	return { contentPaginated, heroContainer, setupContent }
}
