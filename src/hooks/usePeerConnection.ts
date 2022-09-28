import { firestore } from '~/lib/firebase'

export const usePeerConnection = () => {
	const servers = {
		iceServers: [
			{
				urls: [
					import.meta.env.VITE_RTC_STUN_CONNECTION_1!,
					import.meta.env.VITE_RTC_STUN_CONNECTION_2!,
				],
			},
		],
		iceCandidatePoolSize: 10,
	}
	const peers = new RTCPeerConnection(servers)

	const localRef = useRef<HTMLVideoElement>({} as HTMLVideoElement)
	const remoteRef = useRef<HTMLVideoElement>({} as HTMLVideoElement)

	const setupDevices = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: { height: 400, width: 400 },
			audio: true,
		})

		const remoteStream = new MediaStream()

		stream?.getTracks().forEach((track) => {
			peers.addTrack(track, stream)
		})
		peers.ontrack = (e) => {
			e.streams[0].getTracks().forEach((track) => {
				remoteStream.addTrack(track)
			})
		}
		localRef.current.srcObject = stream
		remoteRef.current.srcObject = remoteStream
	}

	useEffect(() => {
		setupDevices()
		return () => {
			peers.close()
		}
	}, [])
	return {
		remoteRef,
		localRef,
	}
}
