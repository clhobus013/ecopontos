import { IconName } from "@fortawesome/fontawesome-common-types";
import { Categoria } from "./categoria";

export class Residuo {
    id: number = -1;
    descricao: string|null = null;
    icone: IconName = "trash";
    urlMidia: string|null = null;
    recolhidoEcoponto: boolean = false;
    ativo: boolean = false;
    categorias: Categoria[] = [];

    constructor(init?: Partial<Residuo>) {
        Object.assign(this, init);
    }
}