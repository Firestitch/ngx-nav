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
var FsNavRouteHandleService = (function () {
    function FsNavRouteHandleService() {
        this.onStackReset = new core_1.EventEmitter();
        this.urlsStack = [];
        this.urlsInfo = [];
        this._activeRoutePath = '';
        this._isBackNavigated = false;
        this._handlers = {};
    }
    Object.defineProperty(FsNavRouteHandleService.prototype, "activeRoutePath", {
        get: function () {
            return this._activeRoutePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsNavRouteHandleService.prototype, "router", {
        /**
         * Setter for router. We can't do @Inject because it will create recursive inject
         * @param {Router} value
         */
        set: function (value) {
            this._router = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove all information about stacked pages and handlers
     */
    FsNavRouteHandleService.prototype.resetStack = function () {
        for (var key in this._handlers) {
            if (this._handlers.hasOwnProperty(key)) {
                // Destroy component
                this.deactivateOutlet(this._handlers[key]);
            }
        }
        this._handlers = {};
        this.urlsStack.length = 0;
        this.urlsInfo.length = 0;
        this._isBackNavigated = false;
        this.onStackReset.next(true);
    };
    /**
     * Get handler by path
     * @param {string} path
     * @returns {DetachedRouteHandle}
     */
    FsNavRouteHandleService.prototype.getHandler = function (path) {
        return this._handlers[path];
    };
    /**
     * Add route handler for path
     * @param {string} path
     * @param {DetachedRouteHandle} handler
     */
    FsNavRouteHandleService.prototype.addHandler = function (path, handler) {
        if (this.urlsStack[this.urlsStack.length - 1] === path) {
            return;
        }
        if (this._isBackNavigated) {
            this._isBackNavigated = false;
            return;
        }
        this._handlers[path] = handler;
        this.urlsStack.push(path);
    };
    /**
     * Set active route path based on passed route path
     * @param {ActivatedRouteSnapshot} route
     */
    FsNavRouteHandleService.prototype.setActivePath = function (route) {
        this._activeRoutePath = this.getFullRoutePath(route);
    };
    /**
     * Create empty router info if not exists
     */
    FsNavRouteHandleService.prototype.createActiveRouteInfo = function () {
        if (!this.urlsInfo[this.activeRoutePath]) {
            this.urlsInfo[this.activeRoutePath] = {};
        }
    };
    /**
     * Set title for current active page
     * @param title
     */
    FsNavRouteHandleService.prototype.setTitle = function (title) {
        this.createActiveRouteInfo();
        this.urlsInfo[this.activeRoutePath].title = title;
    };
    /**
     * Set action (function) for current active page
     * @param action
     */
    FsNavRouteHandleService.prototype.setAction = function (action) {
        this.createActiveRouteInfo();
        this.urlsInfo[this.activeRoutePath].action = action;
    };
    /**
     * Get active route info object for header.
     * @returns {any}
     */
    FsNavRouteHandleService.prototype.getActiveRouteInfo = function () {
        this.createActiveRouteInfo();
        return this.urlsInfo[this.activeRoutePath];
    };
    /**
     * Recursevly get full path for route
     * @param {ActivatedRouteSnapshot} route
     * @param {string} path
     * @returns {string}
     */
    FsNavRouteHandleService.prototype.getFullRoutePath = function (route, path) {
        if (path === void 0) { path = ''; }
        if (route.parent !== null) {
            return this.getFullRoutePath(route.parent, path) + '/' + route.url.join('/');
        }
        else {
            return route.url.join('/');
        }
    };
    FsNavRouteHandleService.prototype.goBack = function () {
        if (this.urlsStack[this.urlsStack.length - 1] === this.activeRoutePath) {
            this.urlsStack.pop();
        }
        this._isBackNavigated = true;
        return this.urlsStack[this.urlsStack.length - 1] || '/';
    };
    /**
     * Destroy component
     * @param {DetachedRouteHandle} handle
     */
    FsNavRouteHandleService.prototype.deactivateOutlet = function (handle) {
        if (handle === null) {
            return;
        }
        var componentRef = handle['componentRef'];
        if (componentRef) {
            componentRef.destroy();
        }
    };
    FsNavRouteHandleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FsNavRouteHandleService);
    return FsNavRouteHandleService;
}());
exports.FsNavRouteHandleService = FsNavRouteHandleService;
//# sourceMappingURL=fs-nav-route-handle.service.js.map