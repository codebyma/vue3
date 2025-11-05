// utils/modal.js
import { reactive, nextTick } from 'vue';
import { UI } from '@/utils/ui/ui.js';

export const modal = {
    state: reactive({}),      // 모든 모달 상태
    focusStack: [],           // 열기 버튼 스택

    register(name) {
        if (!(name in this.state)) this.state[name] = false;
    },

    async open(name, event, modalEl) {
        this.register(name);

        if (event?.currentTarget) this.focusStack.push(event.currentTarget);

        this.state[name] = true;

        await nextTick();

        const el = modalEl?.value;
        if (el) {
            el.setAttribute('tabindex', '0');
            el.focus();

            // 접근성 처리
            UI.a11y.accessDisable(document.querySelector('header'), 'modal');
            UI.a11y.accessDisable(UI.dom.prevAll(el), 'modal');
        }
    },

    async close(name, modalEl) {
        if (!(name in this.state)) return;

        // 닫기 처리
        this.state[name] = false;

        await nextTick();

        const el = modalEl?.value;
        if (el) {
            UI.a11y.accessEnable(document.querySelector('header'), 'modal');
            UI.a11y.accessEnable(UI.dom.prevAll(el), 'modal');
        }

        // 마지막 열기 버튼으로 포커스 회귀
        const lastFocus = this.focusStack.pop();
        if (lastFocus?.focus) setTimeout(() => lastFocus.focus(), 10);
    },

    isOpen(name) {
        return !!this.state[name];
    }
};
