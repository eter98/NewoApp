/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { CuentaAsociadaDetailComponent } from 'app/entities/cuenta-asociada/cuenta-asociada-detail.component';
import { CuentaAsociada } from 'app/shared/model/cuenta-asociada.model';

describe('Component Tests', () => {
    describe('CuentaAsociada Management Detail Component', () => {
        let comp: CuentaAsociadaDetailComponent;
        let fixture: ComponentFixture<CuentaAsociadaDetailComponent>;
        const route = ({ data: of({ cuentaAsociada: new CuentaAsociada(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [CuentaAsociadaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CuentaAsociadaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CuentaAsociadaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cuentaAsociada).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
