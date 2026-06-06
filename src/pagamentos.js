export default class Pagamentos {
    #pagamentos

    constructor() {
        this.#pagamentos = [];
    }

    realizarPagamento(codigoDeBarras, empresa, valor) {
        this.#pagamentos.push({
            codigoDeBarras: codigoDeBarras,
            empresa: empresa,
            valor: valor
        });

        for (let i = 0; i < this.#pagamentos.length; i++) {
            if (this.#pagamentos[i].valor > 100.0) {
                this.#pagamentos[i].categoria = 'cara';
            } else {
                this.#pagamentos[i].categoria = 'padrão';
            }
        };
    }

    consultarUltimoPagamento() {
        return this.#pagamentos.at(-1);
    }
} 