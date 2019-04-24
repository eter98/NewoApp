/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { RegistroCompraDetailComponent } from 'app/entities/registro-compra/registro-compra-detail.component';
import { RegistroCompra } from 'app/shared/model/registro-compra.model';

describe('Component Tests', () => {
    describe('RegistroCompra Management Detail Component', () => {
        let comp: RegistroCompraDetailComponent;
        let fixture: ComponentFixture<RegistroCompraDetailComponent>;
        const route = ({ data: of({ registroCompra: new RegistroCompra(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [RegistroCompraDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RegistroCompraDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegistroCompraDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.registroCompra).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
