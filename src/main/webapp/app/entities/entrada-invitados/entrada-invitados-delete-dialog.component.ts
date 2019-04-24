import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { EntradaInvitadosService } from './entrada-invitados.service';

@Component({
    selector: 'jhi-entrada-invitados-delete-dialog',
    templateUrl: './entrada-invitados-delete-dialog.component.html'
})
export class EntradaInvitadosDeleteDialogComponent {
    entradaInvitados: IEntradaInvitados;

    constructor(
        protected entradaInvitadosService: EntradaInvitadosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entradaInvitadosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'entradaInvitadosListModification',
                content: 'Deleted an entradaInvitados'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entrada-invitados-delete-popup',
    template: ''
})
export class EntradaInvitadosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entradaInvitados }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EntradaInvitadosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.entradaInvitados = entradaInvitados;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/entrada-invitados', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/entrada-invitados', { outlets: { popup: null } }]);
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
