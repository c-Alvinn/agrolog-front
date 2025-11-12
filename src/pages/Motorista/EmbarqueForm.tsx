import React, { useEffect, useState } from 'react';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import NavBar from '../../components/NavBar';
import InputGroup from '../../components/InputGroup';
import { useNavigate, useParams } from 'react-router-dom';
import { loadTheme } from '../../themes/themeLoader';
import { defaultTheme, type ThemeColors } from '../../themes/theme';

const EmbarqueForm: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
	const [filial, setFilial] = useState<string>('');
	const [placaCaminhao, setPlacaCaminhao] = useState('');
	const [tipoCaminhao, setTipoCaminhao] = useState('');
	const [tipoGrao, setTipoGrao] = useState('');
	const [transportadora, setTransportadora] = useState('');
	const filialOptions = [
		'Filial A - Goiânia',
		'Filial B - Rio Verde',
		'Filial C - Uberaba',
	];
	const caminhaoOptions = ['Truck', 'Carreta Simples', 'Bitrem'];
	const graoOptions = ['Soja', 'Milho', 'Trigo'];
	const empresaOptions = ['AgroCorp', 'Grãos Brasil', 'Exportadora Sul'];
	const navigate = useNavigate();

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const handleAgendar = (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!filial ||
			!placaCaminhao ||
			!tipoCaminhao ||
			!tipoGrao ||
			!transportadora
		) {
			alert('Por favor, preencha todos os campos para agendar.');
			return;
		}

		const agendamentoData = {
			filial,
			placaCaminhao,
			tipoCaminhao,
			tipoGrao,
			transportadora,
		};

		console.log('Dados de Agendamento:', agendamentoData);
		alert(
			'Agendamento realizado com sucesso! Aguarde a confirmação de posição na fila.'
		);
		navigate(
			empresa === 'AgroLog'
				? '/motorista/home'
				: `/${empresa}/motorista/home`,
			{ replace: true }
		);
		setTimeout(
			() =>
				navigate(
					empresa === 'AgroLog'
						? '/motorista/fila'
						: `/${empresa}/motorista/fila`
				),
			0
		);
	};

	const formContainerStyle: React.CSSProperties = {
		...MotoristaStyles.mainContainer,
		backgroundImage: 'none',
		backgroundColor: theme.background,
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: '0',
	};

	const contentStyle: React.CSSProperties = {
		width: '100%',
		maxWidth: '600px',
		padding: '10px 25px 90px 25px',
		boxSizing: 'border-box',
		marginTop: '60px',
	};

	const agendarButtonStyle: React.CSSProperties = {
		...MotoristaStyles.submitButton,
		backgroundColor: theme.secondary,
		color: theme.primary,
		width: '80%',
		maxWidth: '350px',
		padding: '20px 0',
		margin: '0 auto',
		zIndex: 50,
		boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
	};

	return (
		<div style={formContainerStyle}>
			<NavBar
				title='Agendar Embarque'
				showBackButton={true}
				theme={theme}
				empresa={empresa}
				showProfileButton={true}
			/>

			<div style={contentStyle}>
				<p
					style={{
						color: theme.text.primary,
						fontSize: '1rem',
						fontWeight: 'bold',
						marginBottom: '20px',
					}}
				>
					Preencha os dados abaixo para agendar o embarque.
				</p>

				<form onSubmit={handleAgendar}>
					<InputGroup
						label='Filial'
						value={filial}
						onChange={(e) => setFilial(e.target.value)}
						placeholder='Selecione a filial'
						options={filialOptions}
						theme={theme}
					/>

					<InputGroup
						label='Placa do Caminhão'
						value={placaCaminhao}
						onChange={(e) => setPlacaCaminhao(e.target.value)}
						placeholder='AAA-1234'
						mask='plate'
						theme={theme}
					/>

					<InputGroup
						label='Tipo do Caminhão'
						value={tipoCaminhao}
						onChange={(e) => setTipoCaminhao(e.target.value)}
						placeholder='Selecione o tipo do caminhão'
						options={caminhaoOptions}
						theme={theme}
					/>

					<InputGroup
						label='Tipo de Grão'
						value={tipoGrao}
						onChange={(e) => setTipoGrao(e.target.value)}
						placeholder='Selecione o tipo de grão'
						options={graoOptions}
						theme={theme}
					/>

					<InputGroup
						label='Transportadora'
						value={transportadora}
						onChange={(e) => setTransportadora(e.target.value)}
						placeholder='Selecione a Transportadora'
						options={empresaOptions}
						theme={theme}
					/>

					<button
						type='submit'
						style={agendarButtonStyle}
						onMouseEnter={(e) =>
							(e.currentTarget.style.filter = 'brightness(85%)')
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.filter = 'none')
						}
					>
						AGENDAR
					</button>
				</form>
			</div>
		</div>
	);
};

export default EmbarqueForm;
