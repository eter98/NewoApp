/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { FacturacionDetailComponent } from 'app/entities/facturacion/facturacion-detail.component';
import { Facturacion } from 'app/shared/model/facturacion.model';

describe('Component Tests', () => {
    describe('Facturacion Management Detail Component', () => {
        let comp: FacturacionDetailComponent;
        let fixture: ComponentFixture<FacturacionDetailComponent>;
        const route = ({ data: of({ facturacion: new Facturacion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [FacturacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FacturacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FacturacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.facturacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
