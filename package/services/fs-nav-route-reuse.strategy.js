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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fs_nav_route_handle_service_1 = require("./fs-nav-route-handle.service");
var FsNavRouteReuseStrategy = (function () {
    function FsNavRouteReuseStrategy(stack) {
        this.resetStack = false;
        this.stack = stack;
    }
    FsNavRouteReuseStrategy.prototype.shouldDetach = function (route) {
        return !this.resetStack;
    };
    FsNavRouteReuseStrategy.prototype.store = function (route, handle) {
        var path = this.stack.getFullRoutePath(route);
        if (!this.resetStack) {
            this.stack.addHandler(path, handle);
        }
        else if (this.resetStack) {
            this.stack.resetStack();
            this.resetStack = false;
        }
    };
    FsNavRouteReuseStrategy.prototype.shouldAttach = function (route) {
        if (this.resetStack) {
            this.stack.resetStack();
            this.resetStack = false;
            return false;
        }
        else {
            var path = this.stack.getFullRoutePath(route);
            return !!this.stack.getHandler(path);
        }
    };
    FsNavRouteReuseStrategy.prototype.retrieve = function (route) {
        var path = this.stack.getFullRoutePath(route);
        if (!this.isResetTarget(route, path)) {
            return this.stack.getHandler(path);
        }
        else {
            return null;
        }
    };
    FsNavRouteReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        var path = this.stack.getFullRoutePath(curr);
        if (this.isResetTarget(curr, path)) {
            this.resetStack = true;
        }
        return future.routeConfig === curr.routeConfig;
    };
    FsNavRouteReuseStrategy.prototype.isResetTarget = function (route, path) {
        return route.data && route.data.fsNavRoot;
    };
    FsNavRouteReuseStrategy = __decorate([
        __param(0, core_1.Inject(fs_nav_route_handle_service_1.FsNavRouteHandleService)),
        __metadata("design:paramtypes", [Object])
    ], FsNavRouteReuseStrategy);
    return FsNavRouteReuseStrategy;
}());
exports.FsNavRouteReuseStrategy = FsNavRouteReuseStrategy;
//# sourceMappingURL=fs-nav-route-reuse.strategy.js.map