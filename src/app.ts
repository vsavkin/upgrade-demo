//ng1/2 hybrid
import * as angular from 'angular'
import * as angularRoute from 'angular-route'
import { UpgradeAdapter } from '@angular/upgrade';
import { BeastModule } from './beasts/beast_module';
import { FishModule } from './fish/fish_module';
import { adapter } from './upgrade/adapter';

//vanilla ng1 module
const rootModule = angular.module('rootModule', [
	'ngRoute',
	BeastModule.name,
	FishModule.name,
]);

//vanilla ng1 root component
rootModule.component('rootCmp', {
	templateUrl: 'templates/root-template.html',
	controllerAs: 'ctrl'
});

rootModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		template: `
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
}]);

export const bootstrap = (el) => adapter.bootstrap(el, ['rootModule']);

