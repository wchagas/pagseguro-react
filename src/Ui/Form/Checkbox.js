import React from 'react';
import styled, { css } from 'styled-components';
import * as THEME from '../theme';
import Label  from './Label'

const Container = styled.div `

    width: 100%;
    box-sizing: content-box;

    display: block;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    :hover input ~ span {
      background-color: ${THEME.GREY_COLOR};
    }

    input:checked ~ span {
      background-color: ${THEME.PRIMARY_COLOR};
    }

    input:checked ~ span:after {
      display: block;
    }

    span:after {
        left: 5px;
        top: 2px;
        width: 3px;
        height: 7px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`

const MyLabel =  styled(Label) `
    float: left;
    margin-top: -1px;
`

const Checkbox = styled.input `
    float:left;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`

const CheckMark = styled.span `
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: ${THEME.GREY_COLOR};
    border: 1px solid ${THEME.GREY_DARK_COLOR};

    :after {
        content: "";
        position: absolute;
        display: none;
    }
`

export default (props) => <Container className="ps-react-checkbox">
    <MyLabel>{props.label}
    <Checkbox type="checkbox" {...props} />
        <CheckMark />
    </MyLabel>
</Container>
