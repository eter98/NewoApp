/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { LandingComponent } from 'app/entities/landing/landing.component';
import { LandingService } from 'app/entities/landing/landing.service';
import { Landing } from 'app/shared/model/landing.model';

describe('Component Tests', () => {
    describe('Landing Management Component', () => {
        let comp: LandingComponent;
        let fixture: ComponentFixture<LandingComponent>;
        let service: LandingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [LandingComponent],
                providers: []
            })
                .overrideTemplate(LandingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LandingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LandingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Landing(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.landings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
