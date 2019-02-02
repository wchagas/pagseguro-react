import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as THEME from '../../Ui/theme';

const Container = styled.div`
	padding: 1em 0 0;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
	margin: 0 0 1em 0;
	border-bottom: solid 1px #dadada;
	background: ${THEME.STEPS_BACKGROUND};
`;

const Buttons = styled.div`
	display: flex;
	justify-content: space-evenly;
	@media (max-width: 768px) {
		display: block;
	}
`;
const BtnCol = styled.div`
	flex: auto;
`;

const Button = styled.button`
	width: 100%;
	opacity: .5;
    border: none;
    outline:none;
    display: inline-block;
    margin: 0;
    cursor: pointer;
    padding: 1em 0;
	font-size: 0.9em;
	text-transform: uppercase;
	border-bottom: solid 2px transparent;
	color: ${THEME.STEPS_BUTTON};
	background: ${THEME.STEPS_BUTTON_BACKGROUND};

	:hover {
		color: ${THEME.STEPS_BUTTON_HOVER};
	}

	${props => props.active && css`
		opacity: 1;
        color: ${THEME.STEPS_BUTTON_ACTIVE};
		background: ${THEME.STEPS_BUTTON_BACKGROUND_ACTIVE};
		border-color: ${THEME.STEPS_BUTTON_ACTIVE};

		:hover {
			color: ${THEME.STEPS_BUTTON_ACTIVE};
		}
    `}

    :disabled {
        cursor: not-allowed;
		color: ${THEME.STEPS_BUTTON_DISABLE};
		background: ${THEME.STEPS_BUTTON_BACKGROUND_DISABLE};
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

		const { steps, onChange, active } = this.props;

		return <Container className="ps-react-step">
			<Buttons>
				{
					steps.map((item, key) => (
						<BtnCol key={key}>
							<Button
								disabled={item.disabled}
								active={active == item.name ? 'active' : ''}
								className={`ps-react-step ${active == item.name ? 'ps-react-step-active' : ''}`}
								onClick={onChange.bind(this, item.name, null)}
							>
								{item.displayName}
							</Button>
						</BtnCol>
					))
				}
			</Buttons>
		</Container>
	}
}
