import { IMiembros } from 'app/shared/model/miembros.model';
import { ISedes } from 'app/shared/model/sedes.model';

export interface IHostSede {
    id?: number;
    nombre?: string;
    miembros?: IMiembros;
    sedes?: ISedes;
}

export class HostSede implements IHostSede {
    constructor(public id?: number, public nombre?: string, public miembros?: IMiembros, public sedes?: ISedes) {}
}
