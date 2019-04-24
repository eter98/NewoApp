/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { SedesUpdateComponent } from 'app/entities/sedes/sedes-update.component';
import { SedesService } from 'app/entities/sedes/sedes.service';
import { Sedes } from 'app/shared/model/sedes.model';

describe('Component Tests', () => {
    describe('Sedes Management Update Component', () => {
        let comp: SedesUpdateComponent;
        let fixture: ComponentFixture<SedesUpdateComponent>;
        let service: SedesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [SedesUpdateComponent]
            })
                .overrideTemplate(SedesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SedesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SedesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sedes(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sedes = entity;
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
                    const entity = new Sedes();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sedes = entity;
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
