/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { HostSedeUpdateComponent } from 'app/entities/host-sede/host-sede-update.component';
import { HostSedeService } from 'app/entities/host-sede/host-sede.service';
import { HostSede } from 'app/shared/model/host-sede.model';

describe('Component Tests', () => {
    describe('HostSede Management Update Component', () => {
        let comp: HostSedeUpdateComponent;
        let fixture: ComponentFixture<HostSedeUpdateComponent>;
        let service: HostSedeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [HostSedeUpdateComponent]
            })
                .overrideTemplate(HostSedeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HostSedeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HostSedeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HostSede(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hostSede = entity;
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
                    const entity = new HostSede();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hostSede = entity;
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
