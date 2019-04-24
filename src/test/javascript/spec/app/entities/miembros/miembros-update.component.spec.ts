/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { MiembrosUpdateComponent } from 'app/entities/miembros/miembros-update.component';
import { MiembrosService } from 'app/entities/miembros/miembros.service';
import { Miembros } from 'app/shared/model/miembros.model';

describe('Component Tests', () => {
    describe('Miembros Management Update Component', () => {
        let comp: MiembrosUpdateComponent;
        let fixture: ComponentFixture<MiembrosUpdateComponent>;
        let service: MiembrosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [MiembrosUpdateComponent]
            })
                .overrideTemplate(MiembrosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MiembrosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MiembrosService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Miembros(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.miembros = entity;
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
                    const entity = new Miembros();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.miembros = entity;
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
