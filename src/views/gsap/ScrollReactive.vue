<template>
  <div class="wrap">
    <div class="box" ref="boxRef">MOVE</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const boxRef = ref(null)
let target = 0
let current = 0
let raf

const update = () => {
  current += (target - current) * 0.1

  gsap.set(boxRef.value, {
    x: current * 0.4,
    rotation: current * 0.05,
    opacity: 1 - Math.min(current / 800, 1)
  })

  raf = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    target = window.scrollY
  })
  update()
})

onUnmounted(() => cancelAnimationFrame(raf))
</script>

<style>
.wrap {
  height: 200vh;
}
.box {
  margin-top: 150px;
  margin-left: 30px;
  background: #333;
  color: #fff;
  padding: 30px;
  font-size: 40px;
  display: inline-block;
  border-radius: 10px;
}
</style>
