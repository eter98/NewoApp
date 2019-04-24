/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { TarifaLandingComponent } from 'app/entities/tarifa-landing/tarifa-landing.component';
import { TarifaLandingService } from 'app/entities/tarifa-landing/tarifa-landing.service';
import { TarifaLanding } from 'app/shared/model/tarifa-landing.model';

describe('Component Tests', () => {
    describe('TarifaLanding Management Component', () => {
        let comp: TarifaLandingComponent;
        let fixture: ComponentFixture<TarifaLandingComponent>;
        let service: TarifaLandingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [TarifaLandingComponent],
                providers: []
            })
                .overrideTemplate(TarifaLandingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TarifaLandingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TarifaLandingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TarifaLanding(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tarifaLandings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
