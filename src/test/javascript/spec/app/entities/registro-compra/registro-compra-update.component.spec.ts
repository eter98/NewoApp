/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { RegistroCompraUpdateComponent } from 'app/entities/registro-compra/registro-compra-update.component';
import { RegistroCompraService } from 'app/entities/registro-compra/registro-compra.service';
import { RegistroCompra } from 'app/shared/model/registro-compra.model';

describe('Component Tests', () => {
    describe('RegistroCompra Management Update Component', () => {
        let comp: RegistroCompraUpdateComponent;
        let fixture: ComponentFixture<RegistroCompraUpdateComponent>;
        let service: RegistroCompraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [RegistroCompraUpdateComponent]
            })
                .overrideTemplate(RegistroCompraUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegistroCompraUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistroCompraService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RegistroCompra(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.registroCompra = entity;
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
                    const entity = new RegistroCompra();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.registroCompra = entity;
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
