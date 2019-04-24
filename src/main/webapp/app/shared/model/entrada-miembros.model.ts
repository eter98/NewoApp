import { Moment } from 'moment';
import { ISedes } from 'app/shared/model/sedes.model';
import { IMiembros } from 'app/shared/model/miembros.model';

export interface IEntradaMiembros {
    id?: number;
    fechaEntrada?: Moment;
    fechaSalida?: Moment;
    sedes?: ISedes;
    miembros?: IMiembros;
}

export class EntradaMiembros implements IEntradaMiembros {
    constructor(
        public id?: number,
        public fechaEntrada?: Moment,
        public fechaSalida?: Moment,
        public sedes?: ISedes,
        public miembros?: IMiembros
    ) {}
}
