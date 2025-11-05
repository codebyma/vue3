export const numberSpinSimple = {
    animateValue: function(element, start, end, duration) {
        let startTime = null;
        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentValue = Math.floor(start + (end - start) * progress);
            
            const useComma = element.dataset.comma !== 'false';
            element.innerText = useComma ? currentValue.toLocaleString() : currentValue;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    },
    setAmount: function(selector, duration = 1000) {
        document.querySelectorAll(selector).forEach(element => {
            const currentAmount = parseInt(element.innerText.replace(/,/g, ''), 10) || 0;
            const newAmount = parseInt((element.dataset.animationNumberSimple || '0').replace(/,/g, ''), 10);
            this.animateValue(element, currentAmount, newAmount, duration);
        });
    }
}