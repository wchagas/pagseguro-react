import { css } from 'styled-components'

const sizes = {
	large: 1500,
	desktop: 992,
	tablet: 768,
	phone: 376
}


export const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
		${css(...args)}
    }
	`
	return acc
}, {})

export const PRIMARY_COLOR = '#7d7d7d';
export const PRIMARY_LIGHT_COLOR = '#616161';
export const PRIMARY_DARK_COLOR = '#3a3a3a';

export const PRIMARY_GRADIENT = 'linear-gradient(to right top, #09c96f, #0bca68, #10cc60, #17cd58, #1ece4f);'

export const SECONDARY_COLOR = '#d6d6d6';
export const SECONDARY_LIGHT_COLOR = '#f5f5f5';
export const SECONDARY_DARK_COLOR = '#d2d2d2';

// export const INFO_COLOR             = '#1a1e22';
// export const INFO_LIGHT_COLOR 		  = '#202428';
// export const INFO_DARK_COLOR  		  = '#131314';

export const SUCCESS_COLOR = '#08bd75';
export const SUCCESS_LIGHT_COLOR = '#07ce7f';
export const SUCCESS_DARK_COLOR = '#108657';

// export const WARNING_COLOR           = '#dcb400';
// export const WARNING_LIGHT_COLOR 	= '#fbd116';
// export const WARNING_DARK_COLOR  	= '#ccae29';

export const DANGER_COLOR = '#d42d0a';
export const DANGER_LIGHT_COLOR = '#ff2c00';
export const DANGER_DARK_COLOR = '#821d08';

export const OVERLAY_COLOR = 'rgba(63, 111, 170, 0.85)';



/**
 * FORMS
*/

export const STEPS_BACKGROUND = SECONDARY_LIGHT_COLOR;


// Buttons

export const STEPS_BUTTON = SUCCESS_DARK_COLOR;
export const STEPS_BUTTON_HOVER = SUCCESS_LIGHT_COLOR;
export const STEPS_BUTTON_BACKGROUND = SECONDARY_LIGHT_COLOR;

export const STEPS_BUTTON_ACTIVE = SUCCESS_COLOR;
export const STEPS_BUTTON_BACKGROUND_ACTIVE = SECONDARY_LIGHT_COLOR;

export const STEPS_BUTTON_DISABLE = '#9e9e9e';
export const STEPS_BUTTON_BACKGROUND_DISABLE = SECONDARY_LIGHT_COLOR;
