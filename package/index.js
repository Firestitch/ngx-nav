(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/router"), require("rxjs/add/operator/pairwise"), require("rxjs/add/operator/filter"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define("@firestitch/nav", ["@angular/core", "@angular/router", "rxjs/add/operator/pairwise", "rxjs/add/operator/filter", "rxjs/add/operator/map", "rxjs/add/operator/mergeMap", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["@firestitch/nav"] = factory(require("@angular/core"), require("@angular/router"), require("rxjs/add/operator/pairwise"), require("rxjs/add/operator/filter"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"), require("@angular/common"));
	else
		root["@firestitch/nav"] = factory(root["@angular/core"], root["@angular/router"], root["rxjs/add/operator/pairwise"], root["rxjs/add/operator/filter"], root["rxjs/add/operator/map"], root["rxjs/add/operator/mergeMap"], root["@angular/common"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__angular_core__, __WEBPACK_EXTERNAL_MODULE__angular_router__, __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_pairwise__, __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_filter__, __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_map__, __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_mergeMap__, __WEBPACK_EXTERNAL_MODULE__angular_common__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./components/scroll-saver/index.ts"));
__export(__webpack_require__("./components/nav-title/index.ts"));


/***/ }),

/***/ "./components/nav-title/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./components/nav-title/nav-title.component.ts"));


/***/ }),

/***/ "./components/nav-title/nav-title.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var services_1 = __webpack_require__("./services/index.ts");
var router_1 = __webpack_require__("@angular/router");
var FsNavTitleComponent = (function () {
    function FsNavTitleComponent(stack, router) {
        this.stack = stack;
        this.router = router;
    }
    FsNavTitleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function () {
            _this.activeRouteInfo = _this.stack.getActiveRouteInfo();
        });
    };
    FsNavTitleComponent = __decorate([
        core_1.Component({
            selector: '[fsNavTitle]',
            template: '{{ activeRouteInfo?.title }}'
        }),
        __metadata("design:paramtypes", [services_1.FsNavRouteHandleService, router_1.Router])
    ], FsNavTitleComponent);
    return FsNavTitleComponent;
}());
exports.FsNavTitleComponent = FsNavTitleComponent;


/***/ }),

/***/ "./components/scroll-saver/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./components/scroll-saver/scroll-saver.component.ts"));


/***/ }),

/***/ "./components/scroll-saver/scroll-saver.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var router_1 = __webpack_require__("@angular/router");
__webpack_require__("rxjs/add/operator/pairwise");
__webpack_require__("rxjs/add/operator/filter");
__webpack_require__("rxjs/add/operator/map");
__webpack_require__("rxjs/add/operator/mergeMap");
var services_1 = __webpack_require__("./services/index.ts");
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


/***/ }),

/***/ "./directives/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./directives/nav-action/index.ts"));
__export(__webpack_require__("./directives/nav-back/index.ts"));


/***/ }),

/***/ "./directives/nav-action/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./directives/nav-action/nav-action.directive.ts"));


/***/ }),

/***/ "./directives/nav-action/nav-action.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var services_1 = __webpack_require__("./services/index.ts");
var FsNavActionDirective = (function () {
    function FsNavActionDirective(_stack) {
        this._stack = _stack;
    }
    FsNavActionDirective.prototype.click = function () {
        var info = this._stack.getActiveRouteInfo();
        if (info && info.action) {
            info.action();
        }
    };
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FsNavActionDirective.prototype, "click", null);
    FsNavActionDirective = __decorate([
        core_1.Directive({
            selector: '[fsNavAction]'
        }),
        __metadata("design:paramtypes", [services_1.FsNavRouteHandleService])
    ], FsNavActionDirective);
    return FsNavActionDirective;
}());
exports.FsNavActionDirective = FsNavActionDirective;


/***/ }),

/***/ "./directives/nav-back/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./directives/nav-back/nav-back.directive.ts"));


/***/ }),

/***/ "./directives/nav-back/nav-back.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var router_1 = __webpack_require__("@angular/router");
var services_1 = __webpack_require__("./services/index.ts");
var FsNavBackDirective = (function () {
    function FsNavBackDirective(_stack, _router) {
        this._stack = _stack;
        this._router = _router;
    }
    FsNavBackDirective.prototype.click = function () {
        this._router.navigateByUrl(this._stack.goBack());
    };
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FsNavBackDirective.prototype, "click", null);
    FsNavBackDirective = __decorate([
        core_1.Directive({
            selector: '[fsNavBack]'
        }),
        __metadata("design:paramtypes", [services_1.FsNavRouteHandleService, router_1.Router])
    ], FsNavBackDirective);
    return FsNavBackDirective;
}());
exports.FsNavBackDirective = FsNavBackDirective;


/***/ }),

/***/ "./fs-nav.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var common_1 = __webpack_require__("@angular/common");
var components_1 = __webpack_require__("./components/index.ts");
var directives_1 = __webpack_require__("./directives/index.ts");
var services_1 = __webpack_require__("./services/index.ts");
var fs_nav_route_reuse_strategy_1 = __webpack_require__("./services/fs-nav-route-reuse.strategy.ts");
var router_1 = __webpack_require__("@angular/router");
var FsNavModule = (function () {
    function FsNavModule() {
    }
    FsNavModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
            ],
            exports: [
                components_1.FsScrollSaverComponent,
                components_1.FsNavTitleComponent,
                directives_1.FsNavActionDirective,
                directives_1.FsNavBackDirective,
            ],
            entryComponents: [],
            declarations: [
                components_1.FsScrollSaverComponent,
                components_1.FsNavTitleComponent,
                directives_1.FsNavActionDirective,
                directives_1.FsNavBackDirective,
            ],
            providers: [
                services_1.FsNavRouteHandleService,
                {
                    provide: router_1.RouteReuseStrategy, useClass: fs_nav_route_reuse_strategy_1.FsNavRouteReuseStrategy
                }
            ],
        })
    ], FsNavModule);
    return FsNavModule;
}());
exports.FsNavModule = FsNavModule;


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./fs-nav.module.ts"));
__export(__webpack_require__("./components/index.ts"));
__export(__webpack_require__("./services/index.ts"));
__export(__webpack_require__("./directives/index.ts"));


/***/ }),

/***/ "./services/fs-nav-route-handle.service.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
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


/***/ }),

/***/ "./services/fs-nav-route-reuse.strategy.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var fs_nav_route_handle_service_1 = __webpack_require__("./services/fs-nav-route-handle.service.ts");
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


/***/ }),

/***/ "./services/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./services/fs-nav-route-handle.service.ts"));
__export(__webpack_require__("./services/fs-nav-route-reuse.strategy.ts"));


/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_common__;

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_core__;

/***/ }),

/***/ "@angular/router":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_router__;

/***/ }),

/***/ "rxjs/add/operator/filter":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_filter__;

/***/ }),

/***/ "rxjs/add/operator/map":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_map__;

/***/ }),

/***/ "rxjs/add/operator/mergeMap":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_mergeMap__;

/***/ }),

/***/ "rxjs/add/operator/pairwise":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_add_operator_pairwise__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map