<template>
  <h1 ref="textRef" class="reveal-text">HELLO WORLD</h1>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const textRef = ref(null)

onMounted(() => {
  // 텍스트 분리
  const chars = textRef.value.innerText.split('')
  textRef.value.innerHTML = chars.map(c => `<span class="char">${c}</span>`).join('')

  const letters = textRef.value.querySelectorAll('.char')

  gsap.from(letters, {
    opacity: 0,
    y: 30,
    stagger: 0.05,
    duration: 0.6,
    scrollTrigger: {
      trigger: textRef.value,
      start: 'top 80%',
    }
  })
})
</script>

<style>
.reveal-text {
  font-size: 60px;
  text-align: center;
  margin-top: 120vh;
}
.char {
  display: inline-block;
}
</style>
