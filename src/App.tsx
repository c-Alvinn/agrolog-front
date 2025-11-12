import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MotoristaHome from './pages/Motorista/MotoristaHome';
import EmbarqueForm from './pages/Motorista/EmbarqueForm';
import MotoristaLogin from './pages/Motorista/MotoristaLogin';
import FilaStatus from './pages/Motorista/FilaStatus';
import MotoristaPerfil from './pages/Motorista/MotoristaPerfil';
import MotoristaPerfilEditar from './pages/Motorista/MotoristaPerfilEditar';
import MotoristaAlterarSenha from './pages/Motorista/MotoristaAlterarSenha';
import MotoristaRecuperarSenha from './pages/Motorista/MotoristaRecuperarSenha';
import MotoristaCadastro from './pages/Motorista/MotoristaCadastro';
import AdministracaoLogin from './pages/Administracao/AdministracaoLogin';
import AdministracaoDashboard from './pages/Administracao/AdministracaoDashboard';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* Area da Administracao */}
				<Route
					path='/:empresa?/admin/login'
					element={<AdministracaoLogin />}
				/>
				<Route
					path='/:empresa?/admin/dashboard'
					element={<AdministracaoDashboard />}
				/>
				{/* Area do Motorista */}
				<Route
					path='/:empresa?/motorista/login'
					element={<MotoristaLogin />}
				/>
				<Route
					path='/:empresa?/motorista/cadastro'
					element={<MotoristaCadastro />}
				/>
				<Route
					path='/:empresa?/motorista/home'
					element={<MotoristaHome />}
				/>
				<Route
					path='/:empresa?/motorista/embarque'
					element={<EmbarqueForm />}
				/>
				<Route
					path='/:empresa?/motorista/fila'
					element={<FilaStatus />}
				/>
				<Route
					path='/:empresa?/motorista/perfil'
					element={<MotoristaPerfil />}
				/>
				<Route
					path='/:empresa?/motorista/perfil/editar'
					element={<MotoristaPerfilEditar />}
				/>
				<Route
					path='/:empresa?/motorista/recuperar-senha/'
					element={<MotoristaRecuperarSenha />}
				/>
				<Route
					path='/:empresa?/motorista/alterar-senha/:urlToken'
					element={<MotoristaAlterarSenha />}
				/>
				<Route path='/' element={<MotoristaHome />} />
			</Routes>
		</Router>
	);
};

export default App;
