import { LegacyRef } from 'react'

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
	const [localStream, setLocalStream] = useState<MediaStream | null>(null)
	const cameraRef = useRef<LegacyRef<HTMLVideoElement>>(null)

	const setupDevices = async () => {
		await navigator.mediaDevices
			.getUserMedia({ video: { height: 400, width: 400 }, audio: true })
			.then((mediaDevices) => {
				setLocalStream(mediaDevices)
			})
		console.log(localStream?.getAudioTracks())
	}

	useEffect(() => {
		setupDevices()
		return () => {
			peers.close()
		}
	}, [500])
	return {
		localStream,

		cameraRef,
	}
}
