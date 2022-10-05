import PrivateLayout from '~/components/layout/PrivateLayout'
import { useAppSelector } from '~/redux/hooks'
export default function HomeOutlet() {
	const { userInfo, isLoading } = useAppSelector((state) => state.auth)

	if (!isLoading && !userInfo) return <Navigate to="/login" replace={true} />
	return (
		<PrivateLayout>
			<Outlet />
		</PrivateLayout>
	)
}
