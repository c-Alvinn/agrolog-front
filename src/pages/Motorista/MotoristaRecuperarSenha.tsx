import React, { useEffect, useState } from 'react';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import NavBar from '../../components/NavBar';
import InputGroup from '../../components/InputGroup';
import { formatCPF } from '../../utils/inputMasks';
import { useParams } from 'react-router-dom';
import { defaultTheme, type ThemeColors } from '../../themes/theme';
import { loadTheme } from '../../themes/themeLoader';

const MotoristaRecuperarSenha: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const [cpf, setCpf] = useState('');
	const [cpfError, setCpfError] = useState('');

	const handleEnviarLink = (e: React.FormEvent) => {
		e.preventDefault();

		let hasError = false;
		setCpfError('');

		const numericCpf = cpf.replace(/\D/g, '');
		if (numericCpf.length !== 11) {
			setCpfError('CPF inválido. Deve conter 11 dígitos.');
			hasError = true;
		}

		if (hasError) {
			alert('Por favor, insira um CPF válido.');
			return;
		}

		const dados = {
			cpf: numericCpf,
		};

		alert(
			'Se o CPF estiver correto, você receberá um link de recuperação por SMS/Email.' +
				dados
		);
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

	const enviarButtonStyles: React.CSSProperties = {
		...MotoristaStyles.submitButton,
		backgroundColor: theme.secondary,
		color: theme.text.primary,
		boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
	};

	return (
		<div style={containerStyle}>
			<NavBar
				title='Recuperar Senha'
				showBackButton={true}
				theme={theme}
				empresa={empresa}
			/>

			<div style={{ ...contentStyle, paddingBottom: '30px' }}>
				<p
					style={{
						color: theme.text.primary,
						textAlign: 'center',
						marginBottom: '30px',
						fontSize: '1rem',
						maxWidth: '300px',
					}}
				>
					Informe seu CPF para enviarmos o link de recuperação.
				</p>

				<form
					onSubmit={handleEnviarLink}
					style={{ width: '100%', maxWidth: '400px' }}
				>
					<InputGroup
						label='CPF'
						value={cpf}
						onChange={(e) => setCpf(formatCPF(e.target.value))}
						placeholder='000.000.000-00'
						mask='cpf'
						type='text'
						error={cpfError}
						theme={theme}
					/>
				</form>
			</div>

			<button
				type='submit'
				style={enviarButtonStyles}
				onClick={handleEnviarLink}
				onMouseEnter={(e) =>
					(e.currentTarget.style.filter = 'brightness(85%)')
				}
				onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
			>
				Enviar
			</button>
		</div>
	);
};

export default MotoristaRecuperarSenha;
