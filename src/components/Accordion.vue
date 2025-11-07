<template>
	<div class="accordion" role="presentation" ref="accordionRef">
		<slot></slot>
	</div>
</template>

<script setup>
import { provide, ref, reactive, nextTick } from 'vue'

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
    scrollToActive: {
        type: Boolean,
        default: false
    },
    fixedSelectors: {
        type: Array,
        default: () => []
    }
})

const accordionRef = ref(null)
const openItems = ref([])
const items = reactive([])

function registerItem(item) {
    if (!items.includes(item)) {
        items.push(item)
        return items.length - 1
    }
}

function getFixedElementsHeight() {
    let totalHeight = 0
    const selectors = ['#header', ...props.fixedSelectors]
    selectors.forEach(selector => {
        const el = document.querySelector(selector)
        if (el && el.offsetHeight > 0) {
            totalHeight += el.offsetHeight
        }
    })
    return totalHeight
}

function getElementPageTop(el) {
    let top = 0
    while (el) {
        top += el.offsetTop
        el = el.offsetParent
    }
    return top
}

async function toggleItem(index) {
    const isOpen = openItems.value.includes(index)

    if (props.multiple) {
        if (isOpen) {
            openItems.value = openItems.value.filter(i => i !== index)
        } else {
            openItems.value.push(index)
        }
    } else {
        openItems.value = isOpen ? [] : [index]
    }

    // ✅ 스크롤 이동 처리
    if (props.scrollToActive && !isOpen) {
        await nextTick()
        const container = accordionRef.value
        if (!container) return

        const itemsInThisAccordion = container.querySelectorAll('.accordion_item')
        const itemEl = itemsInThisAccordion[index]
        if (!itemEl) return

        // ✅ transition이 끝난 후 스크롤하도록 delay
        const delay = 350 // CSS의 transition 시간 (max-height 0.3s + 약간의 여유)
        setTimeout(() => {
            const offset = getFixedElementsHeight()
            const top = getElementPageTop(itemEl) - offset - 10 // 10px의 여유

            window.scrollTo({
                top,
                behavior: 'smooth'
            })
        }, delay)
    }
}

function isOpen(index) {
    return openItems.value.includes(index)
}

provide('accordion', { registerItem, toggleItem, isOpen })
</script>

<style scoped></style>
