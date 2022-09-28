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

	const localRef = useRef<HTMLVideoElement>({} as HTMLVideoElement)
	const remoteRef = useRef<HTMLVideoElement>({} as HTMLVideoElement)

	const setupDevices = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: { height: 400, width: 400 },
			audio: true,
		})

		const remoteStream = new MediaStream()

		localStream?.getTracks().forEach((track) => {
			peers.addTrack(track, localStream)
		})
		peers.ontrack = (e) => {
			e.streams[0].getTracks().forEach((track) => {
				remoteStream.addTrack(track)
			})
		}
		localRef.current.srcObject = localStream
		remoteRef.current.srcObject = remoteStream
	}

	useEffect(() => {
		setupDevices()
		return () => {
			peers.close()
		}
	}, [500])
	return {
		localStream,
		remoteRef,
		localRef,
	}
}
