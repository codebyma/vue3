import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SampleView from '@/views/SampleView.vue'
import UiView from '@/views/UiView.vue'
import routerView from '@/views/routerView.vue'
import FormsView from '@/views/FormsView.vue'
import buttonView from '@/views/ButtonView.vue'
import formView from '@/views/FormView.vue'
import AccordionView from '@/views/AccordionView.vue'
import TooltipView from '@/views/TooltipView.vue'
import ModalView from '@/views/ModalView.vue'
import ChipsView from '@/views/ChipsView.vue'
import TableView from '@/views/TableView.vue'
import IconView from '@/views/IconView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/sample',
		name: 'sample',
		component: SampleView,
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
		path: '/forms/button',
		name: 'forms',
		component: FormsView,
		children: [
			{
				path: '/forms/button',
				name: 'button',
				component: buttonView,
			},
			{
				path: '/forms/form',
				name: 'form',
				component: formView,
			},
			{
				path: '/forms/accordion',
				name: 'accordion',
				component: AccordionView,
			},
			{
				path: '/forms/tooltip',
				name: 'tooltip',
				component: TooltipView,
			},
			{
				path: '/forms/modal',
				name: 'modal',
				component: ModalView,
			},
			{
				path: '/forms/chips',
				name: 'chips',
				component: ChipsView,
			},
			{
				path: '/forms/table',
				name: 'table',
				component: TableView,
			},
			{
				path: '/forms/icon',
				name: 'icon',
				component: IconView,
			},
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
]

const router = createRouter({
	// history: createWebHashHistory(), // 해시 모드
	history: createWebHistory('/vue3/'), // 히스토리 모드 (URL에 # 안 붙음)
	routes,
})

export default router
