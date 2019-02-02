import React from 'react';
import styled, { ThemeProvider } from 'styled-components'

const theme = {
	flexboxgrid: {
		gridSize: 12
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
