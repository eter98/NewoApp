/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilEquipoEmpresaComponent } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa.component';
import { PerfilEquipoEmpresaService } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa.service';
import { PerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

describe('Component Tests', () => {
    describe('PerfilEquipoEmpresa Management Component', () => {
        let comp: PerfilEquipoEmpresaComponent;
        let fixture: ComponentFixture<PerfilEquipoEmpresaComponent>;
        let service: PerfilEquipoEmpresaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilEquipoEmpresaComponent],
                providers: []
            })
                .overrideTemplate(PerfilEquipoEmpresaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerfilEquipoEmpresaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilEquipoEmpresaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerfilEquipoEmpresa(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perfilEquipoEmpresas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
