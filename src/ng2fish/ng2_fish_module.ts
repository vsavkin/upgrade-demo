import {Component} from '@angular/core';
import * as angular from 'angular';

import {UrlModule} from '../service/url';
import {adapter} from '../upgrade/adapter';
import {configureModuleRoot} from '../upgrade/router_upgrade';

import {DolphinCmp} from './ng2_dolphin';
import {WhaleCmp} from './ng2_whale';
import {TunaCmp} from './ng2_tuna';

export const FISH_ROUTES = [ {
  path : 'fish',
  children : [
    {path : 'dolphin', component : DolphinCmp},
    {path : 'whale', component : WhaleCmp}
  ]
} ];

export const FishModule = angular.module('FishModule', [ UrlModule.name ]);
configureModuleRoot(adapter, FishModule);


// registering an Angular 1 component
FishModule.component('tuna', {
  template : `<h1>Tuna</h1>`,
  controller : TunaCmp
});

/** @ngInject */
function configRoutes($routeProvider, urlServiceProvider) {
  urlServiceProvider.register('FISH', 'fish');

  // this is an angular 1 component
  $routeProvider.when(urlServiceProvider.getUrl('FISH', 'tuna'), {template : '<tuna></tuna>'});

  // everything here is angular 2
  $routeProvider.when('/fish/:t', {template : '<module-root></module-root>'});
};
FishModule.config(configRoutes);
