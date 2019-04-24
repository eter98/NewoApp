/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EspacioLibreUpdateComponent } from 'app/entities/espacio-libre/espacio-libre-update.component';
import { EspacioLibreService } from 'app/entities/espacio-libre/espacio-libre.service';
import { EspacioLibre } from 'app/shared/model/espacio-libre.model';

describe('Component Tests', () => {
    describe('EspacioLibre Management Update Component', () => {
        let comp: EspacioLibreUpdateComponent;
        let fixture: ComponentFixture<EspacioLibreUpdateComponent>;
        let service: EspacioLibreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EspacioLibreUpdateComponent]
            })
                .overrideTemplate(EspacioLibreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EspacioLibreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspacioLibreService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EspacioLibre(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.espacioLibre = entity;
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
                    const entity = new EspacioLibre();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.espacioLibre = entity;
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
