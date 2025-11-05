import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import obfuscator from 'vite-plugin-javascript-obfuscator' // build 난독화
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	base: '/vue3/', // ⚠️ 꼭 본인 저장소 이름으로 변경!
	plugins: [
		vue(),
		svgLoader({
			svgoConfig: {
				plugins: [
				{ removeViewBox: false } // viewBox 제거하지 않도록 설정
				]
			}
		}),
		obfuscator({
			compact: true,
			controlFlowFlattening: true,
			deadCodeInjection: true,
			stringArray: true,
			stringArrayEncoding: ['rc4'],
			transformObjectKeys: true,
		})
	],
	build: {
		sourcemap: false,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
})
