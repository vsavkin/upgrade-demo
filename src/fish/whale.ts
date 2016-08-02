import {COMMON_DIRECTIVES} from '@angular/common';
import {Component, Inject} from '@angular/core';

import {UrlService} from '../service/url';

@Component({
  selector: 'whale',
  templateUrl: 'templates/whale.html',
  directives: [COMMON_DIRECTIVES],
})
export class WhaleComponent {
    unicornLink: string;

  constructor(@Inject('urlService') urlService: UrlService) {
      this.unicornLink = urlService.getUrl("BEASTS", "unicorn");
  }
}
