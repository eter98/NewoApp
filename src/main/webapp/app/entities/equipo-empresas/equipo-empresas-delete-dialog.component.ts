import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';
import { EquipoEmpresasService } from './equipo-empresas.service';

@Component({
    selector: 'jhi-equipo-empresas-delete-dialog',
    templateUrl: './equipo-empresas-delete-dialog.component.html'
})
export class EquipoEmpresasDeleteDialogComponent {
    equipoEmpresas: IEquipoEmpresas;

    constructor(
        protected equipoEmpresasService: EquipoEmpresasService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.equipoEmpresasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'equipoEmpresasListModification',
                content: 'Deleted an equipoEmpresas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-equipo-empresas-delete-popup',
    template: ''
})
export class EquipoEmpresasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ equipoEmpresas }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EquipoEmpresasDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.equipoEmpresas = equipoEmpresas;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/equipo-empresas', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/equipo-empresas', { outlets: { popup: null } }]);
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
