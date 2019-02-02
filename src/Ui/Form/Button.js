import React from 'react';
import styled, { css } from 'styled-components';
import * as THEME from '../theme';

const Button = styled.button`

	background: ${THEME.SECONDARY_COLOR};
	color: ${THEME.PRIMARY_DARK_COLOR};
	text-transform: uppercase;
	padding: 0.8em 1em;
	font-size: 0.9em;
	font-weight: normal;
	border: none;
	cursor: pointer;
	text-decoration: none;
	outline: none;
	border-radius: 0.2em;

	&:hover {
		color: ${THEME.PRIMARY_DARK_COLOR};
		background: ${THEME.SECONDARY_LIGHT_COLOR};
	}

	${props => props.color == 'success' && css`
		background: ${THEME.PRIMARY_GRADIENT};
		color: #fff;
		&:hover {
			color: #fff;
			background: ${THEME.SUCCESS_LIGHT_COLOR};
		}
	`}

	${props => props.color == 'secondary' && css`
		background: ${THEME.PRIMARY_DARK_COLOR};
		color: #fff;
		&:hover {
			color: #fff;
			background: ${THEME.PRIMARY_COLOR};
		}
	`}

    :disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }

`;


export default (props) => (
	<Button
		className={`ps-react-btn ${props.color ? 'ps-react-btn-' + props.color : ''} ${props.size ? ' ps-react-btn-' + props.size : ''}`}
		{...props}
	>
		{props.children}
	</Button>
)
