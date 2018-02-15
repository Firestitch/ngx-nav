import { OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { FsNavRouteHandleService } from '../../services';
export declare class FsScrollSaverComponent implements OnInit, OnDestroy {
    stack: FsNavRouteHandleService;
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    protected _routeScrollPositions: {
        [url: string]: number;
    }[];
    protected _subscriptions: Subscription[];
    constructor(stack: FsNavRouteHandleService, router: Router, activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
