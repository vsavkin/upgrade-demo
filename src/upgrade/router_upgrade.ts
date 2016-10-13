/**
 * Everything from this file will be moved into the router package.
 */

import {
  HashLocationStrategy,
  Location,
  LocationStrategy
} from '@angular/common';
import {
  Component,
  Inject,
  Injector,
  NgZone,
  SkipSelf,
  Compiler,
  NgModuleFactoryLoader,
  Type
} from '@angular/core';
import {
  Route,
  Router,
  RouterOutletMap,
  UrlSerializer,
  UrlTree,
  Routes
} from '@angular/router';
import {UpgradeAdapter} from '@angular/upgrade';

@Component({template : ''})
export class FakeRootCmp {
}

@Component(
    {selector : 'module-root', template : `ModuleRootCmp[<router-outlet></router-outlet>]`})
export class ModuleRootCmp {
}

export function configureModuleRoot(adapter, module) {
  module.directive('moduleRoot', <any>adapter.downgradeNg2Component(ModuleRootCmp));
}