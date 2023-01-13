import { FilterOptions } from '../types/types';

export class FilterByType {
    flowerFilterButtons = document.querySelectorAll<HTMLElement>('.flower__filter-btn');

    async drawFilter() {
        this.flowerFilterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.flowerFilterButtons.forEach((button) => button.classList.remove('flower__filter-btn--active'));
                const eventTarget = <HTMLElement>e.target;
                if (eventTarget) {
                    eventTarget.classList.add('flower__filter-btn--active');
                    const itemFlowerValue = eventTarget.textContent;
                }
            });
        });

        document.querySelector('.reset__filter-btn')?.addEventListener('click', () => {
            this.flowerFilterButtons.forEach((button) => button.classList.remove('flower__filter-btn--active'));
            this.flowerFilterButtons[0].classList.add('flower__filter-btn--active');
        });
    }

    async changeFilterOptions(object: FilterOptions) {
        this.flowerFilterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const eventTarget = <HTMLElement>e.target;
                if (eventTarget) {
                    const flowerType = eventTarget.textContent;
                    if (flowerType) {
                        object.flowerType = flowerType;
                        localStorage.setItem('flowerType', flowerType);
                    }
                }
            });
        });
    }

    async getLocalStorage() {
        if (localStorage.getItem('flowerType')) {
            this.flowerFilterButtons.forEach((button) => button.classList.remove('flower__filter-btn--active'));
            this.flowerFilterButtons.forEach((button) => {
                if (button.textContent == localStorage.getItem('flowerType')) {
                    button.classList.add('flower__filter-btn--active');
                }
            });
        }
    }
}
