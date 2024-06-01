import { Ecoponto } from "./ecoponto";

export class Situacao {
    situacao: string = "";
    situacaoEnum: string = "";
    aberto: boolean = true;
    selecionado: number = -1;
    ecopontos: Ecoponto[] = [];

    constructor(init?: Partial<Situacao>) {
        Object.assign(this, init);
    }
}