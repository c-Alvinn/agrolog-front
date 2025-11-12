import React from 'react';
import type { ThemeColors } from '../themes/theme';

interface ProfileDetailItemProps {
	label: string;
	value: string;
	isLast?: boolean;
	theme: ThemeColors;
}

const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({
	label,
	value,
	isLast,
	theme,
}) => {
	return (
		<div
			style={{
				padding: '10px 0',
				borderBottom: isLast ? 'none' : `1px solid ${theme.primary}`,
			}}
		>
			<p
				style={{
					margin: '0 0 5px 0',
					fontSize: '0.8rem',
					color: theme.text.secondary,
				}}
			>
				{label}
			</p>
			<p
				style={{
					margin: 0,
					fontSize: '1rem',
					fontWeight: 'bold',
					color: theme.text.primary,
				}}
			>
				{value}
			</p>
		</div>
	);
};

export default ProfileDetailItem;
