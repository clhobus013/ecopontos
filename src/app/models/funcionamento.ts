import { DiasFuncionamento } from "./diasFuncionamento";

export class Funcionamento {
    id: number = 0;
    diaSemana: string|null = null;
    horaInicial: string = "";
    horaFinal: string = "";

    constructor(init?: Partial<Funcionamento>) {
        Object.assign(this, init);
    }

    getFuncionamentoFormatadoApi() {
        return {
            dia_semana: this.diaSemana,
            hora_inicial: this.horaInicial,
            hora_final: this.horaFinal
        };
    }
}