import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICuentaAsociada } from 'app/shared/model/cuenta-asociada.model';
import { CuentaAsociadaService } from './cuenta-asociada.service';

@Component({
    selector: 'jhi-cuenta-asociada-delete-dialog',
    templateUrl: './cuenta-asociada-delete-dialog.component.html'
})
export class CuentaAsociadaDeleteDialogComponent {
    cuentaAsociada: ICuentaAsociada;

    constructor(
        protected cuentaAsociadaService: CuentaAsociadaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cuentaAsociadaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cuentaAsociadaListModification',
                content: 'Deleted an cuentaAsociada'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cuenta-asociada-delete-popup',
    template: ''
})
export class CuentaAsociadaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cuentaAsociada }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CuentaAsociadaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.cuentaAsociada = cuentaAsociada;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/cuenta-asociada', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/cuenta-asociada', { outlets: { popup: null } }]);
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
