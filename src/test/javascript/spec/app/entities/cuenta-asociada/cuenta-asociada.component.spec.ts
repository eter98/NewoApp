/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { CuentaAsociadaComponent } from 'app/entities/cuenta-asociada/cuenta-asociada.component';
import { CuentaAsociadaService } from 'app/entities/cuenta-asociada/cuenta-asociada.service';
import { CuentaAsociada } from 'app/shared/model/cuenta-asociada.model';

describe('Component Tests', () => {
    describe('CuentaAsociada Management Component', () => {
        let comp: CuentaAsociadaComponent;
        let fixture: ComponentFixture<CuentaAsociadaComponent>;
        let service: CuentaAsociadaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [CuentaAsociadaComponent],
                providers: []
            })
                .overrideTemplate(CuentaAsociadaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CuentaAsociadaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CuentaAsociadaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CuentaAsociada(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cuentaAsociadas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
