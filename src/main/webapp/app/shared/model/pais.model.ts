import { ICiudad } from 'app/shared/model/ciudad.model';

export interface IPais {
    id?: number;
    nombrePais?: string;
    ciudads?: ICiudad[];
}

export class Pais implements IPais {
    constructor(public id?: number, public nombrePais?: string, public ciudads?: ICiudad[]) {}
}
