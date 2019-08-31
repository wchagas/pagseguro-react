import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Row, Col } from '../Ui/Grid';
import * as THEME from '../Ui/theme';
import { Loading as LoadingUi } from '../Ui';
import { error } from '../Utils';
import { PAGSEGURO_API } from '../config';

import {
	Button,
	Label,
	Input,
	InputMask,
	Select,
	Error,
	FormGroup
} from '../Ui/Form';


const { path } = PAGSEGURO_API;
const { getError } = error;

const Container = styled.div`
	margin:2em 0 0;
`;

const Loading = styled(LoadingUi)`
	bottom: 12px;
	right: 30px;
`;

const Actions = styled.div`
	margin: 1em 0 0;
	button {
		padding: 14px 40px;
		float: right;
	}
`

const Card = styled.img`
	margin: 0.8em 0 0;
	position: absolute;
	right: 8px;
	top: 18px;
`;


export default class CreditCard extends React.Component {


	/**
	* propTypes
	*/
	static propTypes = {
		cards: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
		reference: PropTypes.string,
		extraAmount: PropTypes.number,
		amount: PropTypes.number.isRequired
	}


	/**
	* defaultProps
	*/
	static defaultProps = {
	}


	/**
	* constructor
	*
	* @param {Object} props
	*/
	constructor(props) {
		super(props);
		this.state = {
			error: {},

			creditCard: {

				// holder
				name: '',
				birthDate: '',
				documentType: 'CPF',
				documentValue: '',
				phoneAreaCode: '',
				phoneNumber: '',

				// card
				token: '',
				number: '',
				code: '',
				expiration: '',
				expirationMonth: '',
				expirationYear: '',
				installment: "",
				installments: [],
				brand: null,

				// buy
				amount: 0,
				maxInstallmentNoInterest: 0
			},
			processing: false,
			processingGetBrand: false,
			processingGetInstallments: false,
			error: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.cardNumberOnBlur = this.cardNumberOnBlur.bind(this);
		this.pay = this.pay.bind(this);
	}



	/**
	* componentDidMount
	*/
	componentDidMount() {
		this.setStateData();
	}



	/**
	* handleChange
	* @param Event e
	*/
	handleChange(e) {
		const { name, value } = e.target;

		this.setState({
			creditCard: {
				...this.state.creditCard,
				[name]: value
			}
		});
	}



	/**
	* setStateData
	* @param {Object} data
	*/
	setStateData() {

		const {
			amount,
			autocompleteBySender,
			creditCard
		} = this.props;

		this.setState({
			creditCard: {
				...this.state.creditCard,
				...creditCard,
				amount: amount.toFixed(2)
			}
		}, () => {
			this.cardNumberOnBlur()
		});
	}



	/**
	* getStateData
	* @param {Object} data
	*/
	getStateData() {
		const { creditCard } = this.state;
		let { installment, installments, maxInstallmentNoInterest } = creditCard;

		installment = installments.find(item => item.quantity == installment);
		installment = installment ? installment : installments[0];

		const data = {
			method: 'CREDIT_CARD',
			shipping: this.props.shipping,
			reference: this.props.reference,
			billing: this.props.billing,
			sender: {
				...this.props.sender,
				hash: PagSeguroDirectPayment.getSenderHash(),
			},
			items: this.props.items.map(i => {
				if (i.amount.toFixed) {
					i.amount = i.amount.toFixed(2)
				}
				return i
			}),
			creditCard: {
				token: creditCard.token,
				installment,
				maxInstallmentNoInterest,
				holder: {
					name: creditCard.name,
					document: {
						type: creditCard.documentType,
						value: creditCard.documentValue
					},
					birthDate: creditCard.birthDate,
					phone: {
						areaCode: creditCard.phoneAreaCode,
						number: creditCard.phoneNumber,
					},
				},
			}
		}

		if (this.props.extraAmount) {
			data.extraAmount = this.props.extraAmount.toFixed(2)
		}

		return data
	}



	/**
	* cardNumberOnBlur
	* @param Event e
	*/
	cardNumberOnBlur(e) {

		if (e) e.preventDefault()

		const name = 'creditCardNumber'
		let value = this.state.creditCard.number

		if (e && e.target) {
			value = e.target.value
		}

		this.setState({
			error: {}
		});

		const setError = (message = 'Número do cartão incorreto') => {
			this.setState({
				error: {
					...this.state.error,
					creditCardNumber: message
				}
			})
		}

		if (value.replace('_', '').length < 16) {
			setError();
			return;
		}

		this.setBrand(value).then(brand => {

			const enabled = this.props.cards.find(item => item.name == brand.brand.name.toUpperCase());

			if (!enabled) {
				setError(`Bandeira ${brand.brand.name.toUpperCase()} indisponível para pagamento`);
				return;
			}

			const { amount, maxInstallmentNoInterest } = this.state.creditCard

			this.setInstallments(amount, maxInstallmentNoInterest, brand.brand.name)
		}).catch(err => {
			console.error(err)
			setError()
		});
	}



	/**
	* setBrand
	* @param {String} cardNumber
	*/
	setBrand(cardNumber) {
		this.setState({ processingGetBrand: true });
		return this.getBrand(cardNumber).then(data => {
			this.setState({
				processingGetBrand: false,
				creditCard: {
					...this.state.creditCard,
					brand: data
				}
			});

			return data;
		}).catch(error => {
			this.setState({
				processingGetBrand: false,
			});
		})
	}



	/**
	* getBrand
	*/
	getBrand(cardBin) {
		return new Promise((resolve, reject) => {
			PagSeguroDirectPayment.getBrand({
				cardBin,
				success: function (response) {
					resolve(response);
				},
				error: function (response) {
					reject(response);
				}
			});
		});
	}



	/**
	* setInstallments
	* @param {Number} amount valor
	* @param {Number} maxInstallmentNoInterest quantidade de parcelas sem juros
	* @param {String} brand bandeira do cartão
	*/
	setInstallments(amount, maxInstallmentNoInterest, brand) {
		this.setState({ processingGetInstallments: true });
		return this.getInstallments(amount, maxInstallmentNoInterest, brand).then(data => {
			this.setState({
				processingGetInstallments: false,
				creditCard: {
					...this.state.creditCard,
					installments: data
				}
			})
			return data;
		});
	}



	/**
	* getInstallments
	*/
	getInstallments(amount, maxInstallmentNoInterest, brand) {
		return new Promise((resolve, reject) => {

			const params = {
				amount,
				brand,
				success: function (response) {
					resolve(response.installments[brand]);
				},
				error: function (response) {
					reject(response);
				}
			};

			if (maxInstallmentNoInterest && maxInstallmentNoInterest > 1) {
				params.maxInstallmentNoInterest = maxInstallmentNoInterest;
			}

			return PagSeguroDirectPayment.getInstallments(params);
		});
	}



	/**
	* createCardToken
	*/
	createCardToken() {
		return new Promise((resolve, reject) => {

			const { creditCard } = this.state;
			const { number, code, brand } = creditCard;
			const expiration = creditCard.expiration.split('/');

			if (expiration.length < 2) {
				reject({
					expiration: 'Data de validade do cartão incorreta'
				})
			}

			if (!brand) {
				reject({
					creditCardNumber: 'Preencha o número do cartão de crédito'
				})
			}

			const expirationMonth = expiration[0];
			const expirationYear = expiration[1];

			PagSeguroDirectPayment.createCardToken({
				cardNumber: number,
				brand: brand.brand.name,
				cvv: code,
				expirationMonth,
				expirationYear,
				success: function (response) {
					resolve(response.card.token);
				},
				error: function (response) {
					console.error(response)
					let error = '';
					Object.keys(response.errors).forEach(i => {
						if (i == 30404) { // session expired
							location.reload();
							return;
						}
						let message = getError(i, response.errors[i]);
						error += ` - ${message}`;
					})
					reject(error);
				}
			});

		});
	}



	/**
	* getBrandImage
	*/
	getBrandImage() {
		const { cards } = this.props;
		const { brand } = this.state.creditCard;
		let brandImage = null;
		if (brand) {
			brandImage = cards.find(item => item.name == brand.brand.name.toUpperCase());
			if (brandImage) {
				brandImage = path + brandImage.images.MEDIUM.path;
			}
		}
		return brandImage;
	}



	/**
	* pay
	* @param Event e
	*/
	pay(e) {
		e.preventDefault();

		const error = {};
		const reg = new RegExp('_', 'g')

		this.setState({ processing: true, error });

		if (this.state.creditCard.name.length < 6) {
			error['name'] = "Preencha o nome corretamente";
		}

		if (this.state.creditCard.birthDate.replace(reg, '').length != 10) {
			error['birthDate'] = "Adicione a data de nascimento";
		}

		if (this.state.creditCard.phoneAreaCode.replace(reg, '').length < 2) {
			error['phoneAreaCode'] = "Adicione o DDD";
		}

		if (this.state.creditCard.phoneNumber.replace(reg, '').length < 8) {
			error['phoneNumber'] = "Adicione o telefone";
		}

		if (this.state.creditCard.documentType == 'CPF' && this.state.creditCard.documentValue.replace(reg, '').length != 11) {
			error['documentType'] = "CPF inválido";
		}

		if (this.state.creditCard.documentType == 'CNPJ' && this.state.creditCard.documentValue.replace(reg, '').length != 14) {
			error['documentType'] = "CNPJ inválido";
		}

		if (this.state.creditCard.number.replace(reg, '') < 16) {
			error['creditCardNumber'] = "Número do cartão incorreto";
		}

		if (this.state.creditCard.expiration.replace(reg, '').length < 7) {
			error['expiration'] = "Verifique a validade";
		}

		if (this.state.creditCard.code.length < 3) {
			error['code'] = "Verifique o código";
		}

		if (Object.keys(error).length > 0) {
			this.setState({ processing: false, error });
			return;
		}

		this.createCardToken()
			.then(token => {
				this.setState({
					creditCard: {
						...this.state.creditCard,
						token
					}
				}, () => {
					this.props.onSubmit(this.getStateData());
				})
			})
			.catch(error => {
				console.error(error)
				this.setState({ error });
			})
			.then(token => {
				this.setState({ processing: false });
			});
	}



	/**
	* render
	*/
	render() {

		const { cards } = this.props;
		const { creditCard, processing, processingGetBrand, processingGetInstallments, error } = this.state;
		const { installment, installments } = creditCard;

		const brandImage = this.getBrandImage();
		const documentTypeMask = creditCard.documentType == 'CPF' ? '11111111111' : '11111111111111';

		return <Container>
			<Row>
				<Col xs={12} sm={6} lg={8}>
					<FormGroup>
						<Label>Nome do portador <small>(como gravado no cartão)</small></Label>
						<Input name='name' value={creditCard.name} onChange={this.handleChange} />
						{this.state.error.name && <Error>{this.state.error.name}</Error>}
					</FormGroup>
				</Col>
				<Col xs={12} sm={6} lg={4}>
					<FormGroup>
						<Label>{creditCard.documentType}</Label>
						<InputMask mask={documentTypeMask} placeholder={''} name='documentValue' value={creditCard.documentValue} onChange={this.handleChange} />
						{this.state.error.documentType && <Error>{this.state.error.documentType}</Error>}
					</FormGroup>
				</Col>
				<Col xs={12} sm={6} md={6}>
					<FormGroup>
						<Label>Data de nascimento do portador</Label>
						<InputMask mask="11/11/1111" placeholder="dd/mm/yyyy" name='birthDate' value={creditCard.birthDate} onChange={this.handleChange} />
						{this.state.error.birthDate && <Error>{this.state.error.birthDate}</Error>}
					</FormGroup>
				</Col>

				<Col xs={4} sm={2} md={2}>
					<FormGroup>
						<Label>DDD</Label>
						<Input name='phoneAreaCode' maxLength="2" value={creditCard.phoneAreaCode} onChange={this.handleChange} />
						{this.state.error.phoneAreaCode && <Error>{this.state.error.phoneAreaCode}</Error>}
					</FormGroup>
				</Col>

				<Col xs={8} sm={4} md={4}>
					<FormGroup>
						<Label>Telefone do portador</Label>
						<InputMask mask="111111111" placeholder="" name='phoneNumber' value={creditCard.phoneNumber} onChange={this.handleChange} />
						{this.state.error.phoneNumber && <Error>{this.state.error.phoneNumber}</Error>}
					</FormGroup>
				</Col>

				<Col xs={12} sm={6} md={6} lg={4}>
					<FormGroup>
						<Label>Número do cartão</Label>
						{brandImage ? <Card src={brandImage} /> : null}
						{processingGetBrand ? <Loading size="xs" /> : ''}
						<InputMask mask="1111111111111111" name='number' placeholder="" value={creditCard.number} onChange={this.handleChange} onBlur={this.cardNumberOnBlur} />
						{this.state.error.creditCardNumber && <Error>{this.state.error.creditCardNumber}</Error>}
					</FormGroup>
				</Col>

				<Col xs={6} sm={3} md={4} lg={2}>
					<FormGroup>
						<Label>Validade</Label>
						<InputMask mask="11/1111" placeholder="mm/yyyy" name='expiration' value={creditCard.expiration} onChange={this.handleChange} />
						{this.state.error.expiration && <Error>{this.state.error.expiration}</Error>}
					</FormGroup>
				</Col>

				<Col xs={6} sm={3} md={2} lg={2}>
					<FormGroup>
						<Label>Código</Label>
						<Input name='code' value={creditCard.code} onChange={this.handleChange} />
						{this.state.error.code && <Error>{this.state.error.code}</Error>}
					</FormGroup>
				</Col>

				<Col xs={12} sm={6} md={6} lg={4}>
					<FormGroup>
						<Label>Parcelas</Label>
						<Select name="installment" value={installment} onChange={this.handleChange}>
							{
								installments && installments.length > 0 ? (
									installments.map(item => (
										<option key={item.quantity} value={item.quantity}>
											{
												`${item.quantity}x `
											}
											{
												item.installmentAmount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
											}
											{
												item.interestFree ? ' (sem juros)' : (
													` | Total - ${item.totalAmount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} `
												)
											}
										</option>
									))
								) : (
										<option value="">SELECIONAR</option>
									)
							}
						</Select>
					</FormGroup>
				</Col>


				<Col xs={12}>
					<Actions>
						<Button disabled={this.props.processing} onClick={this.pay} color="success">{this.state.processing ? 'AGUARDE...' : 'REALIZAR PAGAMENTO'}</Button>
					</Actions>
				</Col>
			</Row>
		</Container>;
	}
}
