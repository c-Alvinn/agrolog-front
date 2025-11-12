import type React from 'react';
import type { ThemeColors } from '../themes/theme';

interface Props {
	theme: ThemeColors;
}

const Logo: React.FC<Props> = ({ theme }) => {
	return (
		<img
			src={theme.assets.logo}
			alt='AgroLog Logo'
			style={{
				height: '40px',
				verticalAlign: 'middle',
				borderRadius: '5px',
			}}
		/>
	);
};

export default Logo;
