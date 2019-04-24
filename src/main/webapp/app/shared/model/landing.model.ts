import { ITarifaLanding } from 'app/shared/model/tarifa-landing.model';
import { ISedes } from 'app/shared/model/sedes.model';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

export interface ILanding {
    id?: number;
    descripcion?: string;
    telefonoNegocio?: string;
    numeroPuestos?: number;
    numeroOficinas?: number;
    tarifaLandings?: ITarifaLanding[];
    sedes?: ISedes;
    equipoEmpresas?: IEquipoEmpresas;
}

export class Landing implements ILanding {
    constructor(
        public id?: number,
        public descripcion?: string,
        public telefonoNegocio?: string,
        public numeroPuestos?: number,
        public numeroOficinas?: number,
        public tarifaLandings?: ITarifaLanding[],
        public sedes?: ISedes,
        public equipoEmpresas?: IEquipoEmpresas
    ) {}
}
