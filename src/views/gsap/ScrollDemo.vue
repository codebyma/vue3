<template>
  <div class="demo-page">

    <!-- 1. 패럴랙스 -->
    <section class="sec">
      <h2>1. Parallax</h2>
      <div class="parallax-wrap">
        <div class="bg" ref="bgRef">BACKGROUND</div>
        <div class="fg" ref="fgRef">FOREGROUND</div>
      </div>
    </section>

    <!-- 2. 이미지 확대 -->
    <section class="sec">
      <h2>2. Image Zoom-In</h2>
      <img ref="zoomImg" class="zoom-img" src="https://picsum.photos/id/10/900/500" />
    </section>

    <!-- 3. 텍스트 한 글자씩 등장 -->
    <section class="sec">
      <h2>3. Text Reveal</h2>
      <h1 ref="textRevealRef" class="reveal-text">HELLO WORLD</h1>
    </section>

    <!-- 4. SVG 라인 드로우 -->
    <section class="sec">
      <h2>4. SVG Line Draw</h2>
      <svg width="400" height="200">
        <path
          ref="linePath"
          d="M 20 150 C 100 20, 300 20, 380 150"
          stroke="#000"
          stroke-width="4"
          fill="none"
        />
      </svg>
    </section>

    <!-- 5. 스크롤 반응 인터랙션 -->
    <section class="sec">
      <h2>5. Scroll Reactive</h2>
      <div ref="reactBox" class="react-box">MOVE</div>
    </section>

    <!-- 6. 가로 스크롤 -->
    <section class="horizontal-outer">
      <div class="horizontal-inner" ref="horizontalRef">
        <div class="panel" v-for="n in 4" :key="n">Panel {{ n }}</div>
      </div>
    </section>

    <!-- 7. Pin 섹션 -->
    <section class="sec pin-wrap">
      <h2>7. Pin Section</h2>
      <div class="pin-box" ref="pinBox">PINNED</div>
    </section>

    <!-- 8. Stretch Text -->
    <section class="sec">
      <h2>8. Stretch Text</h2>
      <h1 ref="stretchText" class="stretch">STRETCHING TEXT</h1>
    </section>

    <!-- 9. Background Fade -->
    <section class="sec bg1">Background Fade 1</section>
    <section class="sec bg2">Background Fade 2</section>
    <section class="sec bg3">Background Fade 3</section>

    <!-- 10. Horizontal Parallax -->
    <section class="sec">
      <h2>10. Horizontal Parallax</h2>
      <img ref="horiImg" class="hori-img" src="https://picsum.photos/id/24/900/500" />
    </section>

    <!-- 11. Observer + GSAP -->
    <section class="sec">
      <h2>11. Observer + GSAP</h2>
      <div class="observer-item" v-for="n in 6" :key="n" :ref="el => observerItems[n-1] = el">
        Fade Item {{ n }}
      </div>
    </section>

  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ========= 1. 패럴랙스 ========= */
const bgRef = ref(null);
const fgRef = ref(null);
let targetY = 0, currentY = 0, raf;

const parallaxUpdate = () => {
  currentY += (targetY - currentY) * 0.07;
  gsap.set(bgRef.value, { y: currentY * 0.2 });
  gsap.set(fgRef.value, { y: currentY * 0.6 });
  raf = requestAnimationFrame(parallaxUpdate);
};

/* ========= 2. Image Zoom ========= */
const zoomImg = ref(null);

/* ========= 3. Text Reveal ========= */
const textRevealRef = ref(null);

/* ========= 4. SVG Line Draw ========= */
const linePath = ref(null);

/* ========= 5. Scroll Reactive ========= */
const reactBox = ref(null);
let target = 0, current = 0, raf2;
const reactiveUpdate = () => {
  current += (target - current) * 0.1;
  gsap.set(reactBox.value, {
    x: current * 0.4,
    rotation: current * 0.05,
    opacity: 1 - Math.min(current / 600, 1),
  });
  raf2 = requestAnimationFrame(reactiveUpdate);
};

/* ========= 6. Horizontal Scroll ========= */
const horizontalRef = ref(null);

/* ========= 7. Pin Section ========= */
const pinBox = ref(null);

/* ========= 8. Stretch Text ========= */
const stretchText = ref(null);

/* ========= 10. Horizontal Parallax ========= */
const horiImg = ref(null);

/* ========= 11. Observer Fade ========= */
const observerItems = ref([]);

