import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { useFavorites } from '~/hooks/useFavorites'
import { Recipe } from '~/types'

type Props = {
	recipe: Recipe
}
type ViewRecipeProps = {
	isOpen: boolean
	closeModal: () => void
	recipe: Recipe
}
function ViewRecipeContent({ isOpen, recipe, closeModal }: ViewRecipeProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl  bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg  font-bold leading-6 text-gray-900 mb-2"
								>
									{recipe.name}
								</Dialog.Title>
								<h4 className="font-bold text-lg">Instrucciones</h4>
								{recipe.instructions ? (
									<ul className="flex flex-col justify-center items-center space-y-3 max-w-md mx-auto">
										{recipe.instructions.map((inst) => (
											<li className='list-disc container mx-auto px-3 mt-4' key={inst.id}>{inst.display_text}</li>
										))}
									</ul>
								):<p>No disponible 😞</p>}
								<button
									type="button"
									className="inline-flex mt-4 justify-center rounded-md border border-transparent bg-orange-300 px-4 py-2 text-base	 font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
									onClick={closeModal}
								>
									Cerrar detalles
								</button>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export function RecipeItem({ recipe }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}
	const reducedTags =
		recipe.tags.length > 3 ? recipe.tags.slice(0, 3) : recipe.tags
	const { addToLocalStorage } = useFavorites()
	return (
		<aside className="h-2xl w-96 rounded-md bg-light-100  flex flex-col  justify-between items-center text-center p-2 space-y-2">
			<div className="flex flex-col justify-center w-full top-0">
				<img
					src={recipe.thumbnail_url}
					className="rounded-lg aspect-video"
					alt={recipe.thumbnail_alt_text}
				/>
				<h3 className="font-bold h-12 mb-6 mt-4 xl:text-2xl text-xl">
					{recipe.name}
				</h3>
				<div className="flex flex-row items-center justify-center space-x-3 w-full">
					{reducedTags.map((tag) => (
						<p className="px-2 py-1 rounded-md bg-orange-300 mb-6 mt-3" key={tag.id}>
							{tag.name}
						</p>
					))}
				</div>
				<div
					className="h-full"
					dangerouslySetInnerHTML={{ __html: recipe.description }}
				></div>
			</div>
			<div className="w-full flex flex-row items-center justify-between space-x-3">
				<button
					className="px-8 py-4 rounded-lg bg-light-500 w-full text-orange-400 hover:bg-orange-200 duration-100 ease-in-out"
					onClick={() => openModal()}
				>
					Ver detalles de receta
				</button>
				<button
					onClick={() => addToLocalStorage(recipe)}
					className="px-8 py-4 rounded-lg bg-light-500 w-full text-orange-400 hover:bg-orange-200 duration-100 ease-in-out"
				>
					❤
				</button>
				<ViewRecipeContent
					recipe={recipe}
					closeModal={closeModal}
					isOpen={isOpen}
				/>
			</div>
		</aside>
	)
}
