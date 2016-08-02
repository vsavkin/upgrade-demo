import * as angular from 'angular';
import {UrlService, UrlModule} from '../service/url';
import {UnicornComponent} from './unicorn';

export const BeastModule = angular.module('BeastModule', [
    'ngRoute',
    UrlModule.name,
]);

BeastModule.component('unicorn', {
  template: `<h1>Unicorn!</h1>
    <p>Maybe you would like a <a href="{{$ctrl.whaleLink}}">whale</a> instead.</p>`, 
controller: UnicornComponent
});

/** @ngInject */
function configRoutes($routeProvider, urlServiceProvider) {
    urlServiceProvider.register('BEASTS', 'beasts');
    $routeProvider.when(urlServiceProvider.getUrl('BEASTS', 'unicorn'), {
        template: '<unicorn></unicorn>'
    }).when(urlServiceProvider.getUrl('BEASTS', 'yale'), {
        templateUrl: './yale.html'
    });
};
BeastModule.config(configRoutes);
