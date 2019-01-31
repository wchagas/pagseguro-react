import React from 'react';
import styled, {css} from 'styled-components';

const Loading = styled.div`
  width: 2em;
  height: 2em;

  ${props => props.size == 'lg' && css`
    width: 2.5em;
    height: 2.5em;
  `}

  ${props => props.size == 'md' && css`
    width: 1.5em;
    height: 1.5em;
  `}

  ${props => props.size == 'xs' && css`
    width: 1em;
    height: 1em;
  `}

  ${props => props.center && css`
      top: 30%;
      left: 46%;
  `}

  position: absolute;
  margin:0;
  vertical-align: middle;
  display: inline-block;
  text-indent:-99em;
  overflow:hidden;
  animation:rotation .6s infinite linear;
  border-left: 3px solid #08bd75;
  border-right: 3px solid rgba(8, 189, 117, 0.36);
  border-bottom: 3px solid rgba(8, 189, 117, 0.73);
  border-top: 3px solid #08bd75;
  border-radius: 100%;
  z-index:1000;

  @keyframes rotation {
    from {transform:rotate(0deg);}
    to {transform:rotate(359deg);}
  }
`;


export default props => <Loading  className="ps-react-loading" {...props} />
