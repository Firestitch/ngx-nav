import { EventEmitter } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, Router } from '@angular/router';
export declare class FsNavRouteHandleService {
    onStackReset: EventEmitter<{}>;
    urlsStack: string[];
    urlsInfo: any[];
    private _activeRoutePath;
    private _isBackNavigated;
    private _handlers;
    private _router;
    constructor();
    readonly activeRoutePath: string;
    /**
     * Setter for router. We can't do @Inject because it will create recursive inject
     * @param {Router} value
     */
    router: Router;
    /**
     * Remove all information about stacked pages and handlers
     */
    resetStack(): void;
    /**
     * Get handler by path
     * @param {string} path
     * @returns {DetachedRouteHandle}
     */
    getHandler(path: string): DetachedRouteHandle;
    /**
     * Add route handler for path
     * @param {string} path
     * @param {DetachedRouteHandle} handler
     */
    addHandler(path: string, handler: DetachedRouteHandle): void;
    /**
     * Set active route path based on passed route path
     * @param {ActivatedRouteSnapshot} route
     */
    setActivePath(route: ActivatedRouteSnapshot): void;
    /**
     * Create empty router info if not exists
     */
    createActiveRouteInfo(): void;
    /**
     * Set title for current active page
     * @param title
     */
    setTitle(title: any): void;
    /**
     * Set action (function) for current active page
     * @param action
     */
    setAction(action: any): void;
    /**
     * Get active route info object for header.
     * @returns {any}
     */
    getActiveRouteInfo(): any;
    /**
     * Recursevly get full path for route
     * @param {ActivatedRouteSnapshot} route
     * @param {string} path
     * @returns {string}
     */
    getFullRoutePath(route: ActivatedRouteSnapshot, path?: string): any;
    goBack(): string;
    /**
     * Destroy component
     * @param {DetachedRouteHandle} handle
     */
    private deactivateOutlet(handle);
}
