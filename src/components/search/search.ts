import { Data } from '../types/types';

export class Search {
    searchInput: HTMLInputElement;
    clearSearchBtn: HTMLElement;
    constructor() {
        this.searchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.clearSearchBtn = document.querySelector('.search__cross') as HTMLElement;
    }

    drawSearch() {
        this.clearSearchBtn.addEventListener('click', () => {
            this.searchInput.value = '';
        });
    }

    searchItems(data: Data): Data {
        const result = data.filter((item) => {
            if (item.name.toLowerCase().trim().includes(this.searchInput.value.toLowerCase().trim())) {
                return true;
            }
        });
        return result;
    }
}
