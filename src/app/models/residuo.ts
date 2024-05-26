import { Categoria } from "./categoria";

export class Residuo {
    descricao: string|null = null;
    icone: string|null = null;
    urlMidia: string|null = null;
    recolhidoEcoponto: boolean = false;
    ativo: boolean = false;
    categorias: Categoria[] = [];

    constructor(init?: Partial<Residuo>) {
        Object.assign(this, init);
    }
}