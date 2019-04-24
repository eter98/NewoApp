/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { MiembrosDetailComponent } from 'app/entities/miembros/miembros-detail.component';
import { Miembros } from 'app/shared/model/miembros.model';

describe('Component Tests', () => {
    describe('Miembros Management Detail Component', () => {
        let comp: MiembrosDetailComponent;
        let fixture: ComponentFixture<MiembrosDetailComponent>;
        const route = ({ data: of({ miembros: new Miembros(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [MiembrosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MiembrosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MiembrosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.miembros).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
