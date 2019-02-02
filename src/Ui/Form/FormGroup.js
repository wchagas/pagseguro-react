import React from 'react';
import styled, { css } from 'styled-components';

const FormGroup = styled.div`
    margin-bottom: 1.2em;
    position: relative;
    overflow: hidden;

    ${props => props.mbMd && css`
        margin-bottom: 2.4em;
    `}

`;

export default (props) => <FormGroup className="ps-react-form-group" {...props}>{props.children}</FormGroup>
