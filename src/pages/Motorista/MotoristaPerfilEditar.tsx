import React, { useEffect, useState } from 'react';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import NavBar from '../../components/NavBar';
import InputGroup from '../../components/InputGroup';
import { formatCPF, formatPhone } from '../../utils/inputMasks';
import { defaultTheme, type ThemeColors } from '../../themes/theme';
import { loadTheme } from '../../themes/themeLoader';
import { useParams } from 'react-router-dom';

const MotoristaPerfilEditar: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const [nomeCompleto, setNomeCompleto] = useState('João da Silva');
	const [cpf, setCpf] = useState('123.456.789-00');
	const [telefone, setTelefone] = useState('(11) 98765-4321');
	const [cpfError, setCpfError] = useState('');
	const [telefoneError, setTelefoneError] = useState('');
	const [nomeError, setNomeError] = useState('');

	const handleSalvar = (e: React.FormEvent) => {
		e.preventDefault();

		let hasError = false;

		if (!nomeCompleto.trim()) {
			setNomeError('O nome completo não pode ser vazio.');
			hasError = true;
		} else {
			setNomeError('');
		}

		const numericCpf = cpf.replace(/\D/g, '');
		if (numericCpf.length !== 11) {
			setCpfError('CPF inválido.');
			hasError = true;
		} else {
			setCpfError('');
		}

		const numericPhone = telefone.replace(/\D/g, '');
		if (numericPhone.length !== 11) {
			setTelefoneError('Telefone inválido.');
			hasError = true;
		} else {
			setTelefoneError('');
		}

		if (hasError) {
			alert('Por favor, corrija os campos destacados.');
			return;
		}

		const dadosAtualizados = {
			nomeCompleto,
			cpf: numericCpf,
			telefone: numericPhone,
		};

		alert('Perfil atualizado com sucesso! ' + dadosAtualizados);
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

	const salvarButtonStyles: React.CSSProperties = {
		...MotoristaStyles.submitButton,
		backgroundColor: theme.secondary,
		color: theme.text.primary,
		boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
	};

	return (
		<div style={containerStyle}>
			<NavBar
				title='Editar Perfil'
				showBackButton={true}
				theme={theme}
				empresa={empresa}
			/>

			<div style={{ ...contentStyle, paddingBottom: '30px' }}>
				<h2
					style={{
						margin: '0px 0 30px 0',
						fontSize: '1.8rem',
						fontWeight: 'bold',
						color: theme.text.primary,
						textAlign: 'center',
					}}
				>
					{nomeCompleto}
				</h2>

				<form
					onSubmit={handleSalvar}
					style={{ width: '100%', maxWidth: '400px' }}
				>
					<InputGroup
						label='Nome Completo'
						value={nomeCompleto}
						onChange={(e) => {
							setNomeCompleto(e.target.value);
							setNomeError('');
						}}
						placeholder='Nome Completo do Motorista'
						error={nomeError}
						theme={theme}
					/>

					<InputGroup
						label='CPF'
						value={cpf}
						onChange={(e) => {
							const maskedCpf = formatCPF(e.target.value);
							setCpf(maskedCpf);
							setCpfError('');
						}}
						placeholder='XXX.XXX.XXX-XX'
						mask='cpf'
						type='text'
						error={cpfError}
						theme={theme}
					/>

					<InputGroup
						label='Telefone'
						value={telefone}
						onChange={(e) => {
							const maskedPhone = formatPhone(e.target.value);
							setTelefone(maskedPhone);
							setTelefoneError('');
						}}
						placeholder='(XX) XXXXX-XXXX'
						mask='phone'
						type='tel'
						error={telefoneError}
						theme={theme}
					/>
				</form>
			</div>

			<button
				type='submit'
				form='editProfileForm'
				style={salvarButtonStyles}
				onClick={handleSalvar}
				onMouseEnter={(e) =>
					(e.currentTarget.style.filter = 'brightness(85%)')
				}
				onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
			>
				Salvar Alterações
			</button>
		</div>
	);
};

export default MotoristaPerfilEditar;
