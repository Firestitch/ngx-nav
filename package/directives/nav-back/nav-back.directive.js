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
var services_1 = require("../../services");
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
//# sourceMappingURL=nav-back.directive.js.map