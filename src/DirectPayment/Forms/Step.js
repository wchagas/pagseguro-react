import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as THEME from '../../Ui/theme';

const Container = styled.div`
    background: ${THEME.SUCCESS_COLOR};
    border-bottom: 1px solid ${THEME.SECONDARY_COLOR};
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 0 40px 0;
`;


const Buttons = styled.div`
    margin: auto;
    display: table;
`;

const Button = styled.button`
    background: none;
    border: none;
    outline:none;
    display: block;
    float: left;
    margin: 0 2em;
    cursor: pointer;
    padding: 18px;
    color: #FFF;
    text-transform: uppercase;

    ${props => props.active && css `
        color: #fff;
        background: ${THEME.SUCCESS_DARK_COLOR};
    `}

    :disabled {
        opacity: .5;
        cursor: not-allowed;
    }
`;


export default class Step extends React.Component {


    /**
    * propTypes
    */
    static propTypes = {
        steps: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
    }


    /**
    * constructor
    *
    * @param {Object} props
    */
    constructor(props) {
        super(props);
    }



    /**
    * render
    */
    render() {

        const { steps, onChange, active, disabled } = this.props;

        return <Container className="ps-react-step">
            <Buttons>
                {
                    steps.map((item, key) => (
                        <Button
                            className={`ps-react-step ${active == item.name ? 'ps-react-step-active' : ''}`}
                            key={key}
                            disabled={item.disabled}
    			 	        active={active == item.name ? 'active' : ''}
    				        onClick={this.props.onChange.bind(this, item.name, null)}
    				    >
                            {item.displayName}
			            </Button>
                    ))
                }
            </Buttons>
        </Container>
    }
}
