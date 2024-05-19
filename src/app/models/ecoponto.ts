import { DiasFuncionamento } from "./diasFuncionamento";
import { Empresa } from "./empresa";
import { Localizacao } from "./localizacao";
import { Residuo } from "./residuo";

export class Ecoponto {
    id: number = 0;
    nome: string = "";
    abertoPublico: boolean = true;
    situacao: string = "";
    dataInicio: string|null = null;
    dataFinal: string|null = null;
    ativo: boolean = true;
    empresa: Empresa|undefined;
    diasFuncionamento: DiasFuncionamento[] = [];
    residuos: Residuo[] = [];
    localizacao: Localizacao|undefined;

    constructor(init?: Partial<Ecoponto>) {
        Object.assign(this, init);
    }

    getEcopontoFormatadoApi() {
        return {
            nome: this.nome,
            ativo: this.ativo,
            aberto_publico: this.abertoPublico,
            empresa_id: this.empresa?.id,
            localizacao: [this.localizacao]
        };
    }
}