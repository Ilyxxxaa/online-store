import { FilterOptions } from '../types/types';

export class FilterByColor {
    colorFilterButtons = document.querySelectorAll<HTMLElement>('.color__filter-btn');

    async drawFilter() {
        this.colorFilterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.colorFilterButtons.forEach((button) => button.classList.remove('color__filter-btn--active'));
                const eventTarget = <HTMLElement>e.currentTarget;
                if (eventTarget) {
                    eventTarget.classList.add('color__filter-btn--active');
                }
            });
        });
        document.querySelector('.reset__filter-btn')?.addEventListener('click', () => {
            this.colorFilterButtons.forEach((button) => button.classList.remove('color__filter-btn--active'));
            this.colorFilterButtons[0].classList.add('color__filter-btn--active');
        });
    }

    async changeFilterOptions(object: FilterOptions) {
        this.colorFilterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const eventTarget = <HTMLElement>e.currentTarget;
                if (eventTarget) {
                    const color = eventTarget.getAttribute('data-color');
                    if (color) {
                        object.color = color;
                        localStorage.setItem('color', color);
                    }
                }
            });
        });
    }

    async getLocalStorage() {
        if (localStorage.getItem('color')) {
            this.colorFilterButtons.forEach((button) => button.classList.remove('color__filter-btn--active'));
            this.colorFilterButtons.forEach((button) => {
                if (button.getAttribute('data-color') === localStorage.getItem('color')) {
                    button.classList.add('color__filter-btn--active');
                }
            });
        }
    }
}
