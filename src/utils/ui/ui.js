import { dom } from './dom';
import { deviceInfo } from './deviceInfo';
import { userAgent } from './userAgent';
import { a11y } from './a11y';
import { util } from './util';
import { formatter } from './formatter';
import { numberSpinSimple } from './animation/numberSpinSimple';
import { numberSpinScroll } from './animation/numberSpinScroll';

export const UI = {
    dom,
    deviceInfo,
    userAgent,
    a11y,
    util,
    formatter,
    animation: { numberSpinSimple, numberSpinScroll },

    /**
     * 초기화 함수: 공통 기능 실행
     */
    initAll() {
        this.deviceInfo.init();
        // 필요에 따라 init 호출
        // 예: this.animation.numberSpinSimple.setAmount('[data-animation-number-simple]');
    }
};
