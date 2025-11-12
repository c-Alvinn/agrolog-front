import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import type { ThemeColors } from '../themes/theme';

interface NavBarProps {
	title: string;
	showBackButton?: boolean;
	theme: ThemeColors;
	empresa: string;
	showProfileButton?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
	title,
	showBackButton = false,
	theme,
	empresa,
	showProfileButton,
}) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	const handleProfileClick = () => {
		navigate(
			empresa === 'AgroLog'
				? '/motorista/perfil'
				: `/${empresa}/motorista/perfil`
		);
	};

	const renderLeftIcon = () => {
		if (showBackButton) {
			return (
				<div
					style={{
						color: theme.text.onDark,
						cursor: 'pointer',
						display: 'flex',
					}}
					onClick={handleBack}
				>
					<ArrowBackIcon fontSize='large' />
				</div>
			);
		}

		return (
			<div style={{ color: theme.text.onDark, display: 'flex' }}>
				<MenuIcon fontSize='large' style={{ visibility: 'hidden' }} />
			</div>
		);
	};

	return (
		<div
			style={{
				width: '100%',
				height: '60px',
				backgroundColor: theme.primary,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '0 15px',
				boxSizing: 'border-box',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 100,
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
			}}
		>
			{renderLeftIcon()}

			<h1
				style={{
					color: theme.text.onDark,
					fontSize: '1.4rem',
					fontWeight: 'bold',
					margin: 0,
				}}
			>
				{title}
			</h1>

			<div
				style={{ color: theme.text.onDark, cursor: 'pointer' }}
				onClick={handleProfileClick}
			>
				<PersonIcon
					fontSize='large'
					style={{
						visibility: showProfileButton ? 'visible' : 'hidden',
					}}
				/>
			</div>
		</div>
	);
};

export default NavBar;
