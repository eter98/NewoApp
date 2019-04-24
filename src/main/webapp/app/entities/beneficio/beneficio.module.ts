import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { NewoAppSharedModule } from 'app/shared';
import {
    BeneficioComponent,
    BeneficioDetailComponent,
    BeneficioUpdateComponent,
    BeneficioDeletePopupComponent,
    BeneficioDeleteDialogComponent,
    beneficioRoute,
    beneficioPopupRoute
} from './';

const ENTITY_STATES = [...beneficioRoute, ...beneficioPopupRoute];

@NgModule({
    imports: [NewoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BeneficioComponent,
        BeneficioDetailComponent,
        BeneficioUpdateComponent,
        BeneficioDeleteDialogComponent,
        BeneficioDeletePopupComponent
    ],
    entryComponents: [BeneficioComponent, BeneficioUpdateComponent, BeneficioDeleteDialogComponent, BeneficioDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewoAppBeneficioModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
