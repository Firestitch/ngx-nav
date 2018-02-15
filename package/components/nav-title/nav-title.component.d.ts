import { OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../services';
import { Router } from '@angular/router';
export declare class FsNavTitleComponent implements OnInit {
    stack: FsNavRouteHandleService;
    router: Router;
    activeRouteInfo: any;
    constructor(stack: FsNavRouteHandleService, router: Router);
    ngOnInit(): void;
}
