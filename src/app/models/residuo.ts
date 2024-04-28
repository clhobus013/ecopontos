import { Categoria } from "./categoria";

export interface Residuo {
    descricao: string,
    icone: string,
    url_midia: string,
    recolhido_em_ecoponto: boolean,
    ativo: boolean,
    categorias: Categoria[],
}