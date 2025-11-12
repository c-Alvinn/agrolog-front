import React, { useEffect, useState } from 'react';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import NavBar from '../../components/NavBar';
import ProfileDetailItem from '../../components/ProfileDetailItem';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultTheme, type ThemeColors } from '../../themes/theme';
import { loadTheme } from '../../themes/themeLoader';

const MotoristaPerfil: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
	const navigate = useNavigate();

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const motoristaData = {
		nomeCompleto: 'João da Silva Motorista',
		cpf: 'XXX.XXX.XXX-XX',
		telefone: '(XX) XXXXX-XXXX',
	};

	const handleEditar = () =>
		navigate(
			empresa === 'AgroLog'
				? '/motorista/perfil/editar'
				: `/${empresa}/motorista/perfil/editar`
		);
	const handleTrocarSenha = () =>
		alert('Link enviado para seu numero de telefone.');
	const handleSair = () => {
		if (window.confirm('Tem certeza que deseja sair da sua conta?')) {
			navigate(
				empresa === 'AgroLog'
					? '/motorista/login'
					: `/${empresa}/motorista/login`
			);
		}
	};

	const containerStyle: React.CSSProperties = {
		...MotoristaStyles.mainContainer,
		backgroundColor: theme.background,
		justifyContent: 'flex-start',
	};

	const contentStyle: React.CSSProperties = {
		width: '100%',
		maxWidth: '600px',
		padding: '25px',
		boxSizing: 'border-box',
		marginTop: '60px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};

	const sairButtonStyles: React.CSSProperties = {
		...MotoristaStyles.linkStyle,
		color: theme.status.error,
		fontWeight: 'bold',
		marginTop: '20px',
		fontSize: '1rem',
		display: 'flex',
		alignItems: 'center',
		gap: '5px',
		textDecoration: 'none',
		transition: '0.2s ease',
	};

	const primaryButtonStyles: React.CSSProperties = {
		...MotoristaStyles.submitButton,
		backgroundColor: theme.secondary,
		color: theme.text.primary,
		width: '100%',
		maxWidth: '350px',
		padding: '15px 20px',
		marginTop: '30px',
	};

	const secondaryButtonStyles: React.CSSProperties = {
		...MotoristaStyles.submitButton,
		backgroundColor: theme.cardBackground,
		color: theme.primary,
		width: '100%',
		maxWidth: '350px',
		padding: '15px 20px',
		marginTop: '15px',
		border: `1px solid ${theme.primary}`,
		boxShadow: 'none',
	};

	return (
		<div style={containerStyle}>
			<NavBar
				title='Meu Perfil'
				showBackButton={true}
				theme={theme}
				empresa={empresa}
			/>

			<div style={contentStyle}>
				<div
					style={{
						backgroundColor: theme.cardBackground,
						borderRadius: '15px',
						padding: '25px',
						marginBottom: '30px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						width: '100%',
						maxWidth: '400px',
					}}
				>
					<h3
						style={{
							margin: '0 0 15px 0',
							fontSize: '1rem',
							fontWeight: 'bold',
							color: theme.text.primary,
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
						}}
					>
						<PersonIcon style={{ color: theme.primary }} />
						Informações Pessoais
					</h3>

					<ProfileDetailItem
						label='Nome Completo'
						value={motoristaData.nomeCompleto}
						theme={theme}
					/>

					<ProfileDetailItem
						label='CPF'
						value={motoristaData.cpf}
						theme={theme}
					/>

					<ProfileDetailItem
						label='Telefone'
						value={motoristaData.telefone}
						isLast={true}
						theme={theme}
					/>
				</div>

				<button
					style={primaryButtonStyles}
					onClick={handleEditar}
					onMouseEnter={(e) =>
						(e.currentTarget.style.filter = 'brightness(85%)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.filter = 'none')
					}
				>
					Editar Perfil
				</button>

				<button
					style={secondaryButtonStyles}
					onClick={handleTrocarSenha}
					onMouseEnter={(e) =>
						(e.currentTarget.style.filter = 'brightness(85%)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.filter = 'none')
					}
				>
					Trocar Senha
				</button>

				<button
					style={sairButtonStyles}
					onClick={handleSair}
					onMouseEnter={(e) =>
						(e.currentTarget.style.filter = 'brightness(85%)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.color =
							e.currentTarget.style.filter =
								'none')
					}
				>
					<ExitToAppIcon style={{ fontSize: '1.2rem' }} />
					Sair
				</button>
			</div>
		</div>
	);
};

export default MotoristaPerfil;
