import React, { useEffect, useState } from 'react';
import { MotoristaStyles } from '../../styles/MotoristaStyles';
import NavBar from '../../components/NavBar';
import StatusItem from '../../components/StatusItem';
import LocationCity from '@mui/icons-material/LocationCity';
import LocalShipping from '@mui/icons-material/LocalShipping';
import EmojiTransportation from '@mui/icons-material/EmojiTransportation';
import LocalFlorist from '@mui/icons-material/LocalFlorist';
import Business from '@mui/icons-material/Business';
import Cancel from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from 'react-router-dom';
import { loadTheme } from '../../themes/themeLoader';
import { defaultTheme, type ThemeColors } from '../../themes/theme';
import { EventAvailable, Warning } from '@mui/icons-material';

const UPDATE_INTERVAL_MS = 30000;

interface QueueStatus {
	isScheduled: boolean;
	posicao: string;
	filial: string;
	placa: string;
	tipoCaminhao: string;
	tipoGrao: string;
	empresa: string;
}

const FilaStatus: React.FC = () => {
	const { empresa = 'AgorLog' } = useParams<{ empresa: string }>();
	const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
	const navigate = useNavigate();

	const [queueStatus, setQueueStatus] = useState<QueueStatus>({
		isScheduled: true,
		posicao: '05',
		filial: 'Unidade de Rondonópolis',
		placa: 'QAP-2024',
		tipoCaminhao: 'Bitrem (9 eixos)',
		tipoGrao: 'Soja',
		empresa: 'Agro Cargas Express',
	});

	useEffect(() => {
		const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
		setTheme(newTheme);
	}, [empresa]);

	const [lastUpdated, setLastUpdated] = useState(new Date());
	const [timeLeft, setTimeLeft] = useState(UPDATE_INTERVAL_MS / 1000);

	const fetchQueueStatus = () => {
		console.log('Atualizando posição na fila...');

		const newPosicao = String(Math.floor(Math.random() * 20) + 1).padStart(
			2,
			'0'
		);

		setQueueStatus((prev) => ({
			...prev,
			posicao: newPosicao,
		}));

		setLastUpdated(new Date());
	};

	useEffect(() => {
		if (!queueStatus.isScheduled) return;

		fetchQueueStatus();

		const intervalId = setInterval(fetchQueueStatus, UPDATE_INTERVAL_MS);

		return () => clearInterval(intervalId);
	}, [queueStatus.isScheduled]);

	useEffect(() => {
		if (!queueStatus.isScheduled) return;

		const timerId = setInterval(() => {
			setTimeLeft((prevTime) =>
				prevTime > 1 ? prevTime - 1 : UPDATE_INTERVAL_MS / 1000
			);
		}, 1000);

		if (timeLeft === 0) {
			setTimeLeft(UPDATE_INTERVAL_MS / 1000);
		}

		return () => clearInterval(timerId);
	}, [lastUpdated, timeLeft, queueStatus.isScheduled]);

	const handleCancelar = () => {
		if (
			window.confirm(
				'Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.'
			)
		) {
			alert('Agendamento cancelado com sucesso.');
			setQueueStatus(
				(prev) =>
					({
						...prev,
						isScheduled: false,
					} as QueueStatus)
			);
		}
	};

	const handleAgendar = () => {
		navigate(`/${empresa}/motorista/embarque`);
	};

	const containerStyle: React.CSSProperties = {
		...MotoristaStyles.mainContainer,
		backgroundColor: theme.background,
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: '0',
	};

	const contentStyle: React.CSSProperties = {
		width: '100%',
		maxWidth: '600px',
		padding: '25px 25px 60px 25px',
		boxSizing: 'border-box',
		marginTop: '60px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};

	const baseCardStyle: React.CSSProperties = {
		backgroundColor: theme.cardBackground,
		borderRadius: '15px',
		padding: '25px',
		marginBottom: '20px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
		width: '100%',
		boxSizing: 'border-box',
		textAlign: 'center',
	};

	const renderScheduledStatus = () => (
		<>
			<div style={baseCardStyle}>
				<p
					style={{
						margin: 0,
						fontSize: '1rem',
						color: theme.text.primary,
						fontWeight: 'bold',
					}}
				>
					Posição na fila
				</p>
				<h2
					style={{
						margin: '10px 0 0 0',
						fontSize: '4rem',
						fontWeight: 'bolder',
						color: theme.primary,
					}}
				>
					{queueStatus.posicao}
				</h2>
				<div
					style={{ fontSize: '0.85rem', color: theme.text.secondary }}
				>
					<p style={{ margin: '5px 0 0 0' }}>
						Última atualização: {lastUpdated.toLocaleTimeString()}
					</p>
					<p
						style={{
							margin: '5px 0 0 0',
							fontWeight: 'bold',
							color: theme.primary,
						}}
					>
						Próxima atualização em: {timeLeft}s
					</p>
				</div>
			</div>

			<h3
				style={{
					margin: '30px 0 15px 0',
					fontSize: '1.2rem',
					color: theme.text.primary,
					fontWeight: 'bold',
					alignSelf: 'flex-start',
				}}
			>
				Informações do agendamento
			</h3>

			<div
				style={{
					...baseCardStyle,
					padding: '10px 25px',
					textAlign: 'left',
				}}
			>
				<StatusItem
					Icon={LocationCity}
					label='Filial'
					value={queueStatus.filial}
					theme={theme}
				/>
				<StatusItem
					Icon={LocalShipping}
					label='Placa do caminhão'
					value={queueStatus.placa}
					theme={theme}
				/>
				<StatusItem
					Icon={EmojiTransportation}
					label='Tipo do caminhão'
					value={queueStatus.tipoCaminhao}
					theme={theme}
				/>
				<StatusItem
					Icon={LocalFlorist}
					label='Tipo de grão'
					value={queueStatus.tipoGrao}
					theme={theme}
				/>
				<div style={{ paddingBottom: '10px' }}>
					<StatusItem
						Icon={Business}
						label='Empresa'
						value={queueStatus.empresa}
						theme={theme}
					/>
				</div>
			</div>

			<button
				type='button'
				style={{
					...MotoristaStyles.submitButton,
					backgroundColor: theme.status.error,
					color: theme.text.onDark,
					width: '100%',
					maxWidth: '350px',
					borderRadius: '15px',
					padding: '20px 0',
					margin: '25px 0',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
					gap: '1rem',
				}}
				onClick={handleCancelar}
				onMouseEnter={(e) =>
					(e.currentTarget.style.filter = 'brightness(85%)')
				}
				onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
			>
				<Cancel style={{ fontSize: '1.2rem' }} />
				Cancelar Agendamento
			</button>
		</>
	);

	const renderNoScheduledStatus = () => (
		<div
			style={{
				...baseCardStyle,
				padding: '40px 25px',
				marginTop: '30px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Warning
				style={{
					fontSize: '3rem',
					color: theme.status.warning,
					marginBottom: '20px',
				}}
			/>
			<h3
				style={{
					margin: '0 0 10px 0',
					fontSize: '1.5rem',
					color: theme.text.primary,
				}}
			>
				Você não possui agendamento ativo.
			</h3>
			<p
				style={{
					margin: '0 0 30px 0',
					fontSize: '1rem',
					color: theme.text.secondary,
				}}
			>
				Para consultar uma fila, você precisa agendar um <b>embarque</b>
				.
			</p>

			<button
				type='button'
				style={{
					...MotoristaStyles.submitButton,
					backgroundColor: theme.secondary,
					color: theme.text.primary,
					width: '100%',
					maxWidth: '300px',
					borderRadius: '10px',
					padding: '15px 0',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					gap: '0.8rem',
				}}
				onClick={handleAgendar}
				onMouseEnter={(e) =>
					(e.currentTarget.style.filter = 'brightness(85%)')
				}
				onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
			>
				<EventAvailable style={{ fontSize: '1.1rem' }} />
				Agendar Embarque
			</button>
		</div>
	);

	return (
		<div style={containerStyle}>
			<NavBar
				title='Fila'
				showBackButton={true}
				theme={theme}
				empresa={empresa}
				showProfileButton={true}
			/>

			<div style={contentStyle}>
				{queueStatus.isScheduled
					? renderScheduledStatus()
					: renderNoScheduledStatus()}
			</div>
		</div>
	);
};

export default FilaStatus;
