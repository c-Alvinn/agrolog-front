import React from 'react';
import { Link } from 'react-router-dom';
import { type ThemeColors } from '../themes/theme';

interface OptionCardProps {
	title: string;
	icon: string;
	to: string;
	theme: ThemeColors;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, icon, to, theme }) => {
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<Link
			to={to}
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				width: 'calc(100% - 40px)',
				maxWidth: '400px',
				padding: '15px 20px',
				margin: '10px 0',
				borderRadius: '10px',
				backgroundColor: isHovered
					? theme.status.success
					: theme.secondary,
				color: theme.text.primary,
				textDecoration: 'none',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
				transition: 'transform 0.2s, background-color 0.2s',
				cursor: 'pointer',
				transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div style={{ fontSize: '1.8rem', marginRight: '15px' }}>
				{icon}
			</div>
			<h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
				{title}
			</h2>
		</Link>
	);
};

export default OptionCard;
