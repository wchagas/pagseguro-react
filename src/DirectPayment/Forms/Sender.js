import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Row, Col } from '../../Ui/Grid';
import { checkEmail } from '../../Utils';
import * as THEME from '../../Ui/theme';

import {
	Button,
	Label,
	Input,
	InputMask,
	Select,
	Error,
	FormGroup
} from '../../Ui/Form';


const Actions = styled.div`
	margin: 1em 0 0;
	button {
		padding: 14px 40px;
		float: right;
	}
`;


export default class Component extends React.Component {


    /**
     * displayName
     */
	static displayName = 'DirectPayment/Sender'



	/**
	* propTypes
	*/
	static propTypes = {
		data: PropTypes.object,
		onChangeStep: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		steps: PropTypes.array.isRequired
	}



	/**
	* defaultProps
	*/
	static defaultProps = {
		data: {},
	}



	/**
	* constructor
	*
	* @param {Object} props
	*/
	constructor(props) {
		super(props)
		this.state = {
			error: {},
			name: '',
			email: '',
			documentType: 'CPF',
			documentValue: '',
			phoneAreaCode: '',
			phoneNumber: '',
		}

		this.handleChange = this.handleChange.bind(this)
		this.submit = this.submit.bind(this)
	}



	/**
	* componentDidMount
	*/
	componentDidMount() {
		const { data } = this.props
		const { name, email, phone, error } = data
		this.setState({
			...this.state,
			error: data.error || {},
			name: name || '',
			email: email || '',
			documentType: data.document && data.document.type ? data.document.type : 'CPF',
			documentValue: data.document && data.document.value ? data.document.value : '',
			phoneAreaCode: phone && phone.areaCode ? phone.areaCode : '',
			phoneNumber: phone && phone.number ? phone.number : ''
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
			this.validate(isValid => {
				this.props.onChange(this.getStateData())
			})
		});
	}



	/**
	* getStateData
	* @param {Object} data
	*/
	getStateData() {
		return {
			error: this.state.error,
			name: this.state.name,
			email: this.state.email,
			document: {
				type: this.state.documentType,
				value: this.state.documentValue
			},
			phone: {
				areaCode: this.state.phoneAreaCode,
				number: this.state.phoneNumber,
			},
		}
	}



    /**
     * validate
     */
	validate(cb) {
		const error = {};
		const reg = new RegExp('_', 'g')

		if (this.state.name.length < 4) {
			error['name'] = "Preencha o nome corretamente";
		}

		if (!checkEmail(this.state.email)) {
			error['email'] = 'Email inválido'
		}

		if (this.state.phoneAreaCode.replace(reg, '').length < 2) {
			error['phoneAreaCode'] = "Adicione o DDD";
		}

		if (this.state.phoneNumber.replace(reg, '').length < 8) {
			error['phoneNumber'] = "Adicione o telefone";
		}

		if (this.state.documentType == 'CPF' && this.state.documentValue.replace(reg, '').length != 11) {
			error['documentType'] = "CPF inválido";
		}

		if (this.state.documentType == 'CNPJ' && this.state.documentValue.replace(reg, '').length != 14) {
			error['documentType'] = "CNPJ inválido";
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
		e.preventDefault();
		this.validate(isValid => {

			if (!isValid) return

			const { steps } = this.props
			const next = steps.findIndex(o => o.name == 'sender') + 1

			this.props.onChangeStep(steps[next].name, {
				sender: this.getStateData()
			})
		})
	}



	/**
	* render
	*/
	render() {

		const documentTypeMask = this.state.documentType == 'CPF' ? '11111111111' : '11111111111111';

		return <React.Fragment>

			<Row>

				<Col xs={12} sm={4} md={3} lg={3}>
					<FormGroup>
						<Label>Tipo</Label>
						<Select name='documentType' value={this.state.documentType} onChange={this.handleChange}>
							<option value="CPF">Pessoa Física</option>
							<option value="CNPJ">Pessoa Jurídica</option>
						</Select>
					</FormGroup>
				</Col>

				<Col xs={12} sm={4} md={3} lg={3}>
					<FormGroup>
						<Label>{this.state.documentType}</Label>
						<InputMask mask={documentTypeMask} placeholder={''} name='documentValue' value={this.state.documentValue} onChange={this.handleChange} />
						{this.state.error.documentType && <Error>{this.state.error.documentType}</Error>}
					</FormGroup>
				</Col>

			</Row>

			<Row>

				<Col xs={4} sm={2} md={2} lg={1}>
					<FormGroup>
						<Label>DDD</Label>
						<InputMask name='phoneAreaCode' mask="11" placeholder="" value={this.state.phoneAreaCode} onChange={this.handleChange} />
						{this.state.error.phoneAreaCode && <Error>{this.state.error.phoneAreaCode}</Error>}
					</FormGroup>
				</Col>

				<Col xs={8} sm={3} md={3} lg={2}>
					<FormGroup>
						<Label>Telefone</Label>
						<InputMask mask="111111111" placeholder="" name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleChange} />
						{this.state.error.phoneNumber && <Error>{this.state.error.phoneNumber}</Error>}
					</FormGroup>
				</Col>

				<Col xs={12} sm={7} md={7} lg={4}>
					<FormGroup>
						<Label>Email</Label>
						<Input name='email' value={this.state.email} onChange={this.handleChange} />
						{this.state.error.email && <Error>{this.state.error.email}</Error>}
					</FormGroup>
				</Col>

				<Col xs={12} sm={12} lg={5}>
					<FormGroup>
						<Label>Nome completo</Label>
						<Input name='name' value={this.state.name} onChange={this.handleChange} />
						{this.state.error.name && <Error>{this.state.error.name}</Error>}
					</FormGroup>
				</Col>

				<Col xs={12}>
					<Actions>
						<Button color="success" onClick={this.submit}>AVANÇAR</Button>
					</Actions>
				</Col>

			</Row>
		</React.Fragment>
	}
}
