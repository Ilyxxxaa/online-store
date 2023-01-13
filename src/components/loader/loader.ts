import { itemCard, Data } from '../types/types';

export class Loader {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async load() {
        const data = fetch(this.url)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .catch((err) => console.log(err));

        return data;
    }
}
