import { ILanding } from 'app/shared/model/landing.model';

export interface ITarifaLanding {
    id?: number;
    tarifaPuestoMes?: number;
    landing?: ILanding;
}

export class TarifaLanding implements ITarifaLanding {
    constructor(public id?: number, public tarifaPuestoMes?: number, public landing?: ILanding) {}
}
