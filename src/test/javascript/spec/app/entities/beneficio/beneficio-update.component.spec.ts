/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { BeneficioUpdateComponent } from 'app/entities/beneficio/beneficio-update.component';
import { BeneficioService } from 'app/entities/beneficio/beneficio.service';
import { Beneficio } from 'app/shared/model/beneficio.model';

describe('Component Tests', () => {
    describe('Beneficio Management Update Component', () => {
        let comp: BeneficioUpdateComponent;
        let fixture: ComponentFixture<BeneficioUpdateComponent>;
        let service: BeneficioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [BeneficioUpdateComponent]
            })
                .overrideTemplate(BeneficioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BeneficioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BeneficioService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Beneficio(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.beneficio = entity;
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
                    const entity = new Beneficio();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.beneficio = entity;
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
