import React from 'react';
import styled, {css} from 'styled-components';
import * as THEME from '../theme';

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 1em;
  widht: 100%;
  display: block;
  color: ${THEME.PRIMARY_DARK_COLOR};
`;

export default (props) => <Label className="ps-react-label" {...props}>{props.children}</Label>
