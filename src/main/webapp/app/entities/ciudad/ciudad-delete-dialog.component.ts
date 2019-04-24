import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICiudad } from 'app/shared/model/ciudad.model';
import { CiudadService } from './ciudad.service';

@Component({
    selector: 'jhi-ciudad-delete-dialog',
    templateUrl: './ciudad-delete-dialog.component.html'
})
export class CiudadDeleteDialogComponent {
    ciudad: ICiudad;

    constructor(protected ciudadService: CiudadService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ciudadService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ciudadListModification',
                content: 'Deleted an ciudad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ciudad-delete-popup',
    template: ''
})
export class CiudadDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ciudad }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CiudadDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ciudad = ciudad;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ciudad', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ciudad', { outlets: { popup: null } }]);
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
