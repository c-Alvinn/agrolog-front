import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdministracaoStyles } from '../../styles/AdministracaoStyles';
import { loadTheme } from '../../themes/themeLoader';
import { defaultTheme, type ThemeColors } from '../../themes/theme';
import Sidebar from '../../components/Sidebar';
import FilterList from '@mui/icons-material/FilterList';

interface DashboardData {
    naFila: number;
    emAtendimento: number;
    liberado: number;
}

const AdministracaoDashboard: React.FC = () => {
    const { empresa = 'AgroLog' } = useParams<{ empresa: string }>(); 
    const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
    const navigate = useNavigate();

    const [data, setData] = useState<DashboardData>({
        naFila: 42,
        emAtendimento: 8,
        liberado: 115,
    });
    
    const [filialFiltro, setFilialFiltro] = useState('Cascavel - PR');
    const [filiaisDisponiveis, setFiliaisDisponiveis] = useState([
        'Cascavel - PR',
        'Rondonópolis - MT',
        'Outra Filial',
    ]);

    useEffect(() => {
        const newTheme = empresa ? loadTheme(empresa) : defaultTheme;
        setTheme(newTheme);
    }, [empresa]);

    const contentAreaStyle: React.CSSProperties = {
        ...AdministracaoStyles.contentArea,
        backgroundColor: theme.background,
    };
    
    const cardStyle = (index: number): React.CSSProperties => ({
        ...AdministracaoStyles.infoCardBase,
        backgroundColor: theme.cardBackground,
        color: theme.text.primary,
        borderLeft: index === 0 ? `5px solid ${theme.status.warning}` : index === 1 ? `5px solid ${theme.status.info}` : `5px solid ${theme.status.success}`, 
    });

    const InfoCard: React.FC<{ title: string, value: number, index: number }> = ({ title, value, index }) => (
        <div style={cardStyle(index)}>
            <p style={{ margin: '0 0 10px 0', fontSize: '1rem', color: theme.text.secondary }}>{title}</p>
            <h3 style={{ margin: 0, fontSize: '3rem', fontWeight: 'bold', color: theme.text.primary }}>{value}</h3>
        </div>
    );
    
    return (
        <div style={AdministracaoStyles.mainContainer}>
            
            <Sidebar 
                theme={theme}
                empresa={empresa}
                navigate={navigate}
            />

            <div style={contentAreaStyle}>
                
                <h1 style={{ ...AdministracaoStyles.headerTitle, color: theme.text.primary }}>
                    Dashboard
                </h1>
                <p style={{ margin: '0 0 30px 0', color: theme.text.secondary, fontSize: '1.1rem' }}>
                    Visão geral da fila de embarque.
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '40px' }}>
                    <label style={{ color: theme.text.secondary, marginRight: '10px' }}>
                        Filtrar por Filial
                    </label>
                    <div style={{ position: 'relative', width: '250px' }}>
                        <FilterList style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: theme.text.secondary, fontSize: '1.2rem' }} />
                        <select
                            value={filialFiltro}
                            onChange={(e) => setFilialFiltro(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 10px 10px 40px',
                                border: `1px solid ${theme.primary}`,
                                borderRadius: '5px',
                                backgroundColor: theme.cardBackground,
                                color: theme.text.primary,
                                appearance: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {filiaisDisponiveis.map(filial => (
                                <option key={filial} value={filial}>Filial de {filial}</option>
                            ))}
                        </select>
                        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: theme.text.secondary }}>&#9660;</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <InfoCard title="Na Fila" value={data.naFila} index={0} />
                    <InfoCard title="Em Atendimento" value={data.emAtendimento} index={1} />
                    <InfoCard title="Liberado" value={data.liberado} index={2} />
                </div>
                
            </div>
        </div>
    );
};

export default AdministracaoDashboard;