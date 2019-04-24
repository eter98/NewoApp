/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { SedesComponent } from 'app/entities/sedes/sedes.component';
import { SedesService } from 'app/entities/sedes/sedes.service';
import { Sedes } from 'app/shared/model/sedes.model';

describe('Component Tests', () => {
    describe('Sedes Management Component', () => {
        let comp: SedesComponent;
        let fixture: ComponentFixture<SedesComponent>;
        let service: SedesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [SedesComponent],
                providers: []
            })
                .overrideTemplate(SedesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SedesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SedesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Sedes(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sedes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
