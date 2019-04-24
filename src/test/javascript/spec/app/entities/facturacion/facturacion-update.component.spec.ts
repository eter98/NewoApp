/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { FacturacionUpdateComponent } from 'app/entities/facturacion/facturacion-update.component';
import { FacturacionService } from 'app/entities/facturacion/facturacion.service';
import { Facturacion } from 'app/shared/model/facturacion.model';

describe('Component Tests', () => {
    describe('Facturacion Management Update Component', () => {
        let comp: FacturacionUpdateComponent;
        let fixture: ComponentFixture<FacturacionUpdateComponent>;
        let service: FacturacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [FacturacionUpdateComponent]
            })
                .overrideTemplate(FacturacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FacturacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacturacionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Facturacion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.facturacion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Facturacion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.facturacion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
