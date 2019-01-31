import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {Row,Col} from '../Ui/Grid';
import * as THEME from '../Ui/theme';
import {Button} from 	'../Ui/Form';


const Container = styled(Row)`
	margin-top: 2em;
	margin-bottom: 2em;
	button {
        padding: 14px 40px;
        display: table;
        margin: 2em auto;
	}
`;


export default class Boleto extends React.Component {


	/**
	* propTypes
	*/
    static propTypes = {
        reference: PropTypes.string,
        extraAmoung: PropTypes.number,
		amount: PropTypes.number.isRequired,
		onSubmit: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
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
			processing: false,
			error: false
		}
		this.pay = this.pay.bind(this)
	}


	/**
	* getStateData
	* @param {Object} data
    */
    getStateData() {
		const data = {
            method: 'BOLETO',
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
        }

        if (this.props.extraAmount) {
            data.extraAmount = this.props.extraAmount.toFixed(2)
        }

        return data
	}


	/**
	* pay
	* @param Event e
	*/
	pay(e) {
		this.props.onSubmit(this.getStateData());
	}



	/**
	* render
	*/
	render() {
        return <Container>
			<Button onClick={this.pay} color="success">GERAR BOLETO</Button>
		</Container>
	}
}
