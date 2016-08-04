import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';

import {UrlService} from '../service/url';

@Component({
  selector : 'whale',
  template : `
    <h1>Whale</h1>
    <p>Maybe you would like a <a [routerLink]="unicornLink">unicorn</a> instead.</p>
  `
})
export class WhaleCmp {
  unicornLink: string;

  constructor(@Inject('urlService') urlService: UrlService) {
    this.unicornLink = "/" + urlService.getUrl("BEASTS", "unicorn");
  }
}
