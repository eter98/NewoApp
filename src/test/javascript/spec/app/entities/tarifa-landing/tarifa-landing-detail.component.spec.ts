/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { TarifaLandingDetailComponent } from 'app/entities/tarifa-landing/tarifa-landing-detail.component';
import { TarifaLanding } from 'app/shared/model/tarifa-landing.model';

describe('Component Tests', () => {
    describe('TarifaLanding Management Detail Component', () => {
        let comp: TarifaLandingDetailComponent;
        let fixture: ComponentFixture<TarifaLandingDetailComponent>;
        const route = ({ data: of({ tarifaLanding: new TarifaLanding(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [TarifaLandingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TarifaLandingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TarifaLandingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tarifaLanding).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
