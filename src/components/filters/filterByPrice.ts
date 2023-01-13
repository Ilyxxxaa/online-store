import { FilterOptions } from '../types/types';
import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider';
const wNumb = require('wnumb');
import '../../styles/_noUiSlider.scss';

export class FilterByPrice {
    priceFilterSlider = document.querySelector('.price__filter-range') as noUiSlider.target;

    async drawFilter() {
        if (this.priceFilterSlider) {
            noUiSlider.create(this.priceFilterSlider, {
                start: [
                    parseInt(localStorage.getItem('priceValueFrom') as string) || 0,
                    parseInt(localStorage.getItem('priceValueTo') as string) || 350,
                ],
                connect: true,
                step: 1,
                range: {
                    min: 0,
                    max: 350,
                },
                format: wNumb({
                    decimals: 0,
                    thousand: '.',
                    suffix: ' $',
                }),
            });

            this.priceFilterSlider?.noUiSlider?.on('update', () => {
                const priceFilterValueFrom = document.querySelector<HTMLElement>('.price__filter-value-from');
                const priceFilterValueTo = document.querySelector<HTMLElement>('.price__filter-value-to');
                const priceFilterValues = [this.priceFilterSlider.noUiSlider?.get()][0] as number[];
                if (priceFilterValueFrom) {
                    priceFilterValueFrom.textContent = `${priceFilterValues[0]}`;
                }
                if (priceFilterValueTo) {
                    priceFilterValueTo.textContent = `${priceFilterValues[1]}`;
                }
            });
        }

        document.querySelector('.reset__filter-btn')?.addEventListener('click', () => {
            this.priceFilterSlider?.noUiSlider?.reset();
        });
    }

    async changeFilterOptions(object: FilterOptions) {
        this.priceFilterSlider?.noUiSlider?.on('update', () => {
            const priceFilterValues = [this.priceFilterSlider.noUiSlider?.get()][0] as number[];
            object.priceValueFrom = `${priceFilterValues[0]}`;
            object.priceValueTo = `${priceFilterValues[1]}`;
        });
    }
}
