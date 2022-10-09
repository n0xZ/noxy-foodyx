import { defineConfig } from 'windicss/helpers'

export default defineConfig({
	theme: {
		extend: {
			fontFamily: {
				openSans: ['Open Sans', 'sans-serif'],
				jost: ['Jost', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [require('windicss/plugin/forms')],
})
