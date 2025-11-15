<template>
  <div class="parallax-wrapper">
    <div class="bg" ref="bgRef">BACKGROUND</div>
    <div class="fg" ref="fgRef">FOREGROUND</div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const bgRef = ref(null)
const fgRef = ref(null)

let targetY = 0
let currentY = 0
let raf

const update = () => {
  // 부드러운 보간
  currentY += (targetY - currentY) * 0.08

  gsap.set(bgRef.value, { y: currentY * 0.2 })  // 천천히
  gsap.set(fgRef.value, { y: currentY * 0.6 })  // 빠르게

  raf = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    targetY = window.scrollY
  })
  update()
})

onUnmounted(() => cancelAnimationFrame(raf))
</script>

<style>
.parallax-wrapper {
  height: 200vh;
  padding-top: 100px;
  position: relative;
}
.bg {
  font-size: 60px;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 20px;
}
.fg {
  font-size: 40px;
  position: absolute;
  top: 200px;
  left: 20px;
}
</style>
