<template>
  <section class="pin-wrap">
    <div class="pin-box" ref="boxRef">Pinned Section</div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const boxRef = ref(null)

onMounted(() => {
  ScrollTrigger.create({
    trigger: boxRef.value,
    start: 'top center',
    end: '+=600',
    pin: true,
    pinSpacing: true,
    scrub: true,
  })

  gsap.to(boxRef.value, {
    scale: 1.5,
    scrollTrigger: {
      trigger: boxRef.value,
      start: 'top center',
      end: '+=600',
      scrub: true,
    }
  })
})
</script>

<style>
.pin-wrap {
  height: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pin-box {
  background: #333;
  color: #fff;
  padding: 80px;
  border-radius: 16px;
  font-size: 40px;
}
</style>
