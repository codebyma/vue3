<template>
  <div class="wrap">
    <div
      v-for="n in 6"
      :key="n"
      class="item"
      :ref="el => items[n-1] = el"
    >
      Fade Item {{ n }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const items = ref([])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7 })
        }
      })
    },
    { threshold: 0.2 }
  )

  items.value.forEach(el => {
    gsap.set(el, { opacity: 0, y: 40 })
    observer.observe(el)
  })
})
</script>

<style>
.wrap {
  padding: 50px;
}
.item {
  margin: 80px 0;
  font-size: 2rem;
  padding: 40px;
  background: #eee;
  border-radius: 10px;
}
</style>
