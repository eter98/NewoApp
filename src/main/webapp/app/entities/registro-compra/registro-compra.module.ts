import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { NewoAppSharedModule } from 'app/shared';
import {
    RegistroCompraComponent,
    RegistroCompraDetailComponent,
    RegistroCompraUpdateComponent,
    RegistroCompraDeletePopupComponent,
    RegistroCompraDeleteDialogComponent,
    registroCompraRoute,
    registroCompraPopupRoute
} from './';

const ENTITY_STATES = [...registroCompraRoute, ...registroCompraPopupRoute];

@NgModule({
    imports: [NewoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RegistroCompraComponent,
        RegistroCompraDetailComponent,
        RegistroCompraUpdateComponent,
        RegistroCompraDeleteDialogComponent,
        RegistroCompraDeletePopupComponent
    ],
    entryComponents: [
        RegistroCompraComponent,
        RegistroCompraUpdateComponent,
        RegistroCompraDeleteDialogComponent,
        RegistroCompraDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewoAppRegistroCompraModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
