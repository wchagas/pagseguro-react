/**
* @see https://dev.pagseguro.uol.com.br/documentacao/pagamento-online/pagamentos/pagamento-transparente
*/
export const PAGSEGURO_API = {
    path: 'https://stc.pagseguro.uol.com.br',
    sandbox: 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js',
    production : 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js',
}


/**
* PAYMENT METHODS
*/
export const PAYMENT_METHODS = {
	CREDIT_CARD: {
		displayName: 'Cartão de crédito',
		order: 1
	},
	BOLETO: {
		displayName: 'Boleto',
		order: 2
    },
    ONLINE_DEBIT: {
		displayName: 'Débito',
		order: 3
	},
}


/**
 * TODO: Disable payment methods v1
 */
export const DISABLE_PAYMENT_METHODS = ['BALANCE', 'DEPOSIT']
