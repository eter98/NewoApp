import { ISedes } from 'app/shared/model/sedes.model';
import { IMiembros } from 'app/shared/model/miembros.model';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';

export interface IEspacioLibre {
    id?: number;
    capacidadInstalada?: number;
    tipoDeEspacios?: number;
    wifi?: string;
    tarifa1hMiembro?: number;
    tarifa2hMiembro?: number;
    tarifa3hMiembro?: number;
    tarifa4hMiembro?: number;
    tarifa5hMiembro?: number;
    tarifa6hMiembro?: number;
    tarifa7hMiembro?: number;
    tarifa8hMiembro?: number;
    tarifa1hInvitado?: number;
    tarifa2hInvitado?: number;
    tarifa3hInvitado?: number;
    tarifa4hInvitado?: number;
    tarifa5hInvitado?: number;
    tarifa6hInvitado?: number;
    tarifa7hInvitado?: number;
    tarifa8hInvitado?: number;
    sedes?: ISedes;
    miembros?: IMiembros;
    entradaInvitados?: IEntradaInvitados;
    registroCompra?: IRegistroCompra;
}

export class EspacioLibre implements IEspacioLibre {
    constructor(
        public id?: number,
        public capacidadInstalada?: number,
        public tipoDeEspacios?: number,
        public wifi?: string,
        public tarifa1hMiembro?: number,
        public tarifa2hMiembro?: number,
        public tarifa3hMiembro?: number,
        public tarifa4hMiembro?: number,
        public tarifa5hMiembro?: number,
        public tarifa6hMiembro?: number,
        public tarifa7hMiembro?: number,
        public tarifa8hMiembro?: number,
        public tarifa1hInvitado?: number,
        public tarifa2hInvitado?: number,
        public tarifa3hInvitado?: number,
        public tarifa4hInvitado?: number,
        public tarifa5hInvitado?: number,
        public tarifa6hInvitado?: number,
        public tarifa7hInvitado?: number,
        public tarifa8hInvitado?: number,
        public sedes?: ISedes,
        public miembros?: IMiembros,
        public entradaInvitados?: IEntradaInvitados,
        public registroCompra?: IRegistroCompra
    ) {}
}
