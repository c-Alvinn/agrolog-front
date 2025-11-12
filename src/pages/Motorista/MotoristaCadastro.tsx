import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import InputGroup from '../../components/InputGroup';
import Logo from '../../components/Logo';
import { loadTheme } from '../../themes/themeLoader';
import { defaultTheme, type ThemeColors } from '../../themes/theme';

const MotoristaCadastro: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
	const [cpf, setCpf] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');
	const [nomeCompleto, setNomeCompleto] = useState('');
	const [telefone, setTelefone] = useState('');
	const navigate = useNavigate();
	const [nomeError, setNomeError] = useState('');
	const [cpfError, setCpfError] = useState('');
	const [telefoneError, setTelefoneError] = useState('');
	const [senhaError, setSenhaError] = useState('');
	const [confirmarSenhaError, setConfirmarSenhaError] = useState('');
	const [alturaTela, setAlturaTela] = useState(window.innerHeight);

	useEffect(() => {
		setAlturaTela(window.innerHeight);
		window.addEventListener('resize', () =>
			setAlturaTela(window.innerHeight)
		);

		return () => {
			window.removeEventListener('resize', () =>
				setAlturaTela(window.innerHeight)
			);
		};
	}, []);

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const handleCadastro = (e: React.FormEvent) => {
		e.preventDefault();

		setNomeError('');
		setCpfError('');
		setTelefoneError('');
		setSenhaError('');
		setConfirmarSenhaError('');

		let hasError = false;
		const numericCpf = cpf.replace(/\D/g, '');
		const numericTelefone = telefone.replace(/\D/g, '');

		if (nomeCompleto.length <= 2) {
			setNomeError('O nome completo deve ter mais de 2 caracteres.');
			hasError = true;
		}
		if (numericCpf.length !== 11) {
			setCpfError('O CPF deve conter 11 dígitos.');
			hasError = true;
		}
		if (numericTelefone.length !== 11) {
			setTelefoneError(
				'O Telefone deve conter 11 dígitos (incluindo DDD).'
			);
			hasError = true;
		}
		if (senha.length < 6) {
			setSenhaError('A senha deve ter no mínimo 6 caracteres.');
			hasError = true;
		}
		if (confirmarSenha.length < 6) {
			setConfirmarSenhaError(
				'A confirmação deve ter no mínimo 6 caracteres.'
			);
			hasError = true;
		}
		if (senha !== confirmarSenha) {
			setConfirmarSenhaError('As senhas não são iguais.');
			setSenhaError('As senhas não são iguais.');
			hasError = true;
		}

		if (!hasError) {
			alert('Cadastro realizado com sucesso! Faça login.');
			navigate(
				empresa === 'AgroLog' ? '/motorista' : `/${empresa}/motorista`
			);
		}
	};

	const handleLoginScreen = () => {
		navigate(
			empresa === 'AgroLog'
				? '/motorista/login'
				: `/${empresa}/motorista/login`
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
		justifyContent: alturaTela <= 850 ? 'flex-start' : 'center',
		padding: alturaTela <= 850 ? '30px 0 30px' : '',
	};

	const formContainer = {
		...MotoristaStyles.formContainer,
		backgroundColor: theme.cardBackground,
	};

	const linkStyle = {
		...MotoristaStyles.linkStyle,
		color: theme.primary,
	};

	return (
		<div style={mainContainer}>
			<form onSubmit={handleCadastro} style={formContainer}>
				<div style={MotoristaStyles.logoContainer}>
					<Logo theme={theme} />
					<h2
						style={{
							color: theme.text.secondary,
							margin: 0,
							fontSize: '0.9rem',
						}}
					>
						Cadastro
					</h2>
				</div>

				<InputGroup
					label='Nome Completo'
					type='text'
					value={nomeCompleto}
					onChange={(e) => setNomeCompleto(e.target.value)}
					placeholder='João da Silva'
					theme={theme}
					error={nomeError}
				/>

				<InputGroup
					label='CPF'
					type='text'
					value={cpf}
					onChange={(e) => setCpf(e.target.value)}
					placeholder='000.000.000-00'
					mask='cpf'
					theme={theme}
					error={cpfError}
				/>

				<InputGroup
					label='Número de Telefone'
					type='tel'
					value={telefone}
					onChange={(e) => setTelefone(e.target.value)}
					placeholder='(00) 90000-0000'
					mask='phone'
					theme={theme}
					error={telefoneError}
				/>

				<InputGroup
					label='Senha'
					type='password'
					value={senha}
					onChange={(e) => setSenha(e.target.value)}
					placeholder='Senha'
					theme={theme}
					error={senhaError}
				/>

				<InputGroup
					label='Confirmar Senha'
					type='password'
					value={confirmarSenha}
					onChange={(e) => setConfirmarSenha(e.target.value)}
					placeholder='Confirmar Senha'
					theme={theme}
					error={confirmarSenhaError}
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
					Cadastrar
				</button>

				<button
					type='button'
					onClick={handleLoginScreen}
					style={linkStyle}
					onMouseEnter={(e) =>
						(e.currentTarget.style.filter = 'brightness(120%)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.filter = 'none')
					}
				>
					Voltar a Acesso a Área do Motorista
				</button>
			</form>
		</div>
	);
};

export default MotoristaCadastro;
