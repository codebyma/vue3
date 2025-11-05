export const formatter = {
    /**
     * 숫자 문자열에서 모든 콤마(,)를 제거합니다.
     * @param {string} str - 콤마를 제거할 문자열
     * @returns {string} 콤마가 제거된 문자열
     */
    removeCommas: (str) => str.replace(/,/g, ""),

    /**
     * 숫자에 천 단위 콤마(,)를 추가합니다.
     * @param {number|string} num - 콤마를 추가할 숫자 또는 숫자 문자열
     * @returns {string} 콤마가 추가된 문자열
     */
    addCommas: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

    /**
     * 숫자를 지정한 소수점 자리수까지 반올림합니다.
     * @param {number} num - 반올림할 숫자
     * @param {number} decimalPlaces - 소수점 자리수
     * @returns {string} 반올림된 숫자 문자열
     */
    roundTo: (num, decimalPlaces) => {
        return num.toFixed(decimalPlaces);
    },

    /**
     * 문자열 양쪽의 공백을 제거합니다.
     * @param {string} str - 공백을 제거할 문자열
     * @returns {string} 공백이 제거된 문자열
     */
    trimSpaces: (str) => str.trim(),

    /**
     * 문자열을 지정된 길이만큼 자르고, 초과 시 "..."을 붙입니다.
     * @param {string} str - 자를 문자열
     * @param {number} length - 최대 길이
     * @returns {string} 잘린 문자열 또는 원본 문자열
    */
    truncate: (str, length) => {
        if (str.length > length) {
            return str.slice(0, length) + "...";
        }
        return str;
    },

    /**
     * 문자열에서 영문자, 숫자, 공백을 제외한 모든 특수 문자를 제거합니다.
     * @param {string} str - 특수 문자를 제거할 문자열
     * @returns {string} 특수 문자가 제거된 문자열
     */
    removeSpecialChars: (str) => {
        return str.replace(/[^a-zA-Z0-9 ]/g, '');
    },

    /**
     * 날짜를 "YYYY-MM-DD" 형식의 문자열로 포맷합니다.
     * @param {Date|string|number} date - Date 객체 또는 날짜로 변환 가능한 값
     * @returns {string} 포맷된 날짜 문자열 (예: "2025-09-26")
     */
    formatDate: (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * 이메일 형식이 유효한지 검사합니다.
     * @param {string} email - 검사할 이메일 주소
     * @returns {boolean} 유효하면 true, 아니면 false
     */
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
}