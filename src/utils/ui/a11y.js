export const a11y = {
    /**
     * 접근성 비활성화 (포커스, aria-hidden 등)
     * @param {HTMLElement|HTMLElement[]} eleDisable - 비활성화할 요소(들)
     * @param {string} module - 모듈명 (ex: "modal")
     */
    accessDisable(eleDisable, module) {
        if (!eleDisable) return;

        const elements = (eleDisable instanceof HTMLElement)
            ? [eleDisable]
            : Array.isArray(eleDisable) || eleDisable instanceof NodeList
                ? Array.from(eleDisable)
                : [];

        elements.forEach(ele => {
            if (!ele) return;

            const baseClassHidden = `is-a11y-${module}-hidden`;
            const baseClassFixed = `is-a11y-${module}-fixed`;
            const baseClassTags = `is-a11y-${module}-tags`;
            const baseClassTabindex = `is-a11y-${module}-tabindex`;

            const focusTags = ele.querySelectorAll('input:not([tabindex]), button:not([tabindex]), a:not([tabindex]), select:not([tabindex]), textarea:not([tabindex])');
            const tab0 = ele.querySelectorAll('[tabindex="0"]');
            const tabM1 = ele.querySelectorAll('[tabindex="-1"]');

            if (!ele.hasAttribute('aria-hidden')) {
                ele.setAttribute('aria-hidden', 'true');
                ele.classList.add(baseClassHidden);
            } else {
                ele.classList.add(baseClassFixed);
            }

            focusTags.forEach(tag => {
                tag.setAttribute('tabindex', '-1');
                tag.classList.add(baseClassTags);
            });
            tab0.forEach(tag => {
                tag.setAttribute('tabindex', '-1');
                tag.classList.add(baseClassTabindex);
            });
            tabM1.forEach(tag => {
                tag.classList.add(baseClassFixed);
            });
        });
    },


    /**
     * 접근성 활성화 (포커스, aria-hidden 등 복구)
     * @param {HTMLElement|HTMLElement[]} eleEnable - 복구할 요소(들)
     * @param {string} module - 모듈명 (ex: "modal")
    */
    accessEnable(eleEnable, module) {
        if (!eleEnable) return;

        const elements = (eleEnable instanceof HTMLElement)
            ? [eleEnable]
            : Array.isArray(eleEnable) || eleEnable instanceof NodeList
                ? Array.from(eleEnable)
                : [];

        elements.forEach(ele => {
            if (!ele) return;

            const baseClassHidden = `is-a11y-${module}-hidden`;
            const baseClassFixed = `is-a11y-${module}-fixed`;
            const baseClassTags = `is-a11y-${module}-tags`;
            const baseClassTabindex = `is-a11y-${module}-tabindex`;

            if (ele.classList.contains(baseClassHidden)) {
                ele.removeAttribute('aria-hidden');
                ele.classList.remove(baseClassHidden);
            } else {
                ele.classList.remove(baseClassFixed);
            }

            const focusTags = ele.querySelectorAll(`.${baseClassTags}`);
            const tab0 = ele.querySelectorAll(`.${baseClassTabindex}`);
            const tabM1 = ele.querySelectorAll(`.${baseClassFixed}`);

            focusTags.forEach(tag => {
                tag.removeAttribute('tabindex');
                tag.classList.remove(baseClassTags);
            });
            tab0.forEach(tag => {
                tag.setAttribute('tabindex', '0');
                tag.classList.remove(baseClassTabindex);
            });
            tabM1.forEach(tag => {
                tag.classList.remove(baseClassFixed);
            });
        });
    },
};
