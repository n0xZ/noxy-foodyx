import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

export default defineConfig({
	plugins: [
		React(),
		Unocss({ presets: [presetUno(), presetAttributify()] }),
		AutoImport({ imports: ['react-router-dom', 'react'] }),
	],
	resolve: {
		alias: {
			'~': resolve('src'),
		},
	},
})
