import { userAgent } from './userAgent';

export const deviceInfo = {
    /** @type {string|null} 운영체제 */
    os: null,
    /** @type {string|null} 디바이스 */
    device: null,
    /** @type {string|null} 브라우저 */
    browser: null,
    /** @type {string|null} 브라우저 버전 (주요 버전) */
    version: null,
    /** @type {boolean|null} 모바일 여부 */
    mobile: null,

    /**
     * 초기화 함수
     * @returns {void}
     */
    init: function () {
        this.mobile = userAgent.isMobile();
        this.setDeviceInfo();
        this.setBodyClass();
    },

    /**
     * 운영체제, 디바이스, 브라우저, 버전 정보를 세팅한다
     * @returns {void}
     */
    setDeviceInfo: function () {
        // OS 체크
        if (userAgent.iOS()) {
            this.os = 'os_ios';
        } else if (userAgent.Android()) {
            this.os = 'os_android';
        } else if (userAgent.BlackBerry()) {
            this.os = 'os_blackBerry';
        } else if (userAgent.Windows()) {
            this.os = 'os_windows';
        } else {
            this.os = 'other-os';
        }

        // 디바이스 체크
        if (userAgent.iPhone()) {
            this.device = 'iphone';
        } else if (userAgent.iPad()) {
            this.device = 'ipad';
        } else {
            this.device = 'other-device';
        }

        // 브라우저 체크
        if (userAgent.edge()) {
            this.browser = 'edge';
        } else if (userAgent.opera() && !!window.opr) {
            this.browser = 'opera';
        } else if (userAgent.chrome() && !!window.chrome) {
            this.browser = 'chrome';
        } else if (userAgent.msie()) {
            this.browser = 'msie';
        } else if (userAgent.firefox()) {
            this.browser = 'firefox';
        } else if (userAgent.safari()) {
            this.browser = 'safari';
        } else {
            this.browser = 'other-browser';
        }

        this.version = this.getVersion(this.browser);
    },

    /**
     * 브라우저 버전 정보를 User-Agent에서 추출한다.
     * @param {string} agent 브라우저명 (edge, opera, chrome, msie, firefox, safari)
     * @returns {string|null} 주요 버전 숫자 또는 null
     */
    getVersion: function (agent) {
        const ua = userAgent.ua;
        let matches = null;

        switch (agent) {
            case 'edge':
                matches = ua.match(/edg\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
                break;
            case 'opera':
                matches = ua.match(/opera\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
                break;
            case 'chrome':
                matches = ua.match(/chrome\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
                break;
            case 'msie':
                matches = ua.match(/msie\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
                break;
            case 'firefox':
                matches = ua.match(/firefox\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
                break;
            case 'safari':
                matches = ua.match(/version\/([0-9]+\.[0-9]+)/);
                break;
            default:
                return null;
        }

        if (matches && matches[1]) {
            return matches[1].split('.')[0]; // 주요 버전만 리턴
        }
        return null;
    },

    /**
     * body 태그에 platform, os, browser, version, device 클래스를 세팅한다.
     * @returns {void}
     */
    setBodyClass: function () {
        const platform = this.mobile ? 'mobile' : 'pc';
        const classes = [platform, this.os, this.browser, `ver${this.version}`, this.device];
        document.querySelector('body').setAttribute('class', classes.filter(Boolean).join(' '));
    }
};
