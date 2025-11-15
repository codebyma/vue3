<template>
  <div class="outer">
    <div class="inner" ref="innerRef">
      <section v-for="n in 5" :key="n" class="panel">
        Panel {{ n }}
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const innerRef = ref(null)

onMounted(() => {
  const panels = innerRef.value.querySelectorAll('.panel')
  const totalWidth = (panels.length * 100) - 100

  gsap.to(innerRef.value, {
    xPercent: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '.outer',
      start: 'top top',
      end: `+=${panels.length * 1000}`,
      scrub: true,
      pin: true,
    }
  })
})
</script>

<style>
.outer {
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.inner {
  display: flex;
  height: 100%;
}
.panel {
  flex: 0 0 100vw;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
}
</style>
