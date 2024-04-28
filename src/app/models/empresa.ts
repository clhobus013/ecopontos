import { AceiteTermo } from "./aceiteTermo";
import { Ecoponto } from "./ecoponto";

export interface IEmpresa {
    nome_fantasia: string,
    razao_social: string,
    cnpj: string,
    nome_cadastro_responsavel: string,
    ramo_atuacao: string,
    telefone: string,
    email: string,
    rede_social: string,
    participacao_outros_projetos: boolean,
    descricao_outros_projetos: string,
    ecopontos: Ecoponto[]
}

export class Empresa {
    _nome_fantasia: string;
    _razao_social: string;
    _cnpj: string;
    _nome_cadastro_responsavel: string;
    _ramo_atuacao: string;
    _telefone: string;
    _email: string;
    _rede_social: string;
    _participacao_outros_projetos: boolean;
    _descricao_outros_projetos: string;
    _aceite_termos: AceiteTermo[];
    _ecopontos: Ecoponto[];

    constructor(
        nome_fantasia: string,
        razao_social: string,
        cnpj: string,
        nome_cadastro_responsavel: string,
        ramo_atuacao: string,
        telefone: string,
        email: string,
        rede_social: string,
        participacao_outros_projetos: boolean,
        descricao_outros_projetos: string,
        aceite_termos: AceiteTermo[],
        ecopontos: Ecoponto[],
    ) {
        this._nome_fantasia = nome_fantasia;
        this._razao_social = razao_social;
        this._cnpj = cnpj;
        this._nome_cadastro_responsavel = nome_cadastro_responsavel;
        this._ramo_atuacao = ramo_atuacao;
        this._telefone = telefone;
        this._email = email;
        this._rede_social = rede_social;
        this._participacao_outros_projetos = participacao_outros_projetos;
        this._descricao_outros_projetos = descricao_outros_projetos;
        this._aceite_termos = aceite_termos;
        this._ecopontos = ecopontos;
    }

    get nome_fantasia(){ return this._nome_fantasia}
    get razao_social(){ return this._razao_social}
    get cnpj(){ return this._cnpj}
    get nome_cadastro_responsavel(){ return this._nome_cadastro_responsavel}
    get ramo_atuacao(){ return this._ramo_atuacao}
    get telefone(){ return this._telefone}
    get email(){ return this._email}
    get rede_social(){ return this._rede_social}
    get participacao_outros_projetos(){ return this._participacao_outros_projetos}
    get descricao_outros_projetos(){ return this._descricao_outros_projetos}
    get aceite_termos(){ return this._aceite_termos}
    get ecopontos(){ return this._ecopontos}

    set nome_fantasia(nome: string) {this._nome_fantasia = nome}
    set razao_social(razao_social: string) {this._razao_social = razao_social}
    set cnpj(cnpj: string) {this._cnpj = cnpj}
    set nome_cadastro_responsavel(nome_responsavel: string) {this._nome_cadastro_responsavel = nome_responsavel}
    set ramo_atuacao(ramo_atuacao: string) {this._ramo_atuacao = ramo_atuacao}
    set telefone(telefone: string) {this._telefone = telefone}
    set email(email: string) {this._email = email}
    set rede_social(rede_social: string) {this._rede_social = rede_social}
    set participacao_outros_projetos(participacao: boolean) {this._participacao_outros_projetos = participacao}
    set descricao_outros_projetos(descricao: string) {this._descricao_outros_projetos = descricao}
    set aceite_termos(aceite_termos: AceiteTermo[]) {this._aceite_termos = aceite_termos}
    set ecopontos(ecopontos: Ecoponto[]) {this._ecopontos = ecopontos}
}