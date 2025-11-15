<template>
  <div class="svg-section">
    <svg width="400" height="200" ref="svgRef">
      <path
        ref="pathRef"
        d="M 20 150 C 100 20, 300 20, 380 150"
        stroke="#000"
        stroke-width="4"
        fill="none"
      />
    </svg>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pathRef = ref(null)

onMounted(() => {
  const len = pathRef.value.getTotalLength()

  gsap.fromTo(
    pathRef.value,
    {
      strokeDasharray: len,
      strokeDashoffset: len,
    },
    {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: pathRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
    }
  )
})
</script>

<style>
.svg-section {
  height: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
