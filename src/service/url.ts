import * as angular from 'angular';
import {adapter} from '../upgrade/adapter';

export class UrlProvider {
  // Maps the app section key to the first part of a URL path
  private urlMap: {[id: string] : string};
  constructor() { this.urlMap = {}; }

  register(section: string, url: string) { this.urlMap[section] = url; }

  getUrl(section: string, subpath: string): string {
    if (subpath.charAt(0) !== '/') {
      subpath = '/' + subpath;
    }
    return '/' + this.urlMap[section] + subpath;
  }

  $get() { return new UrlService(this.urlMap); }
}

export class UrlService {
  // Maps the app section key to the first part of a URL path
  private urlMap: {[id: string] : string};
  constructor(urlMap: {[id: string] : string}) { this.urlMap = urlMap; }

  getUrl(section: string, subpath: string) {
    if (subpath.charAt(0) !== '/') {
      subpath = '/' + subpath;
    }
    return this.urlMap[section] + subpath;
  }
}

export const UrlModule = angular.module('UrlModule', [ 'ngRoute' ]);
UrlModule.provider('urlService', UrlProvider);

adapter.upgradeNg1Provider('urlService');
