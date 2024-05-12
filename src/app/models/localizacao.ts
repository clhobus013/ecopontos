export class Localizacao {
    rua: string = "";
    numero: string = "";
    bairro: string = "";
    cep: string = "";
    cidade: string = "";
    estado: string = "";
    complemento: string = "";
    latitude: string = "";
    longitude: string = "";
    // url_localizacao: string,

    constructor(init?: Partial<Localizacao>) {
        Object.assign(this, init);
    }
}