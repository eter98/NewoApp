import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITarifaLanding } from 'app/shared/model/tarifa-landing.model';
import { TarifaLandingService } from './tarifa-landing.service';
import { ILanding } from 'app/shared/model/landing.model';
import { LandingService } from 'app/entities/landing';

@Component({
    selector: 'jhi-tarifa-landing-update',
    templateUrl: './tarifa-landing-update.component.html'
})
export class TarifaLandingUpdateComponent implements OnInit {
    tarifaLanding: ITarifaLanding;
    isSaving: boolean;

    landings: ILanding[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tarifaLandingService: TarifaLandingService,
        protected landingService: LandingService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tarifaLanding }) => {
            this.tarifaLanding = tarifaLanding;
        });
        this.landingService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILanding[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILanding[]>) => response.body)
            )
            .subscribe((res: ILanding[]) => (this.landings = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tarifaLanding.id !== undefined) {
            this.subscribeToSaveResponse(this.tarifaLandingService.update(this.tarifaLanding));
        } else {
            this.subscribeToSaveResponse(this.tarifaLandingService.create(this.tarifaLanding));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarifaLanding>>) {
        result.subscribe((res: HttpResponse<ITarifaLanding>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLandingById(index: number, item: ILanding) {
        return item.id;
    }
}
