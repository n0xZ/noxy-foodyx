import { Routes } from 'react-router-dom'

const Landing = lazy(() => import('./pages/landing'))
function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
		</Routes>
	)
}

export default App
