import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { NewoAppSharedModule } from 'app/shared';
import {
    TarifaLandingComponent,
    TarifaLandingDetailComponent,
    TarifaLandingUpdateComponent,
    TarifaLandingDeletePopupComponent,
    TarifaLandingDeleteDialogComponent,
    tarifaLandingRoute,
    tarifaLandingPopupRoute
} from './';

const ENTITY_STATES = [...tarifaLandingRoute, ...tarifaLandingPopupRoute];

@NgModule({
    imports: [NewoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TarifaLandingComponent,
        TarifaLandingDetailComponent,
        TarifaLandingUpdateComponent,
        TarifaLandingDeleteDialogComponent,
        TarifaLandingDeletePopupComponent
    ],
    entryComponents: [
        TarifaLandingComponent,
        TarifaLandingUpdateComponent,
        TarifaLandingDeleteDialogComponent,
        TarifaLandingDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewoAppTarifaLandingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
