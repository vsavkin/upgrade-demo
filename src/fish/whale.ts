import {COMMON_DIRECTIVES} from '@angular/common';
import {Component, Inject} from '@angular/core';

import {UrlService} from '../service/url';

@Component({
  selector: 'whale',
  template: '<div>whale!</div>',
  directives: [COMMON_DIRECTIVES],
})
export class WhaleComponent {
    unicornLink: string;

  constructor(
      // Why I no work? :(
      @Inject('urlService') urlService: UrlService
  ) {
      this.unicornLink = '#/beasts/unicorn';
  }
}
