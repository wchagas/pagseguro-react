import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from '../Ui/Grid'
import LoadLibrary from '../Utils/LoadLibrary'
import styled from 'styled-components'
import * as THEME from '../Ui/theme'
import Payment from './Forms/Payment'
import Sender from './Forms/Sender'
import Billing from './Forms/Billing'
import Shipping from './Forms/Shipping'
import Step from './Forms/Step'
import { DISABLE_PAYMENT_METHODS } from '../config'

const DirectPayment = styled(Col) `
    background: ${THEME.SECONDARY_LIGHT_COLOR};
    padding-top: 15px;
    padding-bottom: 15px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.18);
`

export default class Component extends React.Component {


    /**
     * displayName
     */
    static displayName = 'DirectPayment'



    /**
    * propTypes
    */
    static propTypes = {
        env: PropTypes.string.isRequired,
        session: PropTypes.string.isRequired,
		sender: PropTypes.object.isRequired,
        shipping: PropTypes.object.isRequired,
		billing: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        exclude: PropTypes.array,
		extraAmount: PropTypes.number,
		reference: PropTypes.string,
		creditCard: PropTypes.object,
        onError: PropTypes.func,
        onSubmit: PropTypes.func,
	}



	/**
	* defaultProps
	*/
	static defaultProps = {
        env: 'sandbox', // production|sandbox
		creditCard: {
			maxInstallmentNoInterest: 0
		},
        //sender: {},
        //shipping: {},
        //billing: {},
        //products: [],
		exclude: DISABLE_PAYMENT_METHODS,
		onError: () => {},
		onSubmit: () => {}
	}



    /**
     * state
     */ 
    state = {
        active: 'sender',
        sender: {},
        shipping: {},
        billing: {},
        payment: {},
        steps: [
            {
                name: 'sender',
                displayName: 'Dados do Comprador',
                disabled: false,
            },
            {
                name: 'shipping',
                displayName: 'Endereço de entrega',
                disabled: true
            },
            {
                name: 'billing',
                displayName: 'Endereço de cobrança',
                disabled: true
            },
            {
                name: 'payment',
                displayName: 'Pagar',
                disabled: true
            },
        ]
    }



    /**
	* constructor
	*
	* @param {Object} props
	*/
	constructor(props) {
		super(props);
	}



    /**
	* componentDidMount
	*/
    componentDidMount() {
        
        const { 
            sender, 
            shipping,
            billing,
            hiddenSenderForm, 
            hiddenShippingForm, 
            hiddenBillingForm 
        } = this.props

        const removeStep = (ss, s) => ss.filter(i => i.name != s)

        let { active } = this.state
        let steps = [ ...this.state.steps ]
        let hiddenSteps = false
        
        if (hiddenSenderForm) {
            steps = removeStep(steps, 'sender')
        }

        if (hiddenShippingForm || (shipping && shipping.hasOwnProperty('addressRequired') && !shipping.addressRequired)) {
            steps = removeStep(steps, 'shipping')
        }
        
        if (hiddenBillingForm) {
            steps = removeStep(steps, 'billing')
        }

        if (Object.keys(steps).length == 1) {
            hiddenSteps = true
            active = 'payment'
        } else {
            const current = steps[0]
            active = current.name
            current.disabled = false
        }

        this.setState({
            active,
            hiddenSteps,
            steps,
            sender,
            shipping, 
            billing
        })
	}



    /**
	* onChangeStep
	*
    * @param {String} active
    * @param {Object} data
	*/
    onChangeStep(active, data = null) {
	
		if (!data) {
			const current = this.state[this.state.active]
			if (current.error && Object.keys(current.error).length > 0) {
				return
			}
		}

		const steps = this.state.steps
            .map(s => {
                if (s.name == active) {
                    s.disabled = false
                }
                return s
            })

        let newState = {
            active,
            steps
        }

        if (data) {
            newState = { ...newState, ...data }
        }			

		this.setState(newState)
	}



   /**
	* onChange
	*
    * @param {String} key 
    * @param {Object} value
	*/
    onChange(key, value) {
        this.setState({
            [key]: value
        })
    }



    /**
    * render
    */
    render() {

        const { 
            env,
            hiddenSenderForm,
            hiddenShippingForm,
            hiddenBillingForm
        } = this.props

        const { 
            active, 
            hiddenSteps, 
            steps, 
            sender, 
            shipping,
            billing,
        } = this.state

        const props = { ...this.props }
        props.exclude = [ ...this.props.exclude, ...DISABLE_PAYMENT_METHODS ]

        return <LoadLibrary env={env}>
			<DirectPayment className="ps-react-direct-payment">
				<Row>
					{
						!hiddenSteps &&
						<Col xs={12}>
							<Step onChange={this.onChangeStep.bind(this)} active={active} steps={steps} />
						</Col>
					}

					<Col xs={12}>
						{ !hiddenSenderForm && active == 'sender' && <Sender onChange={this.onChange.bind(this, 'sender')} onChangeStep={this.onChangeStep.bind(this)} data={sender} steps={steps}  /> }
					</Col>

					<Col xs={12}>
						{ !hiddenShippingForm && active == 'shipping' && <Shipping  onChange={this.onChange.bind(this, 'shipping')} onChangeStep={this.onChangeStep.bind(this)} data={shipping} steps={steps} /> }
					</Col>

					<Col xs={12}>
						{ !hiddenBillingForm && active == 'billing' && <Billing onChange={this.onChange.bind(this, 'billing')} onChangeStep={this.onChangeStep.bind(this)} data={billing} steps={steps} shipping={shipping || false} /> }
					</Col>

					<Col xs={12}>
						{ active == 'payment' && <Payment onChangeStep={this.onChangeStep.bind(this)} { ...props } /> }
					</Col>
				</Row>
			</DirectPayment>
        </LoadLibrary>;
    }

}
