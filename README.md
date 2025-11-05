# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).



# vue3 + Vite 세팅 순서
1. Node.js 설치 확인 - node -v
2. Vite로 Vue 3 프로젝트 생성 - npm create vite@latest
✔ Project name: 프로젝트 명
✔ Select a framework: › Vue
✔ Select a variant: › JavaScript
✔ Use rolldown-vite (Experimental)?:No
3. 의존성 설치- cd 프로젝트 명 - npm install
4. 개발 서버 실행 - npm run dev

# vue-router 세팅
npm install vue-router

# alias
## '@' 가 src 폴더를 가리키는 별칭
// vite.config.js 파일에 추가
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

# build
## 난독화
npm install vite-plugin-javascript-obfuscator --save-dev

// vite.config.js 파일에 추가
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'vite-plugin-javascript-obfuscator'

export default defineConfig({
    plugins: [
        vue(),
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
})

## 빌드
npm run build

## 미리보기
npm run preview

## 배포
npm run deploy

## 404.html에 index.html 내용 복사

## gh-page로 브랜치로 배포
npx gh-pages -d dist

## 기존 gh-pages 브랜치의 내용을 완전히 덮어씌우기
npx gh-pages -d dist --dotfiles --branch gh-pages --message "rebuild with correct base"