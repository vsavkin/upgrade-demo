// ng1/2 hybrid
import {
  HashLocationStrategy,
  Location,
  LocationStrategy
} from '@angular/common';
import {
  Component,
  ComponentResolver,
  Inject,
  Injector,
  PLATFORM_DIRECTIVES,
  SkipSelf
} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  Route,
  Router,
  RouterOutletMap,
  UrlSerializer,
  UrlTree,
  provideRouter
} from '@angular/router';
import {UpgradeAdapter} from '@angular/upgrade';
import * as angular from 'angular'
import * as angularRoute from 'angular-route'

import {BeastModule} from './beasts/beast_module';
import {FISH_ROUTES, FishModule} from './ng2fish/ng2_fish_module';
import {adapter} from './upgrade/adapter';
import {setUpNG2Router} from './upgrade/router_upgrade';

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
				<li><a href="#/fish/tuna">Tuna</a></li>
			</ul>
		`
    });
  }
]);

setUpNG2Router(adapter, FISH_ROUTES, (url) => url.startsWith("/fish"));

export const bootstrap = (el) => {
  const ref = adapter.bootstrap(el, [ 'rootModule' ]);
  setTimeout(() => ref.ng2Injector.get(Router), 0);
};