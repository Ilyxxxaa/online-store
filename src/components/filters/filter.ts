import { FilterOptions, Data } from '../types/types';

import { FilterByType } from './filterByType';
import { FilterByPrice } from './filterByPrice';
import { FilterByAmount } from './filterByAmount';
import { FilterByColor } from './filterByColor';
import { FilterByPackaging } from './filterByPackaging';
import { ResetFilters } from './resetFilters';
import { FilterByPopular } from './filterByPopular';

export class Filter {
    filterOptions: FilterOptions;
    filterByType: FilterByType;
    filterByPrice: FilterByPrice;
    filterByAmount: FilterByAmount;
    filterByColor: FilterByColor;
    filterByPackaging: FilterByPackaging;
    filterByPopular: FilterByPopular;
    resetFilters: ResetFilters;

    constructor() {
        this.filterOptions = {
            flowerType: localStorage.getItem('flowerType') || 'All',
            color: localStorage.getItem('color') || 'all',
            amountValueFrom: '0',
            amountValueTo: '200',
            packaging: localStorage.getItem('packaging') || 'all',
            priceValueTo: '0 $',
            priceValueFrom: '350 $',
            popular: localStorage.getItem('popular') || 'all',
        };

        this.filterByType = new FilterByType();
        this.filterByPrice = new FilterByPrice();
        this.filterByAmount = new FilterByAmount();
        this.filterByColor = new FilterByColor();
        this.filterByPackaging = new FilterByPackaging();
        this.filterByPopular = new FilterByPopular();
        this.resetFilters = new ResetFilters();
    }

    async start() {
        await this.getLocalStorage();
        await this.filterByType.drawFilter();
        await this.filterByPrice.drawFilter();
        await this.filterByAmount.drawFilter();
        await this.filterByColor.drawFilter();
        await this.filterByPackaging.drawFilter();
        await this.filterByPopular.drawFilter();
        await this.filterByType.changeFilterOptions(this.filterOptions);
        await this.filterByPrice.changeFilterOptions(this.filterOptions);
        await this.filterByAmount.changeFilterOptions(this.filterOptions);
        await this.filterByColor.changeFilterOptions(this.filterOptions);
        await this.filterByPackaging.changeFilterOptions(this.filterOptions);
        await this.filterByPopular.changeFilterOptions(this.filterOptions);
        await this.resetFilters.resetFiltersOptions(this.filterOptions);
    }

    async filter(data: Data) {
        const data1 = data.filter((item) => {
            const priceValueFrom = parseInt(this.filterOptions.priceValueFrom);
            const priceValueTo = parseInt(this.filterOptions.priceValueTo);
            const amountValueFrom = parseInt(this.filterOptions.amountValueFrom);
            const amountValueTo = parseInt(this.filterOptions.amountValueTo);
            const itemPrice = +item.price;
            const itemAmount = +item.numberOfFlowers;
            const color = item.color;
            const packaging = item.packaging;
            const popular = item.popular;

            let count = 0;
            if (item.typeOfFlowers == this.filterOptions.flowerType || this.filterOptions.flowerType == 'All') {
                ++count;
            }
            if (itemPrice > priceValueFrom && itemPrice < priceValueTo) {
                ++count;
            }
            if (itemAmount > amountValueFrom && itemAmount < amountValueTo) {
                ++count;
            }
            if (color == this.filterOptions.color || this.filterOptions.color === 'all') {
                ++count;
            }
            if (packaging == this.filterOptions.packaging || this.filterOptions.packaging == 'all') {
                ++count;
            }
            if (popular == this.filterOptions.popular || this.filterOptions.popular == 'all') {
                ++count;
            }
            if (count === 6) return true;
        });
        return data1;
    }

    async getLocalStorage() {
        await this.filterByType.getLocalStorage();
        await this.filterByColor.getLocalStorage();
        await this.filterByPackaging.getLocalStorage();
        await this.filterByPopular.getLocalStorage();
    }
    //Спросить у Кирилла, почему не работает эта штука ниже
    // async addListeners(callback) {
    //     this.filterByType.flowerFilterButtons.forEach((button) => {
    //         button.addEventListener('click', (e) => {
    //             callback();
    //         });
    //     });
    //     this.filterByPrice.priceFilterSlider.noUiSlider?.on('update', () => {
    //         callback();
    //     });
    //     this.filterByAmount.amountFilterSlider.noUiSlider?.on('update', () => {
    //         callback();
    //     });
    //     this.filterByColor.colorFilterButtons.forEach((button) => {
    //         button.addEventListener('click', (e) => {
    //             callback();
    //         });
    //     });
    //     this.filterByPackaging.packagingFilter?.addEventListener('click', () => callback());
    // }
}
