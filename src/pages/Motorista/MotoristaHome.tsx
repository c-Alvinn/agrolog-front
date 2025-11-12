import React, { useEffect, useState } from 'react';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import NavBar from '../../components/NavBar';
import NavigationCard from '../../components/NavigationCard';
import { useParams } from 'react-router-dom';
import { loadTheme } from '../../themes/themeLoader';
import { defaultTheme, type ThemeColors } from '../../themes/theme';

const MotoristaHome: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const homeContainerStyle: React.CSSProperties = {
		...MotoristaStyles.mainContainer,
		backgroundColor: theme.background,
		backgroundImage: 'none',
		justifyContent: 'flex-start',
	};

	const contentStyle: React.CSSProperties = {
		width: '100%',
		maxWidth: '600px',
		boxSizing: 'border-box',
		marginTop: '60px',
	};

	const listStyle: React.CSSProperties = {
		width: '100%',
		padding: '25px',
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
	};

	return (
		<div style={homeContainerStyle}>
			<div style={contentStyle}>
				<NavBar
					title='Menu'
					theme={theme}
					empresa={empresa}
					showProfileButton={true}
				/>

				<div style={listStyle}>
					<NavigationCard
						iconType='embarque'
						title='Embarque'
						subtitle='Iniciar processo de embarque'
						to={
							empresa === 'AgroLog'
								? '/motorista/embarque'
								: `/${empresa}/motorista/embarque`
						}
						theme={theme}
					/>

					<NavigationCard
						iconType='fila'
						title='Fila (Consulta)'
						subtitle='Consultar sua posição na fila'
						to={
							empresa === 'AgroLog'
								? '/motorista/fila'
								: `/${empresa}/motorista/fila`
						}
						theme={theme}
					/>
				</div>
			</div>
		</div>
	);
};

export default MotoristaHome;
