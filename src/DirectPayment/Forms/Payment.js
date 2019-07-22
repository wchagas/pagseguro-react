import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from '../../Ui/Grid';
import { PAYMENT_METHODS } from '../../config';
import CreditCard from '../CreditCard';
import Boleto from '../Boleto';
import OnlineDebit from '../OnlineDebit';
import Tab from '../Tab';
import { Loading } from '../../Ui';


export default class Component extends React.Component {



    /**
     * DisplayName
     */
	static displayName = 'DirectPayment/Forms/Payment'



	/**
	* constructor
	*
	* @param {Object} props
	*/
	constructor(props) {
		super(props);
		this.state = {
			amount: 0,
			paymentMethods: null,
			active: 'CREDIT_CARD'
		}
	}



	/**
	* componentDidMount
	*/
	componentWillMount() {
		PagSeguroDirectPayment.setSessionId(this.props.session)
	}



	/**
	* componentDidMount
	*/
	componentDidMount() {

		let value = 0

		if (this.props.extraAmount) {
			value = (value + parseFloat(this.props.extraAmount))
		}

		if (this.props.shipping && this.props.shipping.cost) {
			value = value + parseFloat(this.props.shipping.cost)
		}

		value = this.props.items.reduce((total, item) => parseFloat(total + (parseFloat(item.amount) * parseInt(item.quantity))), value)

		this.setState({ amount: value })

		PagSeguroDirectPayment.getPaymentMethods({
			amount: value.toFixed(2),
			success: ({ paymentMethods }) => {
				this.setState({ paymentMethods: this.formatPaymentMethods(paymentMethods) });
			},
			error: (data) => {
				this.props.onError(data.errors);
			},
			complete: (data) => {
				// ... preload
			}
		});

	}



	/**
	* formatPaymentMethods
	*
	* @param {Object} paymentMethods
	* @return {Object}
	*/
	formatPaymentMethods(paymentMethods) {

		const data = []
		const { exclude } = this.props

		Object.keys(paymentMethods).forEach(key => {

			if (exclude.indexOf(key) !== -1) {
				return
			}

			const options = paymentMethods[key].options
			const optionToArray = []

			Object.keys(options).forEach(optionKey => {
				optionToArray.push(options[optionKey])
			})

			paymentMethods[key].options = optionToArray

			data.push({
				...paymentMethods[key],
				...PAYMENT_METHODS[key]
			})

		})

		const result = data.sort((a, b) => a.order - b.order)

		if (result.length > 0) {
			this.setState({
				active: result[0].name
			})
		}

		return result
	}



	/**
	* onChangePaymentMethods
	*
	* @param {Object} method
	*/
	onChangePaymentMethods(method) {
		this.setState({ active: method.name });
	}


    /**
	* methodIsEnabled
	*
	* @param {String} method
	*/
	paymentMethodIsEnabled(method) {
		return this.state.paymentMethods.some(i => i.name == method)
	}




	/**
	* render
	*/
	render() {

		const { paymentMethods, amount, active } = this.state;
		const { onSubmit, onError } = this.props;
		const data = this.props.data || {};

		return <div>
			{
				paymentMethods ? (
					<Row>

						<Col xs={12}>
							{
								<Tab active={active} data={paymentMethods} onChange={this.onChangePaymentMethods.bind(this)} />
							}
						</Col>

						<Col xs={12}>
							{
								active == 'CREDIT_CARD' && this.paymentMethodIsEnabled('CREDIT_CARD') && (
									<CreditCard {...this.props} amount={amount} onSubmit={onSubmit} onError={onError} cards={paymentMethods.find(item => item.name == 'CREDIT_CARD').options} />
								)
							}

							{
								active == 'BOLETO' && this.paymentMethodIsEnabled('BOLETO') && (
									<Boleto {...this.props} amount={amount} onSubmit={onSubmit} onError={onError} data={paymentMethods.find(item => item.name == 'BOLETO').options} />
								)
							}

							{
								active == 'ONLINE_DEBIT' && this.paymentMethodIsEnabled('ONLINE_DEBIT') && (
									<OnlineDebit {...this.props} amount={amount} onSubmit={onSubmit} onError={onError} banks={paymentMethods.find(item => item.name == 'ONLINE_DEBIT').options} />
								)
							}
						</Col>

					</Row>
				) : <Loading size="lg" center />
			}
		</div>
	}
}
