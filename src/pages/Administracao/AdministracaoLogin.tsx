import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import InputGroup from '../../components/InputGroup';
import Logo from '../../components/Logo';
import { loadTheme } from '../../themes/themeLoader';
import { defaultTheme, type ThemeColors } from '../../themes/theme';

const AdministracaoLogin: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
	const [usuario, setUsuario] = useState<string>('');
	const [senha, setSenha] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		if (usuario.length > 2 && senha.length >= 6) {
			navigate(
				empresa === 'AgroLog'
					? '/administracao/dashboard'
					: `/${empresa}/administracao/dashboard`
			);
		} else {
			alert(
				'Por favor, preencha o Usuario (mínimo 3 dígitos) e a Senha (mínimo 6 caracteres) corretamente.'
			);
		}
	};

	const loginButtonStyle: React.CSSProperties = {
		...MotoristaStyles.submitButton,
		marginTop: '25px',
		backgroundColor: theme.primary,
		color: theme.text.onDark,
		fontSize: '1.1rem',
	};

	const mainContainer = {
		...MotoristaStyles.mainContainer,
		backgroundColor: theme.background,
	};

	const formContainer = {
		...MotoristaStyles.formContainer,
		backgroundColor: theme.cardBackground,
	};

	return (
		<div style={mainContainer}>
			<form onSubmit={handleLogin} style={formContainer}>
				<div style={MotoristaStyles.logoContainer}>
					<Logo theme={theme} />
					<h2
						style={{
							color: theme.text.secondary,
							margin: 0,
							fontSize: '0.9rem',
						}}
					>
						Acesso a Área da Administração
					</h2>
				</div>

				<InputGroup
					label='Usuario'
					type='text'
					value={usuario}
					onChange={(e) => setUsuario(e.target.value)}
					placeholder='Usuario'
					theme={theme}
				/>

				<InputGroup
					label='Senha'
					type='password'
					value={senha}
					onChange={(e) => setSenha(e.target.value)}
					placeholder='Senha'
					theme={theme}
				/>

				<button
					type='submit'
					style={loginButtonStyle}
					onMouseEnter={(e) =>
						(e.currentTarget.style.filter = 'brightness(120%)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.filter = 'none')
					}
				>
					Entrar
				</button>
			</form>
		</div>
	);
};

export default AdministracaoLogin;
