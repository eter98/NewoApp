import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPais } from 'app/shared/model/pais.model';
import { PaisService } from './pais.service';

@Component({
    selector: 'jhi-pais-update',
    templateUrl: './pais-update.component.html'
})
export class PaisUpdateComponent implements OnInit {
    pais: IPais;
    isSaving: boolean;

    constructor(protected paisService: PaisService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pais }) => {
            this.pais = pais;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pais.id !== undefined) {
            this.subscribeToSaveResponse(this.paisService.update(this.pais));
        } else {
            this.subscribeToSaveResponse(this.paisService.create(this.pais));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPais>>) {
        result.subscribe((res: HttpResponse<IPais>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
