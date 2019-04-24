import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { NewoAppSharedModule } from 'app/shared';
import {
    PerfilMiembroComponent,
    PerfilMiembroDetailComponent,
    PerfilMiembroUpdateComponent,
    PerfilMiembroDeletePopupComponent,
    PerfilMiembroDeleteDialogComponent,
    perfilMiembroRoute,
    perfilMiembroPopupRoute
} from './';

const ENTITY_STATES = [...perfilMiembroRoute, ...perfilMiembroPopupRoute];

@NgModule({
    imports: [NewoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerfilMiembroComponent,
        PerfilMiembroDetailComponent,
        PerfilMiembroUpdateComponent,
        PerfilMiembroDeleteDialogComponent,
        PerfilMiembroDeletePopupComponent
    ],
    entryComponents: [
        PerfilMiembroComponent,
        PerfilMiembroUpdateComponent,
        PerfilMiembroDeleteDialogComponent,
        PerfilMiembroDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewoAppPerfilMiembroModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
