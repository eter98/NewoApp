/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { BeneficioComponent } from 'app/entities/beneficio/beneficio.component';
import { BeneficioService } from 'app/entities/beneficio/beneficio.service';
import { Beneficio } from 'app/shared/model/beneficio.model';

describe('Component Tests', () => {
    describe('Beneficio Management Component', () => {
        let comp: BeneficioComponent;
        let fixture: ComponentFixture<BeneficioComponent>;
        let service: BeneficioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [BeneficioComponent],
                providers: []
            })
                .overrideTemplate(BeneficioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BeneficioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BeneficioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Beneficio(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.beneficios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
