/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilMiembroDetailComponent } from 'app/entities/perfil-miembro/perfil-miembro-detail.component';
import { PerfilMiembro } from 'app/shared/model/perfil-miembro.model';

describe('Component Tests', () => {
    describe('PerfilMiembro Management Detail Component', () => {
        let comp: PerfilMiembroDetailComponent;
        let fixture: ComponentFixture<PerfilMiembroDetailComponent>;
        const route = ({ data: of({ perfilMiembro: new PerfilMiembro(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilMiembroDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerfilMiembroDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerfilMiembroDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perfilMiembro).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
