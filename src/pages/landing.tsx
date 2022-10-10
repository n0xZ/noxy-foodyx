import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import LandingAsset from '/landing-image.svg'
function NavMenu() {
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
								to="/login"
								className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900"
							>
								Iniciar sesión
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink
								to="/register"
								className="bg-orange-600 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
							>
								Unete ya!
							</NavLink>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
export default function Landing() {
	return (
		<div className="h-screen  bg-light-500">
			<header className="px-8 py-6 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl xl:text-lg text-base font-bold">
					<h1>
						<NavLink to="/" className="no-underline">
							Proyix
						</NavLink>
					</h1>
					<ul className="xl:flex hidden flex-row items-center space-x-4 font-bold ">
						<li>
							<NavLink to="/login" className="px-8 py-4 rounded-lg no-underline">
								Iniciar sesión
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/register"
								className="px-8 py-4 rounded-lg bg-orange-400  no-underline text-light-50"
							>
								Unete ya!
							</NavLink>
						</li>
					</ul>
					<NavMenu />
				</nav>
			</header>
			<main className="h-full bg-light-500">
				<section className="h-full flex xl:flex-row flex-col-reverse justify-center items-center  text-center container mx-auto">
					<article className="flex flex-col justify-center items-center space-y-3  ">
						<img
							src={LandingAsset}
							alt="Ilustración de la landing, que representa la experimentación de nuevas recetas."
							className="rounded-lg"
							height={580}
							width={580}
						/>
						<Link
							to="/login"
							className="px-8 py-4 bg-orange-400 font-bold text-light-50 rounded-lg no-underline "
						>
							Comienza ya
						</Link>
					</article>
					<article className="flex flex-col justify-center items-center space-y-3 xl:text-lg max-w-3xl">
						<h1 className="font-bold xl:text-2xl text-xl">
							Encuentra recetas que te salvarán de tus mediodías!
						</h1>
						<p>
							En Foodyx, podrás encontrar distíntas recetas de Tasty, que te serán de
							gran interés cuando no se te ocurra qu cocinar!
						</p>
					</article>
				</section>
			</main>
			<footer className='py-8 px-4 flex flex-row items-center justify-center bg-light-500'>
				<p>Made with 🖤 by n0xZ</p>
			</footer>
		</div>
	)
}
