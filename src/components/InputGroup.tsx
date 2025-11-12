import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { formatCPF, formatPhone, formatPlate } from '../utils/inputMasks';
import type { ThemeColors } from '../themes/theme';

interface InputGroupProps {
	label: string;
	type?: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	placeholder?: string;
	mask?: 'phone' | 'plate' | 'cpf';
	options?: string[];
	error?: string;
	theme: ThemeColors;
}

const InputGroup: React.FC<InputGroupProps> = ({
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
	mask,
	options,
	error,
	theme,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const inputId = label.toLowerCase().replace(/\s/g, '-');

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		let newValue = e.target.value;

		if (e.target instanceof HTMLInputElement) {
			switch (mask) {
				case 'cpf':
					newValue = formatCPF(e.target.value);
					break;
				case 'phone':
					newValue = formatPhone(e.target.value);
					break;
				case 'plate':
					newValue = formatPlate(e.target.value);
					break;
				default:
					newValue = e.target.value;
			}
		}

		const syntheticEvent = {
			...e,
			target: { ...e.target, value: newValue } as
				| HTMLInputElement
				| HTMLSelectElement,
		};

		onChange(syntheticEvent);
	};

	const borderColor = error ? theme.status.error : theme.primary;

	const renderInput = () => {
		if (options && options.length > 0) {
			return (
				<select
					id={inputId}
					value={value}
					onChange={onChange}
					style={{
						width: '100%',
						padding: '12px',
						borderRadius: '8px',
						border: `1px solid ${borderColor}`,
						backgroundColor: theme.cardBackground,
						color: theme.text.primary,
						fontSize: '1rem',
						boxSizing: 'border-box',
					}}
				>
					<option value='' disabled>
						{placeholder || `Selecione ${label}`}
					</option>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			);
		}

		if (type === 'password') {
			return (
				<div
					style={{
						position: 'relative',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<input
						id={inputId}
						type={isPasswordVisible ? 'text' : 'password'}
						value={value}
						onChange={handleChange}
						placeholder={placeholder}
						style={{
							width: '100%',
							padding: '12px',
							paddingRight: '40px',
							borderRadius: '8px',
							border: `1px solid ${borderColor}`,
							backgroundColor: theme.cardBackground,
							color: theme.text.primary,
							fontSize: '1rem',
							boxSizing: 'border-box',
						}}
					/>
					<button
						type='button'
						onClick={togglePasswordVisibility}
						style={{
							position: 'absolute',
							right: '10px',
							top: '50%',
							transform: 'translateY(-50%)',
							background: 'transparent',
							border: 'none',
							cursor: 'pointer',
							display: 'flex',
							padding: '0',
							color: theme.text.secondary,
						}}
					>
						{isPasswordVisible ? <Visibility /> : <VisibilityOff />}
					</button>
				</div>
			);
		}

		const currentInputMode =
			mask === 'cpf' || mask === 'phone' || type === 'tel'
				? 'numeric'
				: 'text';

		let currentMaxLength: number | undefined;
		if (mask === 'cpf') currentMaxLength = 14;
		if (mask === 'phone') currentMaxLength = 15;
		if (mask === 'plate') currentMaxLength = 8;

		return (
			<input
				id={inputId}
				type={type}
				value={value}
				inputMode={currentInputMode}
				onChange={handleChange}
				placeholder={placeholder}
				maxLength={currentMaxLength}
				style={{
					width: '100%',
					padding: '12px',
					borderRadius: '8px',
					border: `1px solid ${borderColor}`,
					backgroundColor: theme.cardBackground,
					color: theme.text.primary,
					fontSize: '1rem',
					boxSizing: 'border-box',
					textTransform: mask === 'plate' ? 'uppercase' : 'none',
				}}
			/>
		);
	};

	return (
		<div style={{ width: '100%', marginBottom: '20px' }}>
			<label
				htmlFor={inputId}
				style={{
					color: error ? theme.status.error : theme.text.primary,
					fontSize: '0.9rem',
					fontWeight: 'bold',
					marginBottom: '8px',
					display: 'block',
					textAlign: 'left',
				}}
			>
				{label}
			</label>
			{renderInput()}
			{error && (
				<p
					style={{
						color: theme.status.error,
						fontSize: '0.8rem',
						marginTop: '4px',
						marginBottom: '0',
						textAlign: 'left',
					}}
				>
					{error}
				</p>
			)}
		</div>
	);
};

export default InputGroup;
