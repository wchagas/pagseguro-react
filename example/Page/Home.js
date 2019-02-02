import React from 'react'
import { Grid, Row, Col } from '../../src/Ui/Grid'
import styled from 'styled-components';
import DirectPayment from "../Component/DirectPayment"


const Session = styled(Col)`
	margin-top: 2em;
	margin-bottom: 2em;
`

const Title = styled.h1`
    margin: 0 0 1.2m;
`

const Description = styled.div`
    margin: 2em 0;
	line-height: 1.5em;

    p{
        margin-bottom: 1.2em;
    }
`

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
			<Row>
				<Session xs={12}>
					<Title>Pagamento</Title>
					<Description>
						<p>
							Mi class luctus metus sodales aliquam lacus, rutrum nostra aliquet aenean etiam, volutpat cras adipiscing sagittis ultrices.
						</p>
						<p>
							Laoreet elementum leo bibendum libero urna dictumst hac quam senectus, accumsan cursus mi donec nec dapibus risus molestie. Cubilia viverra neque suspendisse ut felis posuere netus, quisque vestibulum inceptos molestie tempus risus, pulvinar augue curabitur porta erat vestibulum.
						</p>
					</Description>
					<DirectPaymentContainer>
						<DirectPayment />
					</DirectPaymentContainer>
				</Session>
			</Row>
		</Grid>

	}

}
