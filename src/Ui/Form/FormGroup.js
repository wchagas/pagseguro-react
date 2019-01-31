import React from 'react';
import styled, {css} from 'styled-components';

const FormGroup = styled.div`
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;

    ${props => props.mbMd && css `
        margin-bottom: 30px;
    `}

`;

export default (props) => <FormGroup className="ps-react-form-group" {...props}>{props.children}</FormGroup>
