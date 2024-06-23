import { DiasFuncionamento } from "./diasFuncionamento";
import { Empresa } from "./empresa";
import { Localizacao } from "./localizacao";
import { Residuo } from "./residuo";
import { Situacao } from "./situacao";

export class Ecoponto {
    id: number = 0;
    nome: string = "";
    abertoPublico: boolean = true;
    situacao: Situacao|undefined = undefined;
    dataInicio: string|null = null;
    dataFinal: string|null = null;
    ativo: boolean = true;
    empresa: Empresa|undefined;
    diasFuncionamento: DiasFuncionamento[] = [];
    funcionamento: string = "";
    residuo: Residuo[] = [];
    localizacao: Localizacao[]|undefined;
//   situacao_enum: NewType | null | undefined;

    constructor(init?: Partial<Ecoponto>) {
        Object.assign(this, init);
    }

    getEcopontoFormatadoApi() {
        return {
            nome: this.nome,
            ativo: this.ativo,
            aberto_publico: this.abertoPublico,
            empresa_id: this.empresa?.id,
            localizacao: [this.localizacao],
            residuo: this.residuo.filter((residuo) => residuo.ativo).map((residuo) => {return {id: residuo.id}})
        };
    }

    static formataApi(value: any) {
        return new Ecoponto(
            {
                id: value.id,
                nome: value.nome,
                abertoPublico: value.aberto_publico,
                situacao: new Situacao({
                    situacao: value.situacao,
                    situacaoEnum: value.situacao_enum
                }),
                ativo: value.ativo,
                localizacao: value.localizacao.map((localizacao: any)=> new Localizacao(localizacao))
            }
        )
    }
}