import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

export default defineConfig({
	plugins: [
		React(),
		WindiCSS(),

		AutoImport({ imports: ['react-router-dom', 'react'] }),
	],
	resolve: {
		alias: {
			'~': resolve('src'),
		},
	},
})
