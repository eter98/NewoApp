import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBeneficio } from 'app/shared/model/beneficio.model';
import { BeneficioService } from './beneficio.service';

@Component({
    selector: 'jhi-beneficio-delete-dialog',
    templateUrl: './beneficio-delete-dialog.component.html'
})
export class BeneficioDeleteDialogComponent {
    beneficio: IBeneficio;

    constructor(
        protected beneficioService: BeneficioService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.beneficioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'beneficioListModification',
                content: 'Deleted an beneficio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-beneficio-delete-popup',
    template: ''
})
export class BeneficioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ beneficio }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BeneficioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.beneficio = beneficio;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/beneficio', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/beneficio', { outlets: { popup: null } }]);
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
