<template>
  <div class="bg-wrap">
    <section class="sec sec1">Section 1</section>
    <section class="sec sec2">Section 2</section>
    <section class="sec sec3">Section 3</section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const colors = ['#ffb3b3', '#b3e5ff', '#c4ffb3']

  document.querySelectorAll('.sec').forEach((sec, i) => {
    gsap.to('body', {
      backgroundColor: colors[i],
      scrollTrigger: {
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    })
  })
})
</script>

<style>
.bg-wrap {
  height: auto;
}
.sec {
  height: 100vh;
  font-size: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
