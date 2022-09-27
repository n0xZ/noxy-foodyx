import LandingLayout from '~/components/layout/LandingLayout'

export default function Landing() {
	return (
		<LandingLayout>
			<section className="h-full grid grid-cols-2">
				<article className="flex flex-col justify-center space-y-3">
					<p>Conéctate con tus amigos de todas las parte del país!</p>
				</article>
				<article></article>
			</section>
		</LandingLayout>
	)
}
