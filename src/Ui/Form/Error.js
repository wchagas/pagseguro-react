import React from 'react';
import styled, {css} from 'styled-components';
import * as THEME from '../theme';

const Error = styled.div`
  margin: 6px 0 10px 0;
  color: ${THEME.DANGER_COLOR};
  font-size: 0.8em;
`;

export default (props) => <Error className={`ps-react-error`} {...props}>{props.children}</Error>
