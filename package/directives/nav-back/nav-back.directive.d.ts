import { Router } from '@angular/router';
import { FsNavRouteHandleService } from '../../services';
export declare class FsNavBackDirective {
    private _stack;
    private _router;
    constructor(_stack: FsNavRouteHandleService, _router: Router);
    click(): void;
}
