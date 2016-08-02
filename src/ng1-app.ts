//ng1/2 hybrid
import * as angular from 'angular'
import * as angularRoute from 'angular-route'
import { UpgradeAdapter } from '@angular/upgrade';
import { Ng2Component } from './ng2-app';
import { BeastModule } from './beasts/beast_module';
import { FishModule } from './fish/fish_module';
import { adapter } from './upgrade/adapter';

//vanilla ng1 module
const ng1Module = angular.module('ng1-module', [
	'ngRoute',
	BeastModule.name,
	FishModule.name,
]);

//vanilla ng1 root component
ng1Module.component('ng1RootComponent', {
	templateUrl: 'templates/ng1-root-template.html',
	controller: function(){
		this.myName = 'bob'
	},
	controllerAs: 'ctrl'
});

ng1Module.config(['$routeProvider', function($routeProvider) {
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
				<li><a href="#/beasts/dolphin">Dolphin</a></li>
				<li><a href="#/beasts/whale">Whale</a></li>
			</ul>
		`
	});
}]);

//vanilla ng1 component
ng1Module.component('ng1Component', {
	template: `<div>hello {{ctrl.name}} from ng2!</div>`,
	bindings: {
		name: '='
	},
	controller: function(){},
	controllerAs: 'ctrl'
});

//downgraded ng2 component
ng1Module.directive('ng2Component', adapter.downgradeNg2Component(Ng2Component) as any);

export const bootstrap = (el) => adapter.bootstrap(el, ['ng1-module']);

