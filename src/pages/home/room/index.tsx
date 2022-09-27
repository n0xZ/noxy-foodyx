import { usePeerConnection } from '~/hooks/usePeerConnection'

export default function Room() {
	const { localStream, cameraRef } = usePeerConnection()
	return (
		<div>
			<div>bienvenido a la sala!</div>
			<video autoPlay muted playsInline></video>
		</div>
	)
}
