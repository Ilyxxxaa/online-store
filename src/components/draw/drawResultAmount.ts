export class DrawResultAmount {
    resultNumber = document.querySelector<HTMLElement>('.content__cort-number');
    resultText = document.querySelector<HTMLElement>('.content__sort-result');

    async drawResultAmount(length: number) {
        if (!length) {
            if (this.resultText) this.resultText.innerHTML = 'Sorry, no products matched your search';
        }
        if (this.resultNumber && length && this.resultText) {
            this.resultText.innerHTML = `<span class="content__cort-number">${length}</span> Product Found`;
        }
    }
}
