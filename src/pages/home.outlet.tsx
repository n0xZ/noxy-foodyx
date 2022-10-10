import { useAppDispatch } from '~/redux/hooks'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '~/lib/firebase'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'

function NavMenu() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const SignOut = () => {
		navigate('/')
		signOut(auth)
	}
	return (
		<Menu
			as="div"
			className="relative xl:hidden lg:hidden inline-block text-left"
		>
			<div>
				<Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-zinc-900 bg-opacity-60 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					<Icon
						icon="uil:align-justify"
						className=" h-5 w-5 text-rose-200 hover:text-rose-100"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							<NavLink
								to="/home/recipes"
								className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900"
							>
								Buscar recetas
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<button
								className="bg-orange-600 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
								onClick={() => SignOut()}
							>
								Cerrar sesión
							</button>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default function HomeOutlet() {
	const navigate = useNavigate()

	const SignOut = () => {
		navigate('/')
		signOut(auth)
	}
	onAuthStateChanged(auth, (user) => {
		if (!user) {
			navigate('/login')
		}
	})

	return (
		<>
			<header className="px-8 py-4 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<h1>
						<NavLink to="/home/general">Proyix</NavLink>
					</h1>
					<ul className="xl:flex flex-row items-center space-x-4 hidden ">
						<li>
							<NavLink
								to="/home/recipes"
								className="px-4 py-4 rounded-lg   no-underline text-dark-50"
							>
								Buscar recetas
							</NavLink>
						</li>
						<li>
							<button
								type="button"
								className="px-8 py-4 rounded-lg  bg-orange-400 text-dark-50"
								onClick={() => SignOut()}
							>
								Cerrar sesión
							</button>
						</li>
					</ul>
					<NavMenu />
				</nav>
			</header>
			<main className="h-screen">
				<Outlet />
			</main>
		</>
	)
}
