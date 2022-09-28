import { MutableRefObject } from 'react'
type Props = {
	cameraRef: MutableRefObject<HTMLVideoElement>
}

export default function Camera({ cameraRef }: Props) {
	return (
		<article>
			<video
				className="rounded-xl"
				width={400}
				height={400}
				ref={cameraRef}
				autoPlay
				playsInline
				muted
			/>
		</article>
	)
}
