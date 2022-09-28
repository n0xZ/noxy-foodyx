import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { firestore } from '~/lib/firebase'
type ConnectionTypes = 'CREATE' | 'JOIN' | 'HOME'

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
export const usePeerConnection = () => {
	const peers = new RTCPeerConnection(servers)
	const [connectionType, setConnectionType] = useState<ConnectionTypes>()
	const localRef = useRef<HTMLVideoElement>({} as HTMLVideoElement)
	const remoteRef = useRef<HTMLVideoElement>({} as HTMLVideoElement)

	const setupDevices = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: { height: 400, width: 400 },
			audio: true,
		})

		const remoteStream = new MediaStream()

		stream.getTracks().forEach((track) => {
			peers.addTrack(track, stream)
		})
		peers.ontrack = (e) => {
			e.streams[0].getTracks().forEach((track) => {
				remoteStream.addTrack(track)
			})
		}
		localRef.current.srcObject = stream
		remoteRef.current.srcObject = remoteStream

		const offerDescription = await peers.createOffer()
		peers.setLocalDescription(offerDescription)

		const offer: RTCLocalSessionDescriptionInit = {
			sdp: offerDescription.sdp,
			type: offerDescription.type,
		}
		const callsDocument = doc(firestore, 'calls')
		await setDoc(callsDocument, offer)

		onSnapshot(callsDocument, (snapshot) => {
			const data = snapshot.data()
			console.log(data)
			if (!peers.currentRemoteDescription && data?.answer) {
				const answerDescription = new RTCSessionDescription(data.answer)
				peers.setRemoteDescription(answerDescription)
			}
		})
		peers.onconnectionstatechange = (e) => {
			if (peers.connectionState === 'disconnected') {
				peers.close()
			}
		}
	}
	const shareScreen = async () => {
		await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
	}

	return {
		remoteRef,
		setupDevices,
		connectionType,
		localRef,
		shareScreen,
	}
}
