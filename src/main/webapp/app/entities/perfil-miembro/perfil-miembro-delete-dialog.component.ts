import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';
import { PerfilMiembroService } from './perfil-miembro.service';

@Component({
    selector: 'jhi-perfil-miembro-delete-dialog',
    templateUrl: './perfil-miembro-delete-dialog.component.html'
})
export class PerfilMiembroDeleteDialogComponent {
    perfilMiembro: IPerfilMiembro;

    constructor(
        protected perfilMiembroService: PerfilMiembroService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perfilMiembroService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perfilMiembroListModification',
                content: 'Deleted an perfilMiembro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perfil-miembro-delete-popup',
    template: ''
})
export class PerfilMiembroDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perfilMiembro }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerfilMiembroDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.perfilMiembro = perfilMiembro;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/perfil-miembro', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/perfil-miembro', { outlets: { popup: null } }]);
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
