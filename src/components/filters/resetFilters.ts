import { FilterOptions } from '../types/types';

export class ResetFilters {
    resetBtn = document.querySelector<HTMLElement>('.reset__filter-btn');

    async resetFiltersOptions(object: FilterOptions) {
        this.resetBtn?.addEventListener('click', () => {
            object.flowerType = 'All';
            object.color = 'all';
            object.amountValueFrom = '0';
            object.amountValueTo = '150';
            object.packaging = 'all';
            object.popular = 'all';
            localStorage.clear();
        });
    }
}
