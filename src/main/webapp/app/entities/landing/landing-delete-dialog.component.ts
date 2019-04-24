import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILanding } from 'app/shared/model/landing.model';
import { LandingService } from './landing.service';

@Component({
    selector: 'jhi-landing-delete-dialog',
    templateUrl: './landing-delete-dialog.component.html'
})
export class LandingDeleteDialogComponent {
    landing: ILanding;

    constructor(protected landingService: LandingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.landingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'landingListModification',
                content: 'Deleted an landing'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-landing-delete-popup',
    template: ''
})
export class LandingDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ landing }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LandingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.landing = landing;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/landing', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/landing', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
