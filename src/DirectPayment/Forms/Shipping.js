import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {Row,Col} from '../../Ui/Grid'
import * as THEME from '../../Ui/theme'
import {
	Button,
	Label,
	Input,
    InputMask,
	Error,
    Select,
	FormGroup
} from 	'../../Ui/Form'

const STATES = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]

const Actions = styled.div`
	margin: 1em 0 0;
	padding: 1em 0 0;
	button {
		padding: 14px 40px;
		float: right;
	}
`


export default class Component extends React.Component {


    /**
    * displayName
    */
    static displayName = 'DirectPayment/Form/Shipping'



	/**
	* propTypes
	*/
	static propTypes = {
		data: PropTypes.object,
		steps: PropTypes.array,
        onChangeStep: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
	}



	/**
	* defaultProps
	*/
	static defaultProps = {
		data: {},
	}


    /**
    * state
    */
    state = {
        street: '', 
        number: '', 
        complement: '', 
        district: '', 
        city: '', 
        state: '', 
        postalCode: '',
        error: {}
    }



	/**
	* constructor
	*
	* @param {Object} props
	*/
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.submit = this.submit.bind(this)
	}



	/**
	* componentDidMount
	*/
	componentDidMount() {
        const {data} = this.props

        if (data.postalCode) {
            data.postalCode = data.postalCode.toString()
        }

        this.setState({
            ...this.state,
            ...data
        })
	}



	/**
	* handleChange
	* @param Event e
	*/
	handleChange(e) {
		this.setState({
			...this.state.form,
			[e.target.name]: e.target.value
        }, () => {
            this.validate(IsValid => {
                this.props.onChange(this.state)
            })
        })
	}



    /**
     * validate
     */
    validate(cb) {
        const error = {}

		if (!this.state.street) {
			error['street'] = "Preencha o endereço"
	    }
        
        if (!this.state.number) {
			error['number'] = "Preencha o número"
		}

		if (!this.state.district) {
			error['district'] = "Preecnha o bairro"
		}

		if (!this.state.city) {
			error['city'] = "Preencha a cidade"
		}

		if (!this.state.state){
			error['state'] = "Preencha o estado"
		}
        
        if (this.state.postalCode.replace(new RegExp('_', 'g'), '').length < 8){
			error['postalCode'] = "Preencha o cep"
		}
        
        this.setState({ error }, () => {
            cb(Object.keys(error).length == 0)
        })
    }



	/**
	* submit
	* @param Event e
	*/
	submit(e) {
		e.preventDefault()
        this.validate(isValid => {

            if (!isValid) return

            const shipping = {...this.state}
            delete shipping.error

            const { steps } = this.props
            const next = steps.findIndex(o => o.name == 'shipping') + 1

            this.props.onChangeStep(steps[next].name, {
                shipping
            })
        })
	}



	/**
	* render
	*/
	render() {

		const {form} = this.state

        return <Row>
            <Col xs={12} sm={2} md={2} lg={2}>
                <FormGroup>
                    <Label>Estado</Label>
                    <Select name='state' value={this.state.state} onChange={this.handleChange}>
                        <option value="">Selecionar</option>
                        {
                            STATES.map(state => <option key={state} value={state}>{state}</option>)
                       }
                    </Select>
                    {this.state.error.state && <Error>{this.state.error.state}</Error>}
                </FormGroup>
            </Col>

            <Col xs={12} sm={4} lg={4}>
                <FormGroup>
                    <Label>Cidade</Label>
                    <Input name='city' value={this.state.city} onChange={this.handleChange} />
                    {this.state.error.city && <Error>{this.state.error.city}</Error>}
                </FormGroup>
            </Col>
            <Col xs={12} sm={5} lg={4}>
                <FormGroup>
                    <Label>Bairro</Label>
                    <Input name='district' value={this.state.district} onChange={this.handleChange} />
                    {this.state.error.district && <Error>{this.state.error.district}</Error>}
                </FormGroup>
            </Col>
             <Col xs={12} sm={2} lg={2}>
                <FormGroup>
                    <Label>CEP</Label>
                    <InputMask mask="11111111" placeholder="" name='postalCode' value={this.state.postalCode} onChange={this.handleChange} />
                    {this.state.error.postalCode && <Error>{this.state.error.postalCode}</Error>}
                </FormGroup>
            </Col>
            <Col xs={12} sm={5} lg={4}>
                <FormGroup>
                    <Label>Endereço</Label>
                    <Input name='street' value={this.state.street} onChange={this.handleChange} />
                    {this.state.error.street && <Error>{this.state.error.street}</Error>}
                </FormGroup>
            </Col>
            <Col xs={12} sm={1} lg={1}>
                <FormGroup>
                    <Label>Número</Label>
                    <Input placeholder="" name='number' value={this.state.number} onChange={this.handleChange} />
                    {this.state.error.number && <Error>{this.state.error.number}</Error>}
                </FormGroup>
            </Col>
            <Col xs={12} sm={7} lg={7}>
                <FormGroup>
                    <Label>Complemento</Label>
                    <Input name='complement' value={this.state.complement} onChange={this.handleChange} />
                    {this.state.error.complement && <Error>{this.state.error.complement}</Error>}
                </FormGroup>
            </Col>

            <Col xs={12}>
                <Actions>
                    <Button color="success" onClick={this.submit}>AVANÇAR</Button>
                </Actions>
            </Col>
        </Row>
	}
}
