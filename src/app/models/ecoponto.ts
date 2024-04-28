import { Localizacao } from "./localizacao";
import { Residuo } from "./residuo";

export interface Ecoponto {
    situacao: string,
    nome: string,
    ativo: boolean,
    aberto_publico: boolean,
    data_inicio: string,
    data_final: string,
    dia_funcionamento: string,
    residuos: Residuo[],
    localizacao: Localizacao,
    participacao_outros_projetos: boolean,
    descricao_outros_projetos: string,
}