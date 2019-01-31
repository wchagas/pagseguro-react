import React from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import styled from 'styled-components';
import DirectPayment from "../Component/DirectPayment"


const Session = styled(Col) `
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #ddd;
`

const Title = styled.h1 `
    margin: 20px 0;
`

const Description = styled.div `
    margin: 40px 0 20px 0;
    line-height: 22px;

    p{
        margin-bottom: 20px;
    }
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
                    <DirectPayment />
                    <Description>
						<p>
                       	Mi class luctus metus sodales aliquam lacus, rutrum nostra aliquet aenean etiam, volutpat cras adipiscing sagittis ultrices. laoreet elementum leo bibendum libero urna dictumst hac quam senectus, accumsan cursus mi donec nec dapibus risus molestie. cubilia viverra neque suspendisse ut felis posuere netus, quisque vestibulum inceptos molestie tempus risus, pulvinar augue curabitur porta erat vestibulum. tempus proin tempus felis imperdiet semper vestibulum aenean odio, gravida quisque tempor quisque purus aliquet enim nunc donec, aptent suscipit scelerisque risus per eget est. luctus semper ipsum vitae integer lobortis vel fames augue praesent class habitasse, dapibus inceptos litora in ac imperdiet augue dictum justo massa. 
						</p>
						<p>
	Auctor fringilla bibendum gravida vestibulum odio interdum elementum phasellus per mattis, luctus curabitur felis libero blandit himenaeos maecenas a leo vehicula, viverra leo mattis morbi nisl duis dictum orci tincidunt. pellentesque fusce ligula integer fusce suscipit habitasse dictumst, donec elementum sem himenaeos tempus primis, nostra quisque primis ad porta praesent nec, eleifend nec lorem nisi morbi. convallis lacinia donec sagittis euismod nulla suspendisse vehicula aliquet risus, eleifend fames lectus class id ut arcu scelerisque, eleifend egestas ante in bibendum ipsum sodales a. malesuada sagittis consequat in facilisis at, amet commodo tellus feugiat elit placerat, netus hendrerit sodales lobortis.  
						</p>
					</Description>
                </Session>
            </Row>
        </Grid>
	}

}
