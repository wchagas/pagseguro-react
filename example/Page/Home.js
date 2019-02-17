import React from 'react'
import { Grid, Row, Col } from '../../src/Ui/Grid'
import styled from 'styled-components';
import DirectPayment from "../Component/DirectPayment"

const DirectPaymentContainer = styled.div`
	width: 100%;
	max-width: 1024px;
	margin: 6em auto 0;
`

export default class Component extends React.Component {



    /**
     * displayName
     */
	static displayName = 'Page/Home'



	/**
	 * constructor
	 * @param {Object} props
	 */
	constructor(props) {
		super(props)
	}



	/**
	 * render
	 */
	render() {
		return <Grid>
			<DirectPaymentContainer>
				<DirectPayment />
			</DirectPaymentContainer>
		</Grid>

	}

}
