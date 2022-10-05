import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL!
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY!
const RAPID_API_HOST = import.meta.env.VITE_RAPID_API_HOST!

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		'X-RapidAPI-Key': RAPID_API_KEY,
		'X-RapidAPI-Host': RAPID_API_HOST,
	},
})
