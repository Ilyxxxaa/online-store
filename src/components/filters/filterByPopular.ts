import { FilterOptions } from '../types/types';

export class FilterByPopular {
    popularCheckbox = document.querySelector<HTMLInputElement>('.popular__filter-checkbox');

    async drawFilter() {
        document.querySelector('.reset__filter-btn')?.addEventListener('click', () => {
            if (this.popularCheckbox) {
                this.popularCheckbox.checked = false;
            }
        });
    }

    async changeFilterOptions(object: FilterOptions) {
        this.popularCheckbox?.addEventListener('click', () => {
            if (this.popularCheckbox) {
                if (this.popularCheckbox.checked) {
                    object.popular = 'popular';
                    localStorage.setItem('popular', 'popular');
                }
                if (!this.popularCheckbox.checked) {
                    object.popular = 'all';
                    localStorage.setItem('popular', 'all');
                }
            }
        });
    }

    async getLocalStorage() {
        if (localStorage.getItem('popular')) {
            if (localStorage.getItem('popular') === 'popular' && this.popularCheckbox) this.popularCheckbox.checked = true;
            if (localStorage.getItem('popular') === 'all' && this.popularCheckbox) this.popularCheckbox.checked = false;
        }
    }
}
