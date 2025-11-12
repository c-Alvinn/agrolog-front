import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { ThemeColors } from '../themes/theme';

type IconType = 'embarque' | 'desembarque' | 'fila';

interface NavigationCardProps {
	iconType: IconType;
	title: string;
	subtitle: string;
	to: string;
	theme: ThemeColors;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
	iconType,
	title,
	subtitle,
	to,
	theme,
}) => {
	const navigate = useNavigate();

	const getIcon = (type: IconType) => {
		const iconStyle: React.CSSProperties = {
			fontSize: '3rem',
			borderRadius: '12px',
			padding: '10px',
			marginRight: '20px',
		};

		switch (type) {
			case 'embarque':
				return (
					<ArrowUpwardIcon
						style={{
							...iconStyle,
							backgroundColor: theme.background,
							color: theme.primary,
						}}
					/>
				);
			case 'desembarque':
				return (
					<ArrowDownwardIcon
						style={{
							...iconStyle,
							backgroundColor: theme.background,
							color: theme.primary,
						}}
					/>
				);
			case 'fila':
				return (
					<FormatListBulletedIcon
						style={{
							...iconStyle,
							backgroundColor: theme.background,
							color: theme.primary,
						}}
					/>
				);
			default:
				return null;
		}
	};

	const cardStyle: React.CSSProperties = {
		width: '90%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.cardBackground,
		borderRadius: '15px',
		padding: '1rem',
		marginBottom: '20px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
		cursor: 'pointer',
		transition: '0.2s ease',
	};

	return (
		<div
			style={cardStyle}
			onClick={() => navigate(to)}
			onMouseEnter={(e) =>
				(e.currentTarget.style.filter = 'brightness(90%)')
			}
			onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
		>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{getIcon(iconType)}
				<div>
					<h3
						style={{
							margin: 0,
							color: theme.text.primary,
							fontSize: '1.2rem',
							fontWeight: 'bold',
						}}
					>
						{title}
					</h3>
					<p
						style={{
							margin: '3px 0 0 0',
							color: theme.text.secondary,
							fontSize: '0.9rem',
						}}
					>
						{subtitle}
					</p>
				</div>
			</div>
			<ArrowForwardIosIcon
				style={{ color: theme.text.secondary, fontSize: '1.2rem' }}
			/>
		</div>
	);
};

export default NavigationCard;
