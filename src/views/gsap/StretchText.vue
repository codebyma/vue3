<template>
  <h1 ref="textRef" class="stretch">STRETCHING TEXT</h1>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const textRef = ref(null)

onMounted(() => {
  gsap.fromTo(
    textRef.value,
    { scaleX: 1 },
    {
      scaleX: 3,
      transformOrigin: 'left center',
      scrollTrigger: {
        trigger: textRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      }
    }
  )
})
</script>

<style>
.stretch {
  margin-top: 150vh;
  font-size: 6rem;
  text-align: center;
}
</style>
