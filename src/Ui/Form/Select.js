import React from 'react';
import styled, { css } from 'styled-components';
import * as THEME from '../theme';
import arrowDown from './assets/arrowDown.svg';

const Select = styled.select`

	font-size:0.89em;
	font-family:inherit;
	background:#FFF;
	color: ${THEME.PRIMARY_DARK_COLOR};
	border:1px solid ${THEME.SECONDARY_COLOR};
	padding:0.8em 1.2em;
	-webkit-appearance: none;
	appearance: none;
	cursor:pointer;
	outline: none;
	padding-right: 60px;
	background-image:url(${arrowDown});
	background-repeat:no-repeat;
	background-size: 27px 22px;
	background-position: right 14px center;
	width: 100%;
	box-sizing: border-box;
	border-radius: 0.2em;

	${props => props.disabled && `
		background: ${THEME.DEFAULT_COLOR};
	`}



`;

export default (props) => <Select className="ps-react-select" {...props}></Select>
