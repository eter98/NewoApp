/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { ReservasUpdateComponent } from 'app/entities/reservas/reservas-update.component';
import { ReservasService } from 'app/entities/reservas/reservas.service';
import { Reservas } from 'app/shared/model/reservas.model';

describe('Component Tests', () => {
    describe('Reservas Management Update Component', () => {
        let comp: ReservasUpdateComponent;
        let fixture: ComponentFixture<ReservasUpdateComponent>;
        let service: ReservasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [ReservasUpdateComponent]
            })
                .overrideTemplate(ReservasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReservasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservasService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Reservas(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reservas = entity;
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
                    const entity = new Reservas();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reservas = entity;
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
