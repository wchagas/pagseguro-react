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
    Checkbox,
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
    static displayName = 'DirectPayment/Form/Billing'


	/**
	* propTypes
	*/
	static propTypes = {
        data: PropTypes.object,
        steps: PropTypes.array.isRequired,
        onChangeStep: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        shipping: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ])
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
        useShippingAddress: false,
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
        this.cache = this.state
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

        const type = e.target.type
        const name = e.target.name
        let value = e.target.value

        if (type == 'checkbox') {
            value = value == 'true' ? false : true
            if (name == 'useShippingAddress' && value) {
                this.cache = this.state
                this.setState(this.props.shipping, () => { 
                    this.validate()
                    this.props.onChange(this.state) 
                })
            } else {
                this.setState(this.cache, () => { 
                    this.validate()
                    this.props.onChange(this.state) 
                })
            }
        }

		this.setState({
			[name]: value
        }, () => {
            this.validate(isValid => {
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

            const billing = {...this.state}
            delete billing.error
            
            const { steps } = this.props
            const next = steps.findIndex(o => o.name == 'billing') + 1

            this.props.onChangeStep(steps[next].name, {
                billing
            })
        })
	}



	/**
	* render
	*/
	render() {

        const {form} = this.state
        const {shipping} = this.props
        const showUseShippingAddress = shipping && shipping.hasOwnProperty('addressRequired') && shipping.addressRequired    

        return <Row>
            {
                showUseShippingAddress && 
                <Col xs={12}>
                    <FormGroup mbMd>
                        <Checkbox checked={this.state.useShippingAddress} value={this.state.useShippingAddress} label="Usar mesmo endereço de entrega" name="useShippingAddress" onChange={this.handleChange}  />
                    </FormGroup>
                </Col>
            }
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

