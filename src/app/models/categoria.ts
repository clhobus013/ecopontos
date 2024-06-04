export class Categoria {
    descricao: string = "";
    icone: string = "";

    constructor(init?: Partial<Categoria>) {
        Object.assign(this, init);
    }
}