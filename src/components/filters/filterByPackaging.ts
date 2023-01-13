import { FilterOptions } from '../types/types';

export class FilterByPackaging {
    packagingFilter = document.querySelector<HTMLSelectElement>('.packaging__filter-select');

    async drawFilter() {
        document.querySelector('.reset__filter-btn')?.addEventListener('click', () => {
            if (this.packagingFilter) this.packagingFilter.selectedIndex = 0;
        });
    }

    async changeFilterOptions(object: FilterOptions) {
        this.packagingFilter?.addEventListener('click', () => {
            const packaging = this.packagingFilter?.value;
            if (packaging) {
                object.packaging = packaging;
                localStorage.setItem('packaging', packaging);
            }
        });
    }

    async getLocalStorage() {
        if (localStorage.getItem('packaging')) {
            if (this.packagingFilter && localStorage.getItem('packaging') == 'all') this.packagingFilter.selectedIndex = 0;
            if (this.packagingFilter && localStorage.getItem('packaging') == 'film') this.packagingFilter.selectedIndex = 1;
            if (this.packagingFilter && localStorage.getItem('packaging') == 'ribbon') this.packagingFilter.selectedIndex = 2;
            if (this.packagingFilter && localStorage.getItem('packaging') == 'box') this.packagingFilter.selectedIndex = 3;
        }
    }
}
