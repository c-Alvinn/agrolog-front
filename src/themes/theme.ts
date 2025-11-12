import logoWhite from '../assets/logo-fundo-claro.png';
import logo from '../assets/logo.png';
import icon from '../assets/icon.png';

interface StatusColors {
	success: string;
	warning: string;
	info: string;
	error: string;
}

interface TextColors {
	primary: string;
	secondary: string;
	onDark: string;
}

interface ThemeAssets {
	icon: string;
	logo: string;
	logoWhite: string;
}

export interface ThemeColors {
	primary: string;
	secondary: string;
	background: string;
	cardBackground: string;
	text: TextColors;
	status: StatusColors;
	assets: ThemeAssets;
}

export const defaultTheme: ThemeColors = {
	primary: '#004D40',
	secondary: '#AEEA00',
	background: '#F1F8E9',
	cardBackground: '#FFFFFF',

	text: {
		primary: '#212121',
		secondary: '#757575',
		onDark: '#FFFFFF',
	},

	status: {
		success: '#4CAF50',
		warning: '#C5E1A5',
		info: '#80CBC4',
		error: '#B71C1C',
	},

	assets: {
		icon: icon,
		logo: logo,
		logoWhite: logoWhite,
	},
};
