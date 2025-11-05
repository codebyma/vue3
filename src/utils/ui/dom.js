// DOM 조작 관련 유틸
export const dom = {
/**
     * 요소의 offsetHeight 반환 (선택자 또는 요소)
     * @param {string|HTMLElement|null} target - 선택자 문자열 또는 DOM 요소
     * @returns {number}
     */
    getOffsetHeight: function (target) {
        let el = null;

        if (typeof target === 'string') {
            el = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            el = target;
        }

        return el ? el.offsetHeight : 0;
    },

    /**
     * 여러 요소에서 특정 클래스 제거
     * @param {NodeList|HTMLElement[]} elements - DOM 요소 배열 또는 NodeList
     * @param {string} className - 제거할 클래스 이름
    */
    removeClass: function (elements, className) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(className);
        }
    },

    /**
     * 지정 요소 이전의 모든 형제 요소 반환
     * @param {HTMLElement} ele - 기준 요소
     * @param {string} [selector] - 선택자 필터 (선택 사항)
     * @returns {HTMLElement[]} - 이전 형제 요소 배열 (DOM 순서대로)
    */
    prevAll: function (ele, selector) {
        if (!ele || !ele.previousElementSibling) return [];

        const result = [];
        let current = ele.previousElementSibling;

        while (current) {
            if (!selector || current.matches(selector)) {
                result.push(current);
            }
            current = current.previousElementSibling;
        }

        return result.reverse(); // DOM 상 순서대로 반환
    },

    /**
     * 지정 요소 이후의 모든 형제 요소 반환
     * @param {HTMLElement} ele - 기준 요소
     * @param {string} [selector] - 선택자 필터 (선택 사항)
     * @returns {HTMLElement[]} - 다음 형제 요소 배열
    */
    nextAll: function (ele, selector) {
        if (!ele || !ele.nextElementSibling) return [];

        const result = [];
        let current = ele.nextElementSibling;

        while (current) {
            if (!selector || current.matches(selector)) {
                result.push(current);
            }
            current = current.nextElementSibling;
        }

        return result;
    },

    /**
         * 지정 요소의 형제 요소 반환
         * @param {HTMLElement|string} ele - 요소 또는 선택자
         * @returns {HTMLElement[]} - 형제 요소 배열
        */
    getSiblings: function (ele) {
        if (typeof ele === 'string') {
            ele = document.querySelector(ele);
            if (!ele) return [];
        }

        if (!ele || !ele.parentNode) return [];

        return Array.from(ele.parentNode.children).filter(child => child !== ele);
    },

    /**
     * 요소들의 속성(setAttr) 설정
     * @param {HTMLElement[]|NodeList} elements - 요소 배열 또는 NodeList
     * @param {string} attr - 설정할 속성 이름
     * @param {string} value - 설정할 값
    */
    setAttr: function (elements, attr, value) {
        if (!elements || !attr) return;

        // elements가 배열/반복 가능한 객체가 아닐 경우 단일 요소로 감싸기
        if (!('forEach' in elements)) {
            elements = [elements];
        }

        elements.forEach(item => {
            if (item && item.setAttribute) {
                item.setAttribute(attr, value);
            }
        });
    },

    /**
     * 요소들의 속성(attr) 제거
     * @param {HTMLElement[]|NodeList|HTMLElement} elements - 요소 배열, NodeList 또는 단일 요소
     * @param {string} attr - 제거할 속성 이름
    */
    removeAttr: function (elements, attr) {
        if (!elements || !attr) return;

        if (!('forEach' in elements)) {
            elements = [elements];
        }

        elements.forEach(item => {
            if (item && item.removeAttribute) {
                item.removeAttribute(attr);
            }
        });
    },
};