import { ISedes } from 'app/shared/model/sedes.model';
import { IReservas } from 'app/shared/model/reservas.model';

export interface IEspaciosReserva {
    id?: number;
    nombre?: string;
    descripcion?: string;
    facilidades?: string;
    capacidad?: number;
    tarifa1Hora?: number;
    tarifa2Hora?: number;
    tarifa3Hora?: number;
    tarifa4Hora?: number;
    tarifa5Hora?: number;
    tarifa6Hora?: number;
    tarifa7Hora?: number;
    tarifa8Hora?: number;
    horario?: string;
    wifi?: string;
    sedes?: ISedes;
    reservas?: IReservas;
}

export class EspaciosReserva implements IEspaciosReserva {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public facilidades?: string,
        public capacidad?: number,
        public tarifa1Hora?: number,
        public tarifa2Hora?: number,
        public tarifa3Hora?: number,
        public tarifa4Hora?: number,
        public tarifa5Hora?: number,
        public tarifa6Hora?: number,
        public tarifa7Hora?: number,
        public tarifa8Hora?: number,
        public horario?: string,
        public wifi?: string,
        public sedes?: ISedes,
        public reservas?: IReservas
    ) {}
}
