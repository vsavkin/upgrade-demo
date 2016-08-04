# Router

The core idea is to run an Angular 2 module--fish--with a larger Angular 1 application.

## Files

### Angular 1 Module

`src/beasts` defines an Angualar 1 section. It has two routes and two components.

### Angular 2 Module

`src/ng2fish` defines an Angualr 2 section.

1. To make it clear everything Angular 2 related is prefixed with 'ng2'.
2. We still configure the Angular 1 router in this module. But the only thing we are doing there is rendering the ModuleRoot
component. The purpose of this component is to be the "root commponent" and provide the initial router outlet.
In a regular Angular 2 application this component would be statically instantiated.
3. This module provides the configuration for the Angular 2 router and defines two components.

### Main app.ts

This file wires everything up.

1. It includes both the beast and fish modules.
2. It calls setUpNG2Router. This won't be necessary once we move all the hacks from 'router_upgrade.ts' into the router itself.

## Details

The router_upgrade.ts file contains a bunch of hacks for the Angular 2 router. We have to do it in this hacky way as,
at the moment, the router does not have the right extension points. Adding those is trivial. So the hacks
will go away after we finalize the migration strategy.

Briefly this is how it works:

There are two routers running at the same time: Angular 1 Router and Angular 2 Router. Both handle only a subset of the routes/URLs.

Say we are navigating to '/beasts/unicorn'.

1. The Angular 2 Router will receive a location change. It'll use the provided function to check if it should handle this URL.
The function will return 'false', so the Angular 2 router will do nothing.
2. The Angular 1 Router will render the unicorn component.

After that the user clicks on the link to navigate to '/fish/whale'.

1. The Angular 1 router will instantiate the ModuleRoot component with an outlet in it.
2. The Angular 2 router will receive a location change. It'll use the provided function to check if it should handle this URL.
The function will return 'true'. So the Angular 2 router will recognize the URL and will place the whale component into
the just created router outlet.

Next, the user navigates to '/fish/dolphin'.

1. The Angular 1 router will do nothing.
2. The Angular 2 router will receive a location change. It'll use the provided function to check if it should handle this URL.
The function will return 'true'. So the router will recognize the URL and will remove the whale component and will instantiate
the dolphin component into its place.

Finally, the user navigates to '/beasts/yale'.

1. The Angular 2 router will receive a location change. It'll use the provided function to check if it should handle this URL.
The function will return 'false'. So the router will set its current router state to the initial empty state and will update the URL.
2. The Angular 1 route will pick up the URL chagne. It'll remove the module root component and will instantiate the yale component in its place.


### Limitations

The limitation of this setup is that any URL is processed by either the Angular 1 router or the Angular 2 router. Is it always the case? If this is the case the migration can be a lot simpler. If not, we need to update the sample, so I can make the complex example work.




Notes for Victor:

1. We either need to go through initialNavigation or make setupLocationListener public.
2. angular 1 router should ignore "ng2" urls
3. Maybe make scheduleNavigation protected
4. ngUpgrade has a bug where factories are created in root zone and not angualr zone