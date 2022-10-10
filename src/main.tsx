import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'virtual:windi.css'
import './reset.css'
import App from './App'
import { store } from './redux/store'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
				<Toaster position='top-right' />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
)
