import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ModalView from '@/views/ModalView.vue'
import UiView from '@/views/UiView.vue'
import routerView from '@/views/routerView.vue'
import buttonView from '@/views/ButtonView.vue'
import formView from '@/views/FormView.vue'
import AccordionView from '@/views/AccordionView.vue'
import TooltipView from '@/views/TooltipView.vue'
import ChipsView from '@/views/ChipsView.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/modal',
		name: 'modal',
		component: ModalView,
	},
	{
		path: '/ui',
		name: 'ui',
		component: UiView,
	},
	{
		path: '/router',
		name: 'router',
		component: routerView,
	},
	{
		path: '/button',
		name: 'button',
		component: buttonView,
	},
	{
		path: '/form',
		name: 'form',
		component: formView,
	},
	{
		path: '/accordion',
		name: 'accordion',
		component: AccordionView,
	},
	{
		path: '/tooltip',
		name: 'tooltip',
		component: TooltipView,
	},
	{
		path: '/chips',
		name: 'chips',
		component: ChipsView,
	},
]

const router = createRouter({
	// history: createWebHashHistory(), // 해시 모드
	history: createWebHistory('/vue3/'), // 히스토리 모드 (URL에 # 안 붙음)
	routes,
})

export default router
