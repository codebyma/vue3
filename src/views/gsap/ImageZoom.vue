<template>
  <div class="zoom-section">
    <img ref="imgRef" src="https://picsum.photos/id/10/800/600" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const imgRef = ref(null)

onMounted(() => {
  gsap.fromTo(
    imgRef.value,
    { scale: 1 },
    {
      scale: 1.4,
      scrollTrigger: {
        trigger: imgRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
})
</script>

<style>
.zoom-section {
  height: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zoom-section img {
  width: 70%;
  border-radius: 20px;
}
</style>
