import React from 'react';
import styled, { css } from 'styled-components';
import { DirectPayment, Loading } from 'pagseguro-react';
import config from '../../config';
import axios from 'axios';
import style from './style.css'

const Home = styled.div`
    position: relative;
`;

const LoadingContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(245, 245, 245, 0.90);

    div {
        left: 50%;
        top: 40%;
    }
`

const Feedback = styled.div`
    background: #f5f5f5;
    padding-top: 50px;
    padding-bottom: 50px;
    box-shadow: 0px 1px 4px rgba(0,0,0,0.18);
    text-align: center;
    width: 100%;

    h1{
        font-size: 1.5em;
        color: #08bd75;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        display: table;
    }


    ${props => props.error && css`
        background: none;
        color: red;
        h1{
			color: red;
        }
    `}


`

export default class Component extends React.Component {



	/**
	* constructor
	*
	* @param {Object} props
	*/
	constructor(props) {
		super(props);
		this.state = {

			loading: false,
			error: null,
			success: null,
			paymentLink: null,
			paid: false,

			session: '',


			// Informações do comprador
			sender: {
				name: 'Willy Chagas',
				email: 'c48186756307979379590@sandbox.pagseguro.com.br',
				phone: {
					areaCode: '48',
					number: '91510980',
				},
				document: {
					type: 'CPF',
					value: '18974411008'
				},
			},


			// Endereço de entrega
			shipping: {
				//addressRequired: false
				type: 3,
				cost: 10.00,
				street: 'Av João Lima',
				number: 55,
				complement: 'Casa',
				district: 'Campeche',
				city: 'Florianópolis',
				state: 'SC',
				country: 'BRA',
				postalCode: '88063333'
			},



			// Endereço de cobrança
			billing: {
				street: 'Av João Lima',
				number: 55,
				complement: 'Casa',
				district: 'Campeche',
				city: 'Florianópolis',
				state: 'SC',
				country: 'BRA',
				postalCode: '88063333'
			},


			// produtos

			items: [
				{
					id: 1,
					description: 'Produto 1',
					quantity: 2,
					amount: 2,
				},
				{
					id: 2,
					description: 'Produto 2',
					quantity: 1,
					amount: 60.00,
				},
				{
					id: 3,
					description: 'Produto 3',
					quantity: 2,
					amount: 20.00,
				}

			],


			// Cartão de crédito
			creditCard: {
				maxInstallmentNoInterest: 0
			},

			extraAmount: 10.00,
			reference: 'Teste Pagseguro React'
		}
	}



	/**
	* componentDidMount
	*/
	componentDidMount() {
		const { session } = this.state;
		if (!session) {
			axios.post(`${config.endpoint}/session`).then(res => {
				this.setState({ session: res.data.content })
			}).catch(err => console.error(err))
		}
	}



	/**
	* onSubmit
	*/
	onSubmit(data) {

		this.setState({
			loading: true,
			error: null,
			success: '',
			paymentLink: null
		})

		axios.post(`${config.endpoint}/directPayment`, data)
			.then(res => {

				const { content } = res.data
				let newState = {}

				switch (content.method) {

					case 'boleto':
						newState = {
							success: 'Acesse o link abaixo para imprimir o boleto',
							paymentLink: content.paymentLink
						}
						break;

					case 'onlineDebit':
						newState = {
							success: 'Acesse seu baco e finalize a transação',
							paymentLink: content.paymentLink
						}
						break;

					case 'creditCard':
						newState = {
							success: 'Pagamento realizado com sucesso',
						}
						break;
				}

				this.setState({
					paid: true,
					loading: false,
					...newState
				})
			})
			.catch(err => {
				const { content } = err.response.data
				const error = Array.isArray(content) ? content : [content]
				this.setState({
					loading: false,
					error
				})
			})
	}



	/**
	* onError
	*/
	onError(error) {
		console.error(error);
	}



	/**
	* render
	*/
	render() {

		if (!this.state.session) {
			return null;
		}

		return <Home>
			{
				this.state.loading && <LoadingContainer><Loading /></LoadingContainer>
			}

			{
				!this.state.paid &&
				<DirectPayment
					env="sandbox"
					session={this.state.session}
					extraAmount={this.state.extraAmount}
					reference={this.state.reference}
					creditCard={this.state.creditCard}
					sender={this.state.sender}
					shipping={this.state.shipping}
					billing={this.state.billing}
					items={this.state.items}
					exclude={[
						//'CREDIT_CARD'
					]}
					onError={this.onError.bind(this)}
					onSubmit={this.onSubmit.bind(this)}
				/*
					hiddenSenderForm
					hiddenShippingForm
					hiddenBillingForm
				*/
				/>
			}

			{
				this.state.success && <Feedback>
					<h1>{this.state.success}</h1>
				</Feedback>
			}

			{
				this.state.error && <Feedback error>
					<ul>
						{
							this.state.error.map((error, key) => (
								<li key={key}>{error.code} - {error.message}</li>
							))
						}
					</ul>
				</Feedback>
			}

			{
				this.state.paymentLink && <Feedback>
					<a href={this.state.paymentLink} target="_blank">ACESSAR</a>
				</Feedback>
			}

		</Home>
	}

}
