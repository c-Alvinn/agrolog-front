import type React from 'react';
import type { ThemeColors } from '../themes/theme';

interface Props {
	theme: ThemeColors;
}

const LogoWhite: React.FC<Props> = ({ theme }) => {
	return (
		<img
			src={theme.assets.logoWhite}
			alt='AgroLog Logo Fundo Branco'
			style={{
				height: '40px',
				verticalAlign: 'middle',
				borderRadius: '5px',
			}}
		/>
	);
};

export default LogoWhite;
