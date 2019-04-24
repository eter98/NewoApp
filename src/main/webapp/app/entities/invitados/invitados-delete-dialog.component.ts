import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvitados } from 'app/shared/model/invitados.model';
import { InvitadosService } from './invitados.service';

@Component({
    selector: 'jhi-invitados-delete-dialog',
    templateUrl: './invitados-delete-dialog.component.html'
})
export class InvitadosDeleteDialogComponent {
    invitados: IInvitados;

    constructor(
        protected invitadosService: InvitadosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invitadosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'invitadosListModification',
                content: 'Deleted an invitados'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invitados-delete-popup',
    template: ''
})
export class InvitadosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invitados }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InvitadosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.invitados = invitados;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/invitados', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/invitados', { outlets: { popup: null } }]);
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
