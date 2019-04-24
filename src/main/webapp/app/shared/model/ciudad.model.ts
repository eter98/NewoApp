import { ISedes } from 'app/shared/model/sedes.model';
import { IPais } from 'app/shared/model/pais.model';

export interface ICiudad {
    id?: number;
    nombreCiudad?: string;
    sedes?: ISedes;
    pais?: IPais;
}

export class Ciudad implements ICiudad {
    constructor(public id?: number, public nombreCiudad?: string, public sedes?: ISedes, public pais?: IPais) {}
}
