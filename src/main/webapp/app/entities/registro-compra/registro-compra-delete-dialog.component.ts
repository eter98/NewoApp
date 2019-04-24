import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { RegistroCompraService } from './registro-compra.service';

@Component({
    selector: 'jhi-registro-compra-delete-dialog',
    templateUrl: './registro-compra-delete-dialog.component.html'
})
export class RegistroCompraDeleteDialogComponent {
    registroCompra: IRegistroCompra;

    constructor(
        protected registroCompraService: RegistroCompraService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registroCompraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'registroCompraListModification',
                content: 'Deleted an registroCompra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registro-compra-delete-popup',
    template: ''
})
export class RegistroCompraDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ registroCompra }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RegistroCompraDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.registroCompra = registroCompra;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/registro-compra', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/registro-compra', { outlets: { popup: null } }]);
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
