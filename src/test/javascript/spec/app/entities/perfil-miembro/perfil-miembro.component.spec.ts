/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilMiembroComponent } from 'app/entities/perfil-miembro/perfil-miembro.component';
import { PerfilMiembroService } from 'app/entities/perfil-miembro/perfil-miembro.service';
import { PerfilMiembro } from 'app/shared/model/perfil-miembro.model';

describe('Component Tests', () => {
    describe('PerfilMiembro Management Component', () => {
        let comp: PerfilMiembroComponent;
        let fixture: ComponentFixture<PerfilMiembroComponent>;
        let service: PerfilMiembroService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilMiembroComponent],
                providers: []
            })
                .overrideTemplate(PerfilMiembroComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerfilMiembroComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilMiembroService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerfilMiembro(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perfilMiembros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
