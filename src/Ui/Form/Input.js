import React from 'react';
import styled, {css} from 'styled-components';
import * as THEME from '../theme';

const Input = styled.input`
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

export default (props) => <Input className="ps-react-input" {...props} />
