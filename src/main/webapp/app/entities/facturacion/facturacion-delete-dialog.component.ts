import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacturacion } from 'app/shared/model/facturacion.model';
import { FacturacionService } from './facturacion.service';

@Component({
    selector: 'jhi-facturacion-delete-dialog',
    templateUrl: './facturacion-delete-dialog.component.html'
})
export class FacturacionDeleteDialogComponent {
    facturacion: IFacturacion;

    constructor(
        protected facturacionService: FacturacionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.facturacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'facturacionListModification',
                content: 'Deleted an facturacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-facturacion-delete-popup',
    template: ''
})
export class FacturacionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ facturacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FacturacionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.facturacion = facturacion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/facturacion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/facturacion', { outlets: { popup: null } }]);
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
