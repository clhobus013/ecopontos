export class Permissoes {

    public static temPermissao(rules: string[], permissoesUsuario: string[]): boolean {

        var sucesso = false;
        rules.forEach((rule: string) => {
            if (permissoesUsuario.includes(rule)) {
                sucesso = true;
            }
        })

        return sucesso;
    }
}