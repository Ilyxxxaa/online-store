import { Data, itemCard } from '../types/types';

export class Sorter {
    sortSelect: HTMLSelectElement;
    constructor() {
        this.sortSelect = document.querySelector('.content__sort-select-values') as HTMLSelectElement;
    }

    sort(data: Data): Data {
        if (this.sortSelect.value == 'price-lowest') {
            data.sort((a, b) => (+a.price > +b.price ? 1 : -1));
            return data;
        }
        if (this.sortSelect.value == 'price-highest') {
            data.sort((a, b) => (+a.price < +b.price ? 1 : -1));
            return data;
        }
        if (this.sortSelect.value == 'name-a') {
            data.sort((a, b) => (a.typeOfFlowers > b.typeOfFlowers ? 1 : -1));
            return data;
        }
        if (this.sortSelect.value == 'name-z') {
            data.sort((a, b) => (a.typeOfFlowers < b.typeOfFlowers ? 1 : -1));
            return data;
        }
        return data;
    }
}
