export const util = {
    /**
     * 지정된 요소를 slideDown 애니메이션으로 표시합니다. (jQuery slideDown 유사)
     * @param {HTMLElement} el - 애니메이션을 적용할 요소
     * @param {number} [duration=350] - 애니메이션 지속 시간 (ms)
     */
    slideDown: function (el, duration = 350) {
        if (!el) return;

        el.style.removeProperty('display');
        let display = window.getComputedStyle(el).display;
        if (display === 'none') display = 'block';
        el.style.display = display;

        const height = el.offsetHeight;

        el.style.overflow = 'hidden';
        el.style.height = 0;
        el.offsetHeight; // 강제 리플로우

        el.classList.remove('collapse', 'show');
        el.classList.add('collapsing');

        el.style.transition = `height ${duration}ms ease`;
        el.style.height = `${height}px`;

        setTimeout(() => {
            el.classList.remove('collapsing');
            el.classList.add('collapse', 'show');
            el.style.removeProperty('height');
            el.style.removeProperty('overflow');
            el.style.removeProperty('transition');
        }, duration);
    },

    /**
     * 지정된 요소를 slideUp 애니메이션으로 숨깁니다. (jQuery slideUp 유사)
     * @param {HTMLElement} el - 애니메이션을 적용할 요소
     * @param {number} [duration=350] - 애니메이션 지속 시간 (ms)
     */
    slideUp: function (el, duration = 350) {
        if (!el) return;

        el.style.height = `${el.offsetHeight}px`;
        el.offsetHeight; // 강제 리플로우

        el.style.overflow = 'hidden';
        el.style.transition = `height ${duration}ms ease`;

        el.classList.remove('collapse', 'show');
        el.classList.add('collapsing');

        el.style.height = 0;

        setTimeout(() => {
            el.classList.remove('collapsing');
            el.classList.add('collapse');
            el.style.display = 'none';
            el.style.removeProperty('height');
            el.style.removeProperty('overflow');
            el.style.removeProperty('transition');
        }, duration);
    },

    /**
     * 현재 날짜를 'YYYYMMDD' 형식의 문자열로 반환합니다.
     * 
     * 주로 캐시 무효화를 위한 버전 파라미터로 사용할 수 있으며,
     * 매일 자정에 값이 변경됩니다. (ex: '20250930')
     *
     * @function
     * @returns {string} 'YYYYMMDD' 형식의 날짜 문자열
     *
     * @example
     * const version = getVersion(); // '20250930'
     * const url = `header.js?v=${version}`;
     */
    getVersion: function () {
        const d = new Date();
        return `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`;
    },

    /**
     * 요소의 속성(attr)에 날짜 기반 난수 쿼리 추가
     * @param {HTMLElement|HTMLElement[]|NodeList} elements
     * @param {string} attr
    */
    setAttrRandomNum: function (elements, attr) {
        const list = elements instanceof HTMLElement ? [elements] : Array.from(elements || []);
        const rand = UI.util.getVersion();

        list.forEach(el => {
            let val = el.getAttribute(attr);
            if (!val) return;

            // 기존에 이미 ? 또는 &로 붙은 날짜 기반 쿼리 제거
            val = val.replace(/([?&])\d{8}$/, ''); // YYYYMMDD 형식 숫자 제거

            const sep = val.includes('?') ? '&' : '?';
            el.setAttribute(attr, `${val}${sep}${rand}`);
        });
    },

    /**
         * URL에서 특정 쿼리 파라미터 값을 가져옴
         * @param {string} param - 파라미터 이름
         * @param {string} [url=location.href] - 검사할 URL (기본값: 현재 페이지 URL)
         * @returns {string|null} - 파라미터 값 또는 null
        */
    getUrlParam: function (param, url = window.location.href) {
        if (!param) return null;

        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get(param);
        } catch (e) {
            console.error('잘못된 URL:', url);
            return null;
        }
    },

    /**
         * 스크롤 이동 후 콜백 실행 (jQuery animate 대체)
         * @param {number} targetY - 이동할 Y 위치
         * @param {number} duration - 애니메이션 시간 (ms)
         * @param {Function} callback - 완료 후 실행할 콜백
         */
    scrollToWithCallback: function (targetY, duration = 500, callback) {
        const start = window.scrollY || window.pageYOffset;
        const startTime = performance.now();

        function scroll() {
            const now = performance.now();
            const time = Math.min(1, (now - startTime) / duration);
            const easeOut = time * (2 - time); // easeOutQuad
            window.scrollTo(0, Math.ceil((easeOut * (targetY - start)) + start));

            if (time < 1) {
                requestAnimationFrame(scroll);
            } else if (typeof callback === 'function') {
                callback(); // 스크롤 완료 후 실행
            }
        }

        requestAnimationFrame(scroll);
    },
}