onMounted(() => {

  /* 패럴랙스 */
  window.addEventListener("scroll", () => {
    targetY = window.scrollY;
  });
  parallaxUpdate();

  /* 이미지 확대 */
  gsap.fromTo(
    zoomImg.value,
    { scale: 1 },
    {
      scale: 1.4,
      scrollTrigger: {
        trigger: zoomImg.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  /* 텍스트 등장 */
  const chars = textRevealRef.value.innerText.split("");
  textRevealRef.value.innerHTML = chars.map(c => `<span class="char">${c}</span>`).join("");
  gsap.from(textRevealRef.value.querySelectorAll(".char"), {
    opacity: 0,
    y: 30,
    stagger: 0.05,
    scrollTrigger: {
      trigger: textRevealRef.value,
      start: "top 80%",
    },
  });

  /* SVG 라인 */
  const len = linePath.value.getTotalLength();
  gsap.fromTo(
    linePath.value,
    { strokeDasharray: len, strokeDashoffset: len },
    {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: linePath.value,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    }
  );

  /* scroll reactive */
  window.addEventListener("scroll", () => {
    target = window.scrollY;
  });
  reactiveUpdate();

  /* 가로 스크롤 */
  const totalWidth = (4 * 100) - 100;
  gsap.to(horizontalRef.value, {
    xPercent: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-outer",
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: true,
    }
  });

  /* Pin */
  ScrollTrigger.create({
    trigger: pinBox.value,
    start: "top center",
    end: "+=600",
    pin: true,
    scrub: true,
  });

  /* Stretch */
  gsap.fromTo(
    stretchText.value,
    { scaleX: 1 },
    {
      scaleX: 3,
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: stretchText.value,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    }
  );

  /* 배경 페이드 */
  const fadeSections = document.querySelectorAll(".bg1, .bg2, .bg3");
  const colors = ["#ffe0e0", "#e0f0ff", "#d8ffe0"];

  fadeSections.forEach((sec, i) => {
    gsap.to("body", {
      backgroundColor: colors[i],
      scrollTrigger: {
        trigger: sec,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  /* Horizontal Parallax */
  gsap.fromTo(
    horiImg.value,
    { xPercent: -30 },
    {
      xPercent: 30,
      scrollTrigger: {
        trigger: horiImg.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  /* Observer fade */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7 });
        }
      });
    },
    { threshold: 0.3 }
  );

  observerItems.value.forEach(el => {
    gsap.set(el, { opacity: 0, y: 40 });
    observer.observe(el);
  });

});


onUnmounted(() => {
  cancelAnimationFrame(raf);
  cancelAnimationFrame(raf2);
});
</script>



<style>
.demo-page {
  width: 100%;
  overflow-x: hidden;
}

.sec {
  padding: 120px 20px;
}

/* 1 패럴랙스 */
.parallax-wrap {
  height: 200vh;
  position: relative;
}
.bg {
  position: absolute;
  top: 0;
  left: 20px;
  font-size: 60px;
  opacity: 0.3;
}
.fg {
  position: absolute;
  top: 200px;
  left: 20px;
  font-size: 40px;
}

/* 2 Zoom */
.zoom-img {
  width: 70%;
  border-radius: 20px;
}

/* 3 Text Reveal */
.reveal-text {
  font-size: 60px;
  text-align: center;
}
.char {
  display: inline-block;
}

/* 4 SVG */
svg {
  display: block;
  margin: 0 auto;
}

/* 5 Scroll reactive */
.react-box {
  font-size: 40px;
  padding: 20px 40px;
  background: #333;
  color: white;
  display: inline-block;
  border-radius: 10px;
}

/* 6 Horizontal scroll */
.horizontal-outer {
  height: 100vh;
  overflow: hidden;
}
.horizontal-inner {
  height: 100%;
  display: flex;
}
.panel {
  flex: 0 0 100vw;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
}

/* 7 Pin */
.pin-box {
  background: #444;
  color: #fff;
  padding: 60px;
  font-size: 40px;
  border-radius: 16px;
}

/* 8 Stretch Text */
.stretch {
  font-size: 6rem;
  text-align: center;
}

/* 9 Background fade */
.bg1, .bg2, .bg3 {
  height: 100vh;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 10 Horizontal Parallax */
.hori-img {
  width: 70%;
  border-radius: 20px;
}

/* 11 Observer */
.observer-item {
  background: #eee;
  margin: 40px 0;
  padding: 30px;
  border-radius: 10px;
  font-size: 2rem;
}
</style>
