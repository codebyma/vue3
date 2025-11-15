<template>
  <div class="scroll-section">
    <img ref="imgRef" class="img" src="https://picsum.photos/id/24/800/500" />
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
    { xPercent: -30 },
    {
      xPercent: 30,
      scrollTrigger: {
        trigger: imgRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    }
  )
})
</script>

<style>
.scroll-section {
  height: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  width: 70%;
  border-radius: 20px;
}
</style>
