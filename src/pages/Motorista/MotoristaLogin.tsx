import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import InputGroup from '../../components/InputGroup';
import Logo from '../../components/Logo';
import { loadTheme } from '../../themes/themeLoader';
import { defaultTheme, type ThemeColors } from '../../themes/theme';

const MotoristaLogin: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
	const [cpf, setCpf] = useState('');
	const [senha, setSenha] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		if (cpf.replace(/\D/g, '').length === 11 && senha.length >= 6) {
			navigate(
				empresa === 'AgroLog'
					? '/motorista/home'
					: `/${empresa}/motorista/home`
			);
		} else {
			alert(
				'Por favor, preencha o CPF (11 dígitos) e a Senha (mínimo 6 caracteres) corretamente.'
			);
		}
	};

	const handleCadastroClick = () => {
		navigate(
			empresa === 'AgroLog'
				? '/motorista/cadastro'
				: `/${empresa}/motorista/cadastro`
		);
	};

	const handleForgotPassClick = () => {
		navigate(
			empresa === 'AgroLog'
				? '/motorista/recuperar-senha'
				: `/${empresa}/motorista/recuperar-senha`
		);
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

	const linkStyle = {
		...MotoristaStyles.linkStyle,
		color: theme.primary,
	};

	const cadastroLinkStyle = {
		...MotoristaStyles.cadastroLinkStyle,
		color: theme.text.secondary,
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
						Acesso a Área do Motorista
					</h2>
				</div>

				<InputGroup
					label='CPF'
					type='text'
					value={cpf}
					onChange={(e) => setCpf(e.target.value)}
					placeholder='000.000.000-00'
					mask='cpf'
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

				<button
					type='button'
					onClick={handleForgotPassClick}
					style={linkStyle}
					onMouseEnter={(e) =>
						(e.currentTarget.style.filter = 'brightness(120%)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.filter = 'none')
					}
				>
					Esqueceu sua senha?
				</button>

				<p style={cadastroLinkStyle}>
					Não tem uma conta?
					<button
						type='button'
						onClick={handleCadastroClick}
						style={{
							background: 'none',
							border: 'none',
							padding: 0,
							color: theme.primary,
							fontWeight: 'bold',
							cursor: 'pointer',
							textDecoration: 'underline',
							transition: '0.35s ease',
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.filter = 'brightness(120%)')
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.filter = 'none')
						}
					>
						Cadastre-se
					</button>
				</p>
			</form>
		</div>
	);
};

export default MotoristaLogin;
