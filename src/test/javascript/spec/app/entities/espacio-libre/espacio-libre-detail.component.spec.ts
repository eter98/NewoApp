/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EspacioLibreDetailComponent } from 'app/entities/espacio-libre/espacio-libre-detail.component';
import { EspacioLibre } from 'app/shared/model/espacio-libre.model';

describe('Component Tests', () => {
    describe('EspacioLibre Management Detail Component', () => {
        let comp: EspacioLibreDetailComponent;
        let fixture: ComponentFixture<EspacioLibreDetailComponent>;
        const route = ({ data: of({ espacioLibre: new EspacioLibre(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EspacioLibreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EspacioLibreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspacioLibreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.espacioLibre).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
