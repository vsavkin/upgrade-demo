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
  ComponentResolver,
  Inject,
  Injector,
  NgZone,
  PLATFORM_DIRECTIVES,
  SkipSelf
} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  Route,
  Router,
  RouterConfig,
  RouterOutletMap,
  UrlSerializer,
  UrlTree,
  provideRouter
} from '@angular/router';
import {UpgradeAdapter} from '@angular/upgrade';

// we need an extension point in the router to do it
class FilteringLocation implements Location {
  constructor(private delegate: Location, private matches: Function){};

  path(includeHash?: boolean): string {
    return this.delegate.path(includeHash);
  }

  isCurrentPathEqualTo(path: string, query?: string): boolean {
    return this.delegate.isCurrentPathEqualTo(path, query);
  }

  normalize(url: string): string { return this.delegate.normalize(url); }

  prepareExternalUrl(url: string): string {
    return this.delegate.prepareExternalUrl(url);
  }

  go(path: string, query?: string): void { this.delegate.go(path, query); }

  replaceState(path: string, query?: string): void {
    this.delegate.replaceState(path, query);
  }

  forward(): void { this.delegate.forward(); }

  back(): void { this.delegate.back(); }

  subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void,
            onReturn?: () => void): Object {
    return this.delegate.subscribe((next => {
                                     console.log("navigation!", next['url']);
                                     setTimeout(() => {
                                       if (this.matches(next['url'])) {
                                         console.log("navigation matches!",
                                                     next['url']);
                                         onNext(next);
                                       }
                                     }, 0);
                                   }),
                                   onThrow, onReturn);
  }
}

class UpgradeRouter extends Router {
  public loc;
  public rootCmp;
  public storedState;

  constructor(rootComponentType: any, resolver: ComponentResolver,
              urlSerializer: UrlSerializer, outletMap: RouterOutletMap,
              location: Location, injector: Injector, config: any,
              private matches: Function) {
    super(rootComponentType, resolver, urlSerializer, outletMap,
          new FilteringLocation(location, matches), injector, config);
    this.rootCmp = rootComponentType;

    this.loc = location;
    this.storedState = (<any>this).currentRouterState;
  }

  navigate(commands: any[], extras: any = {}): Promise<boolean> {
    const r = this.createUrlTree(commands, extras);

    console.log("navigateTo", r.toString(),
                this.matches(r.toString())) if (this.matches(r.toString())) {
      return this.navigate(commands, extras);
    }
    else {
      (<any>this).currentRouterState = this.storedState;
      this.loc.go(r.toString());
      return Promise.resolve(true);
    }
  }

  navigateByUrl(url: string|UrlTree): Promise<boolean> {
    console.log("navigateByUrl",
                url.toString()) if (this.matches(url.toString())) {
      return this.navigateByUrl(url);
    }
    else {
      (<any>this).currentRouterState = this.storedState;
      this.loc.go(url.toString());
      return Promise.resolve(true)
    }
  }
}

@Component({template : ''})
class FakeRootCmp {
}

@Component(
    {selector : 'module-root', template : `<router-outlet></router-outlet>`})
class ModuleRootCmp {
}

export function configureModuleRoot(adapter, module) {
  module.directive('moduleRoot',
                   <any>adapter.downgradeNg2Component(ModuleRootCmp));
}

export function setUpNG2Router(adapter: UpgradeAdapter, config: RouterConfig,
                               filter: Function) {
  adapter.addProvider(provideRouter(config));

  adapter.addProvider(
      {provide : LocationStrategy, useClass : HashLocationStrategy});

  adapter.addProvider({
    provide : PLATFORM_DIRECTIVES,
    multi : true,
    useValue : ROUTER_DIRECTIVES
  });

  adapter.addProvider({
    provide : Router,
    useFactory : (resolver: ComponentResolver, urlSerializer: UrlSerializer,
                  outletMap: RouterOutletMap, location: Location,
                  injector: Injector, zone: NgZone) => {
      return zone.run(() => {
        const r =
            new UpgradeRouter(FakeRootCmp, resolver, urlSerializer, outletMap,
                              location, injector, config, filter);

        // r.events.subscribe(e => {
        //   console.group(`Router Event: ${(<any>e.constructor).name}`);
        //   console.log(e.toString());
        //   console.log(e);
        //   console.groupEnd();
        // });

        setTimeout(() => {
          console.log("set up location listener");
          (<any>r).setUpLocationChangeListener();
        }, 0);

        return r;
      });

    },
    deps : [
      ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector,
      NgZone
    ]
  });
}