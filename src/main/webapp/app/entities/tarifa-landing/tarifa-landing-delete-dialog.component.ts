import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITarifaLanding } from 'app/shared/model/tarifa-landing.model';
import { TarifaLandingService } from './tarifa-landing.service';

@Component({
    selector: 'jhi-tarifa-landing-delete-dialog',
    templateUrl: './tarifa-landing-delete-dialog.component.html'
})
export class TarifaLandingDeleteDialogComponent {
    tarifaLanding: ITarifaLanding;

    constructor(
        protected tarifaLandingService: TarifaLandingService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tarifaLandingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tarifaLandingListModification',
                content: 'Deleted an tarifaLanding'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tarifa-landing-delete-popup',
    template: ''
})
export class TarifaLandingDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tarifaLanding }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TarifaLandingDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tarifaLanding = tarifaLanding;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tarifa-landing', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tarifa-landing', { outlets: { popup: null } }]);
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
