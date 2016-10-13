import {Component} from '@angular/core';
import * as angular from 'angular';

import {UrlModule} from '../service/url';
import {configureModuleRoot} from '../upgrade/router_upgrade';

import {DolphinCmp} from './ng2_dolphin';
import {WhaleCmp} from './ng2_whale';

@Component({selector: 'blank', template: 'BLANK'})
export class BlankCmp {}

export const FISH_ROUTES = [ {
  path : 'fish',
  children : [
    {path : 'dolphin', component : DolphinCmp},
    {path : 'whale', component : WhaleCmp}
  ]
}
];


export const FishModule = angular.module('FishModule', [ UrlModule.name ]);

/** @ngInject */
function configRoutes($routeProvider, urlServiceProvider) {
  urlServiceProvider.register('FISH', 'fish');

  // everything here is angular 2
  $routeProvider.when('/fish/:t', {template : 'ROOT[<module-root></module-root>]'});
};
FishModule.config(configRoutes);
