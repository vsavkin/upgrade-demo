import * as angular from 'angular';
import {WhaleComponent} from './whale';
import {UrlModule} from '../service/url';
import {adapter} from '../upgrade/adapter';

export const FishModule = angular.module('FishModule', [
    'ngRoute',
    UrlModule.name,
]);

FishModule.directive(
    'whale',
    <angular.IDirectiveFactory>adapter.downgradeNg2Component(
        WhaleComponent));


/** @ngInject */
function configRoutes($routeProvider, urlServiceProvider) {
    urlServiceProvider.register('FISH', 'fish');
    $routeProvider.when('/fish/dolphin', {
        templateUrl: 'templates/dolphin.html'
    }).when('/fish/whale', {
        template: '<whale></whale>'
    });
};
FishModule.config(configRoutes);