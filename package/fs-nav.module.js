"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var components_1 = require("./components");
var directives_1 = require("./directives");
var services_1 = require("./services");
var fs_nav_route_reuse_strategy_1 = require("./services/fs-nav-route-reuse.strategy");
var router_1 = require("@angular/router");
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
//# sourceMappingURL=fs-nav.module.js.map