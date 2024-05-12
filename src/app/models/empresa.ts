import { AceiteTermo } from "./aceiteTermo";
import { Ecoponto } from "./ecoponto";

export interface IEmpresa {
    nomeFantasia: string,
    razaoSocial: string,
    cnpj: string,
    nomeContatoResponsavel: string,
    ramoAtuacao: string,
    telefone: string,
    email: string,
    redeSocial: string,
    participacaoOutrosProjetos: boolean,
    descricaoOutrosProjetos: string,
    ecopontos: Ecoponto[]
}

export class Empresa {
    id: number = 0;
    nomeFantasia: string = "";
    razaoSocial: string = "";
    cnpj: string = "";
    nomeContatoResponsavel: string = "";
    ramoAtuacao: string = "";
    telefone: string = "";
    email: string = "";
    senha: string = "";
    redeSocial: string = "";
    participacaoOutrosProjetos: boolean = false;
    descricaoOutrosProjetos: string = "";
    aceiteTermo: AceiteTermo[] = [];
    ecopontos: Ecoponto[] = [];

    constructor(init?: Partial<Empresa>) {
        Object.assign(this, init);
    }

    getEmpresaFormatadaApi() {
        return {
            nome_fantasia: this.nomeFantasia,
            razao_social: this.razaoSocial,
            cnpj: this.cnpj,
            nome_contato_responsavel: this.nomeContatoResponsavel,
            ramo_atuacao: this.ramoAtuacao,
            telefone: this.telefone,
            email: this.email,
            senha: this.senha,
            rede_social: this.redeSocial,
            participacao_outros_projetos: this.participacaoOutrosProjetos,
            descricao_outros_projetos: this.descricaoOutrosProjetos,
            aceite_termo: this.aceiteTermo.forEach((aceite: AceiteTermo)=> {
                return {
                termo_id: aceite.id,
                aceite: aceite.aceite
                }
            })
        }
    }

}