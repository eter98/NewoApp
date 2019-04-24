/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { ProductosServiciosUpdateComponent } from 'app/entities/productos-servicios/productos-servicios-update.component';
import { ProductosServiciosService } from 'app/entities/productos-servicios/productos-servicios.service';
import { ProductosServicios } from 'app/shared/model/productos-servicios.model';

describe('Component Tests', () => {
    describe('ProductosServicios Management Update Component', () => {
        let comp: ProductosServiciosUpdateComponent;
        let fixture: ComponentFixture<ProductosServiciosUpdateComponent>;
        let service: ProductosServiciosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [ProductosServiciosUpdateComponent]
            })
                .overrideTemplate(ProductosServiciosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductosServiciosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosServiciosService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductosServicios(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productosServicios = entity;
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
                    const entity = new ProductosServicios();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productosServicios = entity;
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
