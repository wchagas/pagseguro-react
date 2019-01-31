import React from 'react';
import styled, {css} from 'styled-components';
import * as THEME from '../theme';

const Textarea = styled.textarea`
	font-size:0.89em;
	font-family:inherit;
	background: #fff;
	color: ${THEME.PRIMARY_DARK_COLOR};
	border:1px solid ${THEME.SECONDARY_COLOR};
	padding:0.9em 1.2em;
	outline: none;
	width: 100%;
	box-sizing: border-box;
`;

export default (props) => <Textarea className="ps-react-textarea" {...props}>{props.children}</Textarea>
