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
    nomeFantasia: string|null = null;
    razaoSocial: string|null = null;
    cnpj: string|null = null;
    nomeContatoResponsavel: string|null = null;
    ramoAtuacao: string|null = null;
    telefone: string|null = null;
    email: string|null = null;
    senha: string|null = null;
    redeSocial: string|null = null;
    participacaoOutrosProjetos: boolean = false;
    descricaoOutrosProjetos: string|null = null;
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

    static formataApi(value: any) {
        return new Empresa(
            {
                nomeFantasia: value.nome_fantasia,
                razaoSocial: value.razao_social,
                cnpj: value.cnpj,
                nomeContatoResponsavel: value.nome_contato_responsavel,
                ramoAtuacao: value.ramo_atuacao,
                telefone: value.telefone,
                email: value.email,
                senha: value.senha,
                redeSocial: value.rede_social,
                participacaoOutrosProjetos: value.participacao_outros_projetos,
                descricaoOutrosProjetos: value.descricao_outros_projetos,
            }
        )
    }

}