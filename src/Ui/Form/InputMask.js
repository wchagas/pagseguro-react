import React from 'react';
import styled, {css} from 'styled-components';
import MaskedInput from 'react-maskedinput';
import * as THEME from '../theme';
import Input from 	'./Input';

const CustomInput = (props) => (
	<MaskedInput
		mask="1111-WW-11"
		placeholder="1234-WW-12"
		size="11"
		{...props}
		formatCharacters={{
			'W': {
				validate(char) { return /\w/.test(char ) },
				transform(char) { return char.toUpperCase() }
			}
		}}
	/>
);

const InputMask = styled(CustomInput)`
	font-size:0.89em;
	font-family:inherit;
	background: #fff;
	color: ${THEME.PRIMARY_DARK_COLOR};
	border:1px solid ${THEME.SECONDARY_COLOR};
	padding:0.8em 1.2em;
	outline: none;
	width: 100%;
	box-sizing: border-box;
`;

export default (props) => <InputMask className="ps-react-input" {...props} />
