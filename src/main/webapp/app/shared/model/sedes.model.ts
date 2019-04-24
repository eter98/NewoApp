import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';
import { ILanding } from 'app/shared/model/landing.model';
import { ICiudad } from 'app/shared/model/ciudad.model';
import { IHostSede } from 'app/shared/model/host-sede.model';
import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';

export interface ISedes {
    id?: number;
    nombreSede?: number;
    coordenadaX?: number;
    coordenadaY?: number;
    direccion?: string;
    telefonoComunidad?: string;
    telefonoNegocio?: string;
    capacidadEspacioLibre?: number;
    descripcionSede?: any;
    horario?: string;
    imagen1ContentType?: string;
    imagen1?: any;
    imagen2ContentType?: string;
    imagen2?: any;
    espacioLibre?: IEspacioLibre;
    espaciosReserva?: IEspaciosReserva;
    landing?: ILanding;
    ciudad?: ICiudad;
    hostSedes?: IHostSede[];
    entradaMiembros?: IEntradaMiembros;
}

export class Sedes implements ISedes {
    constructor(
        public id?: number,
        public nombreSede?: number,
        public coordenadaX?: number,
        public coordenadaY?: number,
        public direccion?: string,
        public telefonoComunidad?: string,
        public telefonoNegocio?: string,
        public capacidadEspacioLibre?: number,
        public descripcionSede?: any,
        public horario?: string,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public espacioLibre?: IEspacioLibre,
        public espaciosReserva?: IEspaciosReserva,
        public landing?: ILanding,
        public ciudad?: ICiudad,
        public hostSedes?: IHostSede[],
        public entradaMiembros?: IEntradaMiembros
    ) {}
}
