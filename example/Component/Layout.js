import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styled, { ThemeProvider } from 'styled-components'
import Header from './Header';

const theme = {
	flexboxgrid: {
		gridSize: 12,
		gutterWidth: 1.5,
		outerMargin: 2,
		mediaQuery: "only screen",
		container: {
			sm: 46,
			md: 61,
			lg: 76
		},
		breakpoints: {
			xs: 0,
			sm: 48,
			md: 64,
			lg: 75
		}
	}
};


export default class Layout extends React.Component {
	render() {
		return <ThemeProvider theme={theme}>
			<div>
				{this.props.children}
			</div>
		</ThemeProvider>;
	}
}
