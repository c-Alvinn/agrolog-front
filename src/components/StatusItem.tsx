import React from 'react';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { ThemeColors } from '../themes/theme';

type IconComponent = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
	muiName: string;
};

interface StatusItemProps {
	Icon: IconComponent;
	label: string;
	value: string;
	theme: ThemeColors;
}

const StatusItem: React.FC<StatusItemProps> = ({
	Icon,
	label,
	value,
	theme,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				padding: '10px 0',
				borderBottom: `1px solid ${theme.text.secondary}`,
			}}
		>
			<Icon
				style={{
					color: theme.primary,
					marginRight: '15px',
					fontSize: '1.8rem',
				}}
			/>
			<div style={{ flexGrow: 1 }}>
				<p
					style={{
						margin: 0,
						fontSize: '0.85rem',
						color: theme.text.secondary,
					}}
				>
					{label}
				</p>
				<p
					style={{
						margin: '2px 0 0 0',
						fontSize: '1rem',
						fontWeight: 'bold',
						color: theme.text.primary,
					}}
				>
					{value}
				</p>
			</div>
		</div>
	);
};

export default StatusItem;
