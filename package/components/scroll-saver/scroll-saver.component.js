"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/pairwise");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
var services_1 = require("../../services");
var FsScrollSaverComponent = (function () {
    function FsScrollSaverComponent(stack, router, activatedRoute) {
        this.stack = stack;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this._routeScrollPositions = [];
        this._subscriptions = [];
        this.stack.router = router;
    }
    FsScrollSaverComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscriptions.push(this.router.events.pairwise().subscribe(function (_a) {
            var prevRouteEvent = _a[0], currRouteEvent = _a[1];
            if (prevRouteEvent instanceof router_1.NavigationEnd && currRouteEvent instanceof router_1.NavigationStart) {
                _this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
            }
            if (currRouteEvent instanceof router_1.NavigationEnd) {
                window.scrollTo(0, _this._routeScrollPositions[currRouteEvent.url] || 0);
            }
        }));
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) {
            while (route.firstChild)
                route = route.firstChild;
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .subscribe(function (event) {
            _this.stack.setActivePath(event.snapshot);
        });
        this._subscriptions.push(this.stack.onStackReset.subscribe(function () {
            _this._routeScrollPositions = [];
        }));
    };
    FsScrollSaverComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    FsScrollSaverComponent = __decorate([
        core_1.Component({
            selector: 'fs-scroll-saver',
            template: ''
        }),
        __metadata("design:paramtypes", [services_1.FsNavRouteHandleService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], FsScrollSaverComponent);
    return FsScrollSaverComponent;
}());
exports.FsScrollSaverComponent = FsScrollSaverComponent;
//# sourceMappingURL=scroll-saver.component.js.map