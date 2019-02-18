import React from 'react';
import styled, {css} from 'styled-components';

const Form = styled.form`
`;

export default (props) => <Form className="ps-react-form" {...props}>{props.children}</Form>
