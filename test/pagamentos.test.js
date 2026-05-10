import Pagamentos from '../src/pagamentos.js';
import assert from 'node:assert';

describe('Suite de Teste - Pagamentos', () => {
    it('Validar que a categoria do pagamento é "cara"', () => {
        //Assert
        const pagamentos = new Pagamentos();
        const codigoDeBarras = '7 891234 567890';
        const empresa = 'Enel';
        const valor = 100.01;
        const categoriaEsperada = 'cara';

        //Act
        pagamentos.realizarPagamento(codigoDeBarras, empresa, valor);
        const ultimoPagamento = pagamentos.consultarUltimoPagamento();
        console.log(ultimoPagamento);

        //Assert
        assert.equal(ultimoPagamento.codigoDeBarras, codigoDeBarras);
        assert.equal(ultimoPagamento.empresa, empresa);
        assert.equal(ultimoPagamento.valor, valor);
        assert.equal(ultimoPagamento.categoria, categoriaEsperada);
    });

    it('Validar que a categoria do pagamento é "padrão"', () => {
        //Arrast
        const pagamentos = new Pagamentos();
        const codigoDeBarras = '0 000000 000007';
        const empresa = 'Sabesp';
        const valor = 100.00;
        const categoriaEsperada = 'padrão';

        //Act
        pagamentos.realizarPagamento(codigoDeBarras, empresa, valor);
        const ultimoPagamento = pagamentos.consultarUltimoPagamento();
        console.log(ultimoPagamento);

        //Asssert
        assert.equal(ultimoPagamento.codigoDeBarras, codigoDeBarras);
        assert.equal(ultimoPagamento.empresa, empresa);
        assert.equal(ultimoPagamento.valor, valor);
        assert.equal(ultimoPagamento.categoria, categoriaEsperada);
    });
});