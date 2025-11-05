export const numberSpinScroll = {
    animateDigit: function(digitContainer, targetNumber, delay = 0) {
        const numbersDiv = digitContainer.querySelector('.numbers');
        setTimeout(() => {
            numbersDiv.style.transform = `translateY(-${targetNumber * 48}px)`;
        }, delay);
    },
    setAmount: function(selector) {
        document.querySelectorAll(selector).forEach(container => {
            const rawAmount = (container.dataset.animationNumberScroll || '0').replace(/,/g, '');
            const digits = rawAmount.split('');
            container.innerHTML = '';

            const useComma = container.dataset.comma !== 'false';

            digits.forEach((d, idx) => {
                const digitContainer = document.createElement('div');
                digitContainer.classList.add('digit');

                const numbersDiv = document.createElement('div');
                numbersDiv.classList.add('numbers');

                // 0~9 숫자 생성
                for (let i = 0; i <= 9; i++) {
                    const span = document.createElement('span');
                    span.innerText = i;
                    numbersDiv.appendChild(span);
                }

                // 마지막 0~targetNumber 반복 스크롤 느낌
                const targetNumber = parseInt(d, 10);
                for (let i = 0; i < targetNumber; i++) {
                    const span = document.createElement('span');
                    span.innerText = i;
                    numbersDiv.appendChild(span);
                }

                digitContainer.appendChild(numbersDiv);
                container.appendChild(digitContainer);

                // 자리별 지연을 짧게 적용 (빠른 스크롤)
                this.animateDigit(digitContainer, targetNumber, idx * 30);
            });

            // 콤마 사용 시만 천 단위 콤마 추가
            if (useComma) {
                for (let i = digits.length - 3; i > 0; i -= 3) {
                    const comma = document.createElement('span');
                    comma.innerText = ',';
                    comma.style.display = 'inline-block';
                    comma.style.width = '10px';
                    comma.style.lineHeight = '48px';
                    container.insertBefore(comma, container.children[i]);
                }
            }
        });
    }
}