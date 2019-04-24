/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { LandingUpdateComponent } from 'app/entities/landing/landing-update.component';
import { LandingService } from 'app/entities/landing/landing.service';
import { Landing } from 'app/shared/model/landing.model';

describe('Component Tests', () => {
    describe('Landing Management Update Component', () => {
        let comp: LandingUpdateComponent;
        let fixture: ComponentFixture<LandingUpdateComponent>;
        let service: LandingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [LandingUpdateComponent]
            })
                .overrideTemplate(LandingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LandingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LandingService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Landing(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.landing = entity;
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
                    const entity = new Landing();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.landing = entity;
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
