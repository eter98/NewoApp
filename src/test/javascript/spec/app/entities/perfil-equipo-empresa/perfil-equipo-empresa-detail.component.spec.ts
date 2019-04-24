/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilEquipoEmpresaDetailComponent } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa-detail.component';
import { PerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

describe('Component Tests', () => {
    describe('PerfilEquipoEmpresa Management Detail Component', () => {
        let comp: PerfilEquipoEmpresaDetailComponent;
        let fixture: ComponentFixture<PerfilEquipoEmpresaDetailComponent>;
        const route = ({ data: of({ perfilEquipoEmpresa: new PerfilEquipoEmpresa(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilEquipoEmpresaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerfilEquipoEmpresaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerfilEquipoEmpresaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perfilEquipoEmpresa).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
