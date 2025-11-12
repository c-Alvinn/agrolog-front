import React, { useEffect, useState } from 'react';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import NavBar from '../../components/NavBar';
import InputGroup from '../../components/InputGroup';
import { useParams } from 'react-router-dom';
import { defaultTheme, type ThemeColors } from '../../themes/theme';
import { loadTheme } from '../../themes/themeLoader';

const MotoristaAlterarSenha: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const { urlToken } = useParams<{ urlToken: string }>();
	const [novaSenha, setNovaSenha] = useState('');
	const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
	const [senhaError, setSenhaError] = useState('');
	const [confirmacaoError, setConfirmacaoError] = useState('');

	const handleConfirmar = (e: React.FormEvent) => {
		e.preventDefault();

		let hasError = false;

		setSenhaError('');
		setConfirmacaoError('');

		if (novaSenha.length < 8) {
			setSenhaError('A nova senha deve ter no mínimo 8 caracteres.');
			hasError = true;
		}

		if (novaSenha !== confirmarNovaSenha) {
			setConfirmacaoError('As senhas não coincidem.');
			hasError = true;
		} else if (!confirmarNovaSenha) {
			setConfirmacaoError('Confirme sua nova senha.');
			hasError = true;
		}

		if (hasError) {
			alert('Por favor, corrija os campos destacados.');
			return;
		}

		const dados = {
			urlToken,
			novaSenha,
		};

		alert(
			'Senha alterada com sucesso! Redirecionando para o login.' + dados
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

	const confirmarButtonStyles: React.CSSProperties = {
		...MotoristaStyles.submitButton,
		backgroundColor: theme.secondary,
		color: theme.text.primary,
		boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
	};

	return (
		<div style={containerStyle}>
			<NavBar
				title='Alterar Senha'
				showBackButton={true}
				theme={theme}
				empresa={empresa}
			/>

			<div style={{ ...contentStyle, paddingBottom: '90px' }}>
				<form
					onSubmit={handleConfirmar}
					style={{ width: '100%', maxWidth: '400px' }}
				>
					<InputGroup
						label='Nova Senha'
						value={novaSenha}
						onChange={(e) => setNovaSenha(e.target.value)}
						placeholder='Digite sua nova senha'
						type='password'
						error={senhaError}
						theme={theme}
					/>

					<InputGroup
						label='Confirmar Nova Senha'
						value={confirmarNovaSenha}
						onChange={(e) => setConfirmarNovaSenha(e.target.value)}
						placeholder='Confirme sua nova senha'
						type='password'
						error={confirmacaoError}
						theme={theme}
					/>
				</form>
			</div>

			<button
				type='submit'
				style={confirmarButtonStyles}
				onClick={handleConfirmar}
				onMouseEnter={(e) =>
					(e.currentTarget.style.filter = 'brightness(85%)')
				}
				onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
			>
				Confirmar
			</button>
		</div>
	);
};

export default MotoristaAlterarSenha;
