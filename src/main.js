import { createApp } from 'vue'
import '@/styles/common.css'
import App from './App.vue'
import router from './router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Section from '@/layouts/Section.vue'
import SectionTitle from '@/components/SectionTitle.vue'

import Button from '@/components/Button.vue'
import ButtonWrap from '@/components/ButtonWrap.vue'


const app = createApp(App)
app.use(router)

app.component('DefaultLayout', DefaultLayout)
app.component('Section', Section)
app.component('SectionTitle', SectionTitle)

app.component('Button', Button)
app.component('ButtonWrap', ButtonWrap)


app.mount('#app')