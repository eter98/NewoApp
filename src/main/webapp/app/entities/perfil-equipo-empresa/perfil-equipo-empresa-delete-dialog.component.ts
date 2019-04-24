import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';
import { PerfilEquipoEmpresaService } from './perfil-equipo-empresa.service';

@Component({
    selector: 'jhi-perfil-equipo-empresa-delete-dialog',
    templateUrl: './perfil-equipo-empresa-delete-dialog.component.html'
})
export class PerfilEquipoEmpresaDeleteDialogComponent {
    perfilEquipoEmpresa: IPerfilEquipoEmpresa;

    constructor(
        protected perfilEquipoEmpresaService: PerfilEquipoEmpresaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perfilEquipoEmpresaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perfilEquipoEmpresaListModification',
                content: 'Deleted an perfilEquipoEmpresa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perfil-equipo-empresa-delete-popup',
    template: ''
})
export class PerfilEquipoEmpresaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perfilEquipoEmpresa }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerfilEquipoEmpresaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.perfilEquipoEmpresa = perfilEquipoEmpresa;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/perfil-equipo-empresa', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/perfil-equipo-empresa', { outlets: { popup: null } }]);
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
