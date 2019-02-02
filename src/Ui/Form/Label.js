import React from 'react';
import styled, { css } from 'styled-components';
import * as THEME from '../theme';

const Label = styled.label`
	margin-bottom: 0.6em;
	font-weight: bold;
	font-size: 0.9em;
	widht: 100%;
	display: block;
	color: ${THEME.PRIMARY_DARK_COLOR};
`;

export default (props) => <Label className="ps-react-label" {...props}>{props.children}</Label>
