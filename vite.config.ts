import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		React(),
		Unocss(),
		AutoImport({ imports: ['react-router-dom', 'react'] }),
	],
})
