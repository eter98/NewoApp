import { Moment } from 'moment';
import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { IMiembros } from 'app/shared/model/miembros.model';

export interface IReservas {
    id?: number;
    fechaEntrada?: Moment;
    horaEntrada?: string;
    fechaSalida?: Moment;
    horaSalida?: string;
    espaciosReserva?: IEspaciosReserva;
    entradaInvitados?: IEntradaInvitados[];
    registroCompras?: IRegistroCompra[];
    miembros?: IMiembros;
}

export class Reservas implements IReservas {
    constructor(
        public id?: number,
        public fechaEntrada?: Moment,
        public horaEntrada?: string,
        public fechaSalida?: Moment,
        public horaSalida?: string,
        public espaciosReserva?: IEspaciosReserva,
        public entradaInvitados?: IEntradaInvitados[],
        public registroCompras?: IRegistroCompra[],
        public miembros?: IMiembros
    ) {}
}
