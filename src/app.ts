// ng1/2 hybrid
import {
  HashLocationStrategy,
  Location,
  LocationStrategy
} from '@angular/common';
import {
  Component,
  Inject,
  Injector,
  SkipSelf,
  NgModule,
  NgZone,
  NgModuleFactoryLoader,
  Compiler
} from '@angular/core';
import {
  Route,
  Router,
  RouterOutletMap,
  UrlSerializer,
  UrlTree,
  RouterModule
} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeAdapter} from '@angular/upgrade';
import * as angular from 'angular'
import * as angularRoute from 'angular-route'

import {BeastModule} from './beasts/beast_module';
import {FISH_ROUTES, FishModule} from './ng2fish/ng2_fish_module';
import {DolphinCmp} from './ng2fish/ng2_dolphin';
import {WhaleCmp} from './ng2fish/ng2_whale';
import {FakeRootCmp, UpgradeRouter, configureModuleRoot, ModuleRootCmp} from './upgrade/router_upgrade';

const rootModule = angular.module('rootModule', [
  'ngRoute',
  BeastModule.name,
  FishModule.name,
]);

rootModule.component(
    'rootCmp',
    {templateUrl : 'templates/root-template.html', controllerAs : 'ctrl'});

rootModule.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      template : `
			<h1>Bestiary</h1>
			<h2>Beasts</h2>
			<ul>
				<li><a href="#/beasts/unicorn">Unicorn</a></li>
				<li><a href="#/beasts/yale">Yale</a></li>
			</ul>

			<h2>Fish</h2>
			<ul>
				<li><a href="#/fish/dolphin">Dolphin</a></li>
				<li><a href="#/fish/whale">Whale</a></li>
			</ul>
		`
    });
  }
]);

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(FISH_ROUTES, {useHash: true})],
  declarations: [DolphinCmp, WhaleCmp, ModuleRootCmp],
  providers: [
    {
      provide : Router,
      useFactory : createRouter,
      deps : [
        UrlSerializer, RouterOutletMap, Location, Injector, NgZone, NgModuleFactoryLoader, Compiler
      ]
    }
  ]
})
class AppModule {}

export function createRouter(urlSerializer: UrlSerializer,
  outletMap: RouterOutletMap,
  location: Location,
  injector: Injector,
  zone: NgZone,
  loader: NgModuleFactoryLoader,
  compiler: Compiler) {

  return zone.run(() => {
    const r =
      new UpgradeRouter(FakeRootCmp, urlSerializer, outletMap,
        location, injector, loader, compiler, FISH_ROUTES, (url) => url.startsWith("/fish"));
    setTimeout(() => {
      console.log("set up location listener");
      (<any>r).setUpLocationChangeListener();
    }, 0);

    return r;
  });
}

export const adapter = new UpgradeAdapter(AppModule);

adapter.upgradeNg1Provider('urlService');

console.log("set up module root");
configureModuleRoot(adapter, FishModule);

export const bootstrap = (el) => {
  const ref = adapter.bootstrap(el, [ 'rootModule' ]);
  setTimeout(() => ref.ng2Injector.get(Router), 0);
};

