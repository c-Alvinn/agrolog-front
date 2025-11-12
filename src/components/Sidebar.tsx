import React, { useState } from 'react';
import { type NavigateFunction, useLocation } from 'react-router-dom';
import { AdministracaoStyles } from '../styles/AdministracaoStyles';
import { type ThemeColors } from '../themes/theme';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Queue from '@mui/icons-material/Queue';
import DoneAll from '@mui/icons-material/DoneAll';
import Assignment from '@mui/icons-material/Assignment';
import AddCircle from '@mui/icons-material/AddCircle';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Delete from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoWhite from './LogoWhite';

interface SidebarItem {
    name: string;
    path: string;
    Icon: React.ElementType;
}

interface SidebarProps {
    theme: ThemeColors;
    empresa: string;
    navigate: NavigateFunction;
}

const getSidebarItems = (empresa: string): SidebarItem[] => [
    { name: "Dashboard", path: `/${empresa}/admin/dashboard`.replace('/AgroLog', ''), Icon: DashboardIcon },
    { name: "Fila de Embarque", path: `/${empresa}/admin/fila-embarque`.replace('/AgroLog', ''), Icon: Queue },
    { name: "Fila em Atendimento", path: `/${empresa}/admin/fila-atendimento`.replace('/AgroLog', ''), Icon: Queue },
    { name: "Liberados", path: `/${empresa}/admin/liberados`.replace('/AgroLog', ''), Icon: DoneAll },
    { name: "Relatório", path: `/${empresa}/admin/relatorio`.replace('/AgroLog', ''), Icon: Assignment },
    { name: "Adicionar Embarque", path: `/${empresa}/admin/add-embarque`.replace('/AgroLog', ''), Icon: AddCircle },
    { name: "Cadastrar Usuário", path: `/${empresa}/admin/cad-usuario`.replace('/AgroLog', ''), Icon: PersonAdd },
    { name: "Excluir Usuário", path: `/${empresa}/admin/del-usuario`.replace('/AgroLog', ''), Icon: Delete },
    { name: "Sair", path: `/${empresa}/admin/login`.replace('/AgroLog', ''), Icon: LogoutIcon },
];


const Sidebar: React.FC<SidebarProps> = ({ theme, empresa, navigate }) => {
    
    const location = useLocation();
    const currentPath = location.pathname;
    const items = getSidebarItems(empresa);

    const sidebarStyle: React.CSSProperties = {
        ...AdministracaoStyles.sidebar,
        backgroundColor: theme.primary,
        color: theme.text.onDark,
    };

    const sidebarHeaderStyle: React.CSSProperties = {
        ...AdministracaoStyles.sidebarHeader,
        borderBottom: `1px solid ${theme.text.onDark}30`,
        marginBottom: '10px',
    };
    
    const navItemStyle = (isActive: boolean): React.CSSProperties => ({
        ...AdministracaoStyles.sidebarItem,
        backgroundColor: isActive ? `${theme.text.onDark}25` : 'transparent',
        color: isActive ? theme.status.warning : theme.text.onDark,
        fontWeight: isActive ? '600' : '500', 
    });
    
    const NavItemWrapper: React.FC<{ item: SidebarItem }> = ({ item }) => {
        const [isHovered, setIsHovered] = useState(false);
        
        const isActive = currentPath.startsWith(item.path);

        const dynamicStyle = navItemStyle(isActive);
        const IconComponent = item.Icon;

        const finalStyle: React.CSSProperties = isHovered ? { 
            ...dynamicStyle, 
            backgroundColor: `${theme.text.onDark}25`,
            color: theme.status.warning,
        } : dynamicStyle;

        const handleClick = item.name === 'Sair' ? () => {
            //excluir dados salvos
            navigate(item.path);
        } : () => {
            navigate(item.path);
        };
        
        return (
            <div
                style={finalStyle}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <IconComponent style={{ fontSize: '1.2rem' }} />
                <span>{item.name}</span>
            </div>
        );
    };

    return (
        <div style={sidebarStyle}>
            
            <div style={sidebarHeaderStyle}>
                <LogoWhite theme={{ ...theme, text: { primary: theme.text.onDark, secondary: theme.text.onDark, onDark: theme.text.onDark } }} />
                <p style={{ margin: 0, fontSize: '0.85rem', color: theme.text.onDark }}>
                    Gerenciamento de Fila
                </p>
            </div>

            <nav style={{ flexGrow: 1, paddingTop: '10px' }}>
                {items.map((item, index) => (
                    <NavItemWrapper key={index} item={item} />
                ))}
            </nav>

            <div style={{ padding: '20px', fontSize: '0.75rem', color: `${theme.text.onDark}90`, borderTop: `1px solid ${theme.text.onDark}30` }}>
                v1.0.0
            </div>
            
        </div>
    );
};

export default Sidebar;