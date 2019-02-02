import React from 'react';
import PropTypes from 'prop-types';
import { PAGSEGURO_API } from '../config';
import { Loading } from '../Ui';

export default class LoadLibrary extends React.Component {


    /**
    * propTypes
    */
	static propTypes = {
		env: PropTypes.string.isRequired
	}



    /**
    * constructor
    *
    * @param {Object} props
    */
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		}
	}



    /**
    * onLoad
    */
	onLoad() {
		this.setState({ loaded: true })
	}



    /**
    * componentDidMount
    */
	componentDidMount() {

		const { env } = this.props;
		const { loaded } = this.state;

		if (!PAGSEGURO_API.hasOwnProperty(env)) {
			throw new TypeError('ENV incorreto! Utilize production ou sandbox');
		}

		if (loaded || document.querySelector(`script[src="${PAGSEGURO_API[env]}"]`)) {
			this.setState({ loaded: true });
			return;
		}

		const tag = document.createElement('script');
		tag.type = 'text/javascript';
		tag.src = PAGSEGURO_API[env];
		tag.onload = this.onLoad.bind(this);

		document.body.appendChild(tag);
	}



    /**
    * render
    */
	render() {
		return this.state.loaded ? (this.props.children) : <Loading size="lg" center />
	}

}
