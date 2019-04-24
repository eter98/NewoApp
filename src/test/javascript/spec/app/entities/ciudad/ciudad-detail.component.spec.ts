/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { CiudadDetailComponent } from 'app/entities/ciudad/ciudad-detail.component';
import { Ciudad } from 'app/shared/model/ciudad.model';

describe('Component Tests', () => {
    describe('Ciudad Management Detail Component', () => {
        let comp: CiudadDetailComponent;
        let fixture: ComponentFixture<CiudadDetailComponent>;
        const route = ({ data: of({ ciudad: new Ciudad(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [CiudadDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CiudadDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CiudadDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ciudad).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
