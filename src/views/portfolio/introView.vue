<template>
  <!-- 1️⃣ HERO SECTION -->
  <section class="section hero">
    <div class="hero__inner">
      <h1 class="hero__title" ref="titleRef">
        <span class="hero__word">WEB</span>
        <span class="hero__word">PUBLISHER</span>
      </h1>

      <p class="hero__subtitle" ref="subtitleRef">
        웹 표준과 접근성을 기반으로
        인터랙션 중심의 UI를 구현합니다.
      </p>

      <div class="hero__skills" ref="skillsRef">
        <span>HTML5</span>
        <span>CSS / SCSS</span>
        <span>JavaScript</span>
        <span>Responsive</span>
      </div>
    </div>
  </section>

  <!-- 2️⃣ SKILL MAP SECTION -->
  <section class="section skillmap" ref="skillSectionRef">
    <h2 class="skillmap__title">Skill Map</h2>

    <div class="skillmap__circle" ref="circleRef">
      <!-- 중심 -->
      <div class="node center">Core</div>

      <!-- 외곽 노드 -->
      <div class="node n1">HTML</div>
      <div class="node n2">CSS / SCSS</div>
      <div class="node n3">JavaScript</div>
      <div class="node n4">Vue</div>
      <div class="node n5">GSAP</div>
      <div class="node n6">UI / UX</div>
    </div>
  </section>

  <!-- 3️⃣ EXTRA SECTION -->
  <section class="section extra">
    <h2>Extra Section</h2>
    <p>다른 내용이나 프로젝트 소개 섹션</p>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";

/* ------------------
   Refs
------------------ */
const titleRef = ref(null);
const subtitleRef = ref(null);
const skillsRef = ref(null);

const skillSectionRef = ref(null);
const circleRef = ref(null);

/* ------------------
   Full Page Scroll state
------------------ */
let sections = [];
let currentIndex = 0;
let isScrolling = false;
let touchStartY = 0;

/* 섹션 목록 갱신 */
const updateSections = () => {
  sections = Array.from(document.querySelectorAll(".section"));
  if (currentIndex >= sections.length) currentIndex = sections.length - 1;
};

/* 현재 스크롤과 가장 가까운 섹션 */
const getClosestSectionIndex = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  let nearest = 0;
  let minDiff = Infinity;
  sections.forEach((sec, idx) => {
    const diff = Math.abs(sec.offsetTop - scrollY);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = idx;
    }
  });
  return nearest;
};

/* Skill Map 애니메이션 */
const playSkillMapAnimation = () => {
  if (!circleRef.value) return;
  const nodes = circleRef.value.querySelectorAll(".node");
  gsap.fromTo(
    nodes,
    { opacity: 0, scale: 0 },
    { opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: "back.out(1.8)" }
  );
  gsap.fromTo(
    circleRef.value,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
  );
};

/* 섹션으로 스크롤 이동 */
const scrollToSection = (index) => {
  if (!sections[index]) return;
  isScrolling = true;

  sections[index].scrollIntoView({ behavior: "smooth", block: "start" });

  // Skill Map 섹션이면 애니메이션 실행
  if (sections[index].classList.contains("skillmap")) {
    playSkillMapAnimation();
  }

  setTimeout(() => {
    currentIndex = index;
    isScrolling = false;
  }, 900);
};

/* 마우스 휠 이벤트 */
const handleWheel = (e) => {
  if (e && e.preventDefault) e.preventDefault();
  if (isScrolling) return;

  const delta = e.deltaY;
  if (delta > 0 && currentIndex < sections.length - 1) {
    scrollToSection(currentIndex + 1);
  } else if (delta < 0 && currentIndex > 0) {
    scrollToSection(currentIndex - 1);
  }
};

/* 키보드 이벤트 */
const handleKeyDown = (e) => {
  if (isScrolling) return;
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    if (currentIndex < sections.length - 1) scrollToSection(currentIndex + 1);
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    if (currentIndex > 0) scrollToSection(currentIndex - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    scrollToSection(0);
  } else if (e.key === "End") {
    e.preventDefault();
    scrollToSection(sections.length - 1);
  }
};

/* 모바일 터치 */
const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  if (isScrolling) return;
  const endY = e.changedTouches[0].clientY;
  const diff = touchStartY - endY;

  if (diff > 50 && currentIndex < sections.length - 1) {
    scrollToSection(currentIndex + 1);
  } else if (diff < -50 && currentIndex > 0) {
    scrollToSection(currentIndex - 1);
  }
};

/* ------------------
   Mount / Unmount
------------------ */
onMounted(() => {
  updateSections();
  currentIndex = getClosestSectionIndex();

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("keydown", handleKeyDown, { passive: false });
  window.addEventListener("resize", updateSections);

  /* HERO 애니메이션 */
  const tl = gsap.timeline({ delay: 0.2 });
  const titleWords = titleRef.value?.querySelectorAll(".hero__word") || [];
  tl.from(titleWords, { y: 80, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.15 });
  if (subtitleRef.value) {
    tl.from(subtitleRef.value, { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");
  }
  const skillSpans = skillsRef.value?.querySelectorAll("span") || [];
  tl.from(skillSpans, { opacity: 0, y: 15, duration: 0.6, stagger: 0.1 }, "-=0.3");
});

onBeforeUnmount(() => {
  window.removeEventListener("wheel", handleWheel);
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchend", handleTouchEnd);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("resize", updateSections);
});
</script>

<style scoped>
/* ------------------
   SECTION 기본 스타일
------------------ */
body, html {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 스크롤바 숨김 */
}

.section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0e0f12;
  color: #fff;
  flex-direction: column;
  text-align: center;
}

/* -----------------------
   HERO SECTION
----------------------- */
.hero__title {
  font-size: clamp(48px, 8vw, 100px);
  font-weight: 800;
  line-height: 1.1;
  overflow: hidden;
}

.hero__word {
  display: block;
}

.hero__subtitle {
  margin-top: 20px;
  font-size: 18px;
  color: #b8b8b8;
}

.hero__skills {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero__skills span {
  padding: 8px 14px;
  background: rgba(255,255,255,0.07);
  border-radius: 12px;
  font-size: 14px;
}

/* -----------------------
   SKILL MAP SECTION
----------------------- */
.skillmap__title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 50px;
}

.skillmap__circle {
  position: relative;
  width: 380px;
  height: 380px;
  margin: 0 auto;
}

.node {
  position: absolute;
  padding: 14px 20px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 18px;
  backdrop-filter: blur(4px);
  font-size: 14px;
  transition: transform .25s ease, background .25s ease, border-color .25s ease;
  cursor: default;
}

.node.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,0.2);
}

.node.n1 { top: 0%; left: 50%; transform: translate(-50%, -20%); }
.node.n2 { top: 18%; left: 90%; transform: translate(-50%, -50%); }
.node.n3 { top: 70%; left: 95%; transform: translate(-50%, -50%); }
.node.n4 { top: 95%; left: 50%; transform: translate(-50%, -50%); }
.node.n5 { top: 70%; left: 5%; transform: translate(-50%, -50%); }
.node.n6 { top: 18%; left: 10%; transform: translate(-50%, -50%); }

.node:hover {
  background: rgba(255,255,255,0.25);
  transform: scale(1.15) translate(-50%, -50%);
  border-color: rgba(255,255,255,0.45);
}

/* -----------------------
   EXTRA SECTION
----------------------- */
.extra h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.extra p {
  font-size: 18px;
}
</style>
