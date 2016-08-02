import {UrlService} from '../service/url';

/** @ngInject */
export class UnicornComponent {
    whaleLink: string;
    constructor(urlService: UrlService) {
        this.whaleLink = '#' + urlService.getUrl('FISH', 'whale');
    }
}