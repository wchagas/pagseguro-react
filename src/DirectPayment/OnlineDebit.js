import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {Row,Col} from '../Ui/Grid';
import * as THEME from '../Ui/theme';
import {Button} from 	'../Ui/Form';
import { PAGSEGURO_API } from '../config';

const { path } = PAGSEGURO_API;

const Container = styled(Row)`
	margin-top: 2em;
	margin-bottom: 2em;
	button {
        padding: 14px 40px;
        display: table;
        margin: 2em auto;
	}
`


const Title = styled.h2 `
    text-align: center;
    font-size: 1em;
    margin: 0 0 20px 0;
`

const Banks = styled.div `
    overflow: hidden;
    display: table;
    margin: 20px auto;
    padding: 10px;
`

const Bank = styled.img `
    float: left;
    margin: 4px 2px;
    cursor: pointer;
    box-sizing: border-box;
    border-bottom: 2px solid rgba(204, 204, 204, 0);

    ${props => props.active && css `
        border-bottom: 2px solid ${THEME.SUCCESS_COLOR};
        box-shadow: 0 1px 2px ${THEME.SECONDARY_DARK_COLOR};
    `}

    ${THEME.media.phone `

    `}
`

export default class Component extends React.Component {



    /**
     * displayName
     */
    static displayName = 'DirectPayment/OnlineDebit'



	/**
	* propTypes
	*/
    static propTypes = {
        reference: PropTypes.string,
        extraAmoung: PropTypes.number,
        amount: PropTypes.number.isRequired,
        banks: PropTypes.array.isRequired,
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
            bank: null,
            banks: []
		}
		this.pay = this.pay.bind(this)
    }



    /*
     * componentDidMount
     */
    componentDidMount() {
        const banks = this.props.banks.filter(i => i.status == 'AVAILABLE')
        this.setState({ banks })
    }



    /**
	* getBankImage
	*/
	getBankImage(bank) {
		return path + bank.images.MEDIUM.path;
    }



	/**
	* getStateData
	* @param {Object} data
    */
    getStateData() {
		const data = {
            method: 'ONLINE_DEBIT',
            shipping: this.props.shipping,
            reference: this.props.reference,
            billing: this.props.billing,
            bank: {
                name: this.state.bank
            },
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
     * onChange
     */
    onChange(bank, e) {
        e.preventDefault()
        this.setState({ bank })
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

        const { banks, bank } = this.state

        return <Container>
            <Col xs={12}>
                <Title>Selecione seu banco</Title>
            </Col>
            <Col xs={12}>
                <Banks>
                    {
                        banks.map((item, key) => (
                            <Bank
                                src={this.getBankImage(item)}
                                key={key}
                                active={item.name == bank}
                                onClick={this.onChange.bind(this, item.name)}
                            />
                        ))
                    }
                </Banks>
            </Col>
            <Col xs={12}>
                <Button disabled={!bank} onClick={this.pay} color="success">REALIZAR PAGAMENTO</Button>
            </Col>
		</Container>
	}
}
