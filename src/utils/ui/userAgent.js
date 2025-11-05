export const userAgent = {
    ua: navigator.userAgent.toLowerCase(),
    /** @returns {boolean} BlackBerry 여부 */
    BlackBerry: function () {
        return /blackberry/i.test(this.ua);
    },
    /** @returns {boolean} Android 여부 */
    Android: function () {
        return /android/i.test(this.ua);
    },
    /** @returns {boolean} iOS 여부 (iPhone, iPad, iPod) */
    iOS: function () {
        return /iphone|ipad|ipod/i.test(this.ua);
    },
    /** @returns {boolean} iPhone 여부 */
    iPhone: function () {
        return /iphone/i.test(this.ua);
    },
    /** @returns {boolean} iPad 여부 */
    iPad: function () {
        return /ipad/i.test(this.ua);
    },
    /** @returns {boolean} Windows 여부 */
    Windows: function () {
        return /windows/i.test(this.ua);
    },
    /** @returns {boolean} Edge 브라우저 여부 */
    edge: function () {
        return /edge|edg/i.test(this.ua);
    },
    /** @returns {boolean} Opera 브라우저 여부 */
    opera: function () {
        return /opr/i.test(this.ua);
    },
    /** @returns {boolean} Chrome 브라우저 여부 */
    chrome: function () {
        return /chrome/i.test(this.ua);
    },
    /** @returns {boolean} Internet Explorer 여부 */
    msie: function () {
        return /trident/i.test(this.ua);
    },
    /** @returns {boolean} Firefox 브라우저 여부 */
    firefox: function () {
        return /firefox/i.test(this.ua);
    },
    /** @returns {boolean} Safari 브라우저 여부 */
    safari: function () {
        return /safari/i.test(this.ua);
    },
    /** @returns {boolean} 주요 모바일 OS/브라우저 중 하나라도 해당하는지 여부 */
    any: function () {
        return this.Android() || this.BlackBerry() || this.iOS() || this.opera() || this.Windows();
    },
    /** @returns {boolean} 모바일 디바이스 여부 */
    isMobile: function () {
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(this.ua);
    }
};
