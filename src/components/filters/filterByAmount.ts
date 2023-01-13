import { FilterOptions } from '../types/types';
import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider';
const wNumb = require('wnumb');
import '../../styles/_noUiSlider.scss';

export class FilterByAmount {
    amountFilterSlider = document.querySelector('.amount__filter-range') as noUiSlider.target;

    async drawFilter() {
        if (this.amountFilterSlider) {
            noUiSlider.create(this.amountFilterSlider, {
                start: [0, 200],
                connect: true,
                step: 1,
                range: {
                    min: 0,
                    max: 200,
                },
                format: wNumb({
                    decimals: 0,
                }),
            });

            this.amountFilterSlider?.noUiSlider?.on('update', () => {
                const amountFilterValueFrom = document.querySelector<HTMLElement>('.amount__filter-value-from');
                const amountFilterValueTo = document.querySelector<HTMLElement>('.amount__filter-value-to');
                const amountFilterValues = [this.amountFilterSlider.noUiSlider?.get()][0] as number[];
                if (amountFilterValueFrom) {
                    amountFilterValueFrom.textContent = `${amountFilterValues[0]}`;
                }
                if (amountFilterValueTo) {
                    amountFilterValueTo.textContent = `${amountFilterValues[1]}`;
                }
            });
        }

        document.querySelector('.reset__filter-btn')?.addEventListener('click', () => {
            this.amountFilterSlider?.noUiSlider?.reset();
        });
    }

    async changeFilterOptions(object: FilterOptions) {
        this.amountFilterSlider?.noUiSlider?.on('update', () => {
            const amountFilterValues = [this.amountFilterSlider.noUiSlider?.get()][0] as number[];
            object.amountValueFrom = `${amountFilterValues[0]}`;
            object.amountValueTo = `${amountFilterValues[1]}`;
        });
    }

    // async getLocalStorage() {
    //     if (localStorage.getItem('amountValueFrom')) {
    //         this.amountFilterSlider?.noUiSlider?.set([
    //             parseInt(localStorage.getItem('amoutValueFrom') as string),
    //             parseInt(localStorage.getItem('amoutValueTo') as string),
    //         ]);
    //     }
    // }
}
