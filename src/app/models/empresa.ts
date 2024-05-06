import { AceiteTermo } from "./aceiteTermo";
import { Ecoponto } from "./ecoponto";

export interface IEmpresa {
    nome_fantasia: string,
    razao_social: string,
    cnpj: string,
    nome_contato_responsavel: string,
    ramo_atuacao: string,
    telefone: string,
    email: string,
    rede_social: string,
    participacao_outros_projetos: boolean,
    descricao_outros_projetos: string,
    ecopontos: Ecoponto[]
}

export class Empresa {
    nome_fantasia: string = "";
    razao_social: string = "";
    cnpj: string = "";
    nome_contato_responsavel: string = "";
    ramo_atuacao: string = "";
    telefone: string = "";
    email: string = "";
    rede_social: string = "";
    participacao_outros_projetos: boolean = false;
    descricao_outros_projetos: string = "";
    aceite_termo: AceiteTermo[] = [];
    // ecopontos: Ecoponto[] = [];

    constructor(init?: Partial<Empresa>) {
        Object.assign(this, init);
    }

}