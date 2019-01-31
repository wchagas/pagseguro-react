const ERRORS = {

	// Cartão de crédito
	'30405': 'Data de validade do cartão incorreta',
	'10001': 'Número do cartão de credito incorreto',
	'30400': 'Número do cartão de credito incorreto',
	'10006': "Código de segurança incorreto",

	// Endereço de entrega
	'53035': "País do endereço de entrega incorreto",
	'53033': "Estado do endereço de entrega incorreto",
	'53029': "Bairro do endereço de entrega incorreto",
	'53031': "Cidade do endereço de entrega incorreto",
	'53026': "Número do endereço de entrega incorreto",
	'53022': "Cep do endereço de entrega incorreto",
	'53024': "Endereço de entrega incorreto",

	// Dados do comprador
	'53018': "Código de área do telefone do comprador incorreto",
	'53020': "Telefone do comprador incorreto",
	'53118': "Cpf do comprador incorreto",
	'53013': "Nome do comprador incorreto",
	'53010': "Email do comprador incorreto",

	// Produtos
	'53004': "Produto indefinido",
	'53077': "Preço do produto indefinido",
	'53076': "Quantidade de produtos indefinida",

}

/**
* getError
* @param {String} code ex: 33231
* @param {String} defaultError ex: campo incorreto!
*/
export const getError = (code, defaultError = 'Erro na integração do Pagseguro') => {
	if (ERRORS.hasOwnProperty(code)) {
		return ERRORS[code];
	}

	return defaultError;
}
