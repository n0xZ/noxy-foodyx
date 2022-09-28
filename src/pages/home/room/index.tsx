import Camera from '~/components/camera/Camera'
import { usePeerConnection } from '~/hooks/usePeerConnection'

export default function Room() {
	const { localRef } = usePeerConnection()
	return (
		<div>
			<div>bienvenido a la sala!</div>
			<Camera cameraRef={localRef} />
		</div>
	)
}
