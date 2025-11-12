import React from 'react';

const SHADOW_LIGHT = '0 2px 4px rgba(0, 0, 0, 0.05)';
const SHADOW_MEDIUM = '0 4px 12px rgba(0, 0, 0, 0.1)';
const TRANSITION_DEFAULT = 'all 0.3s ease';

interface IAdministracaoStyles {
    mainContainer: React.CSSProperties;
    sidebar: React.CSSProperties;
    sidebarHeader: React.CSSProperties; 
    sidebarItem: React.CSSProperties;
    contentArea: React.CSSProperties;
    infoCardBase: React.CSSProperties;
    headerTitle: React.CSSProperties;
}

export const AdministracaoStyles: IAdministracaoStyles = {
    mainContainer: {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
    },

    sidebar: {
        width: '250px',
        padding: '0',
        minHeight: '100vh',
        boxShadow: SHADOW_MEDIUM,
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    
    sidebarHeader: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '5px',
    },

    sidebarItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px',
        cursor: 'pointer',
        transition: TRANSITION_DEFAULT,
        gap: '12px',
        fontSize: '1rem',
        fontWeight: '500',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
    },

    contentArea: {
        flexGrow: 1,
        marginLeft: '250px',
        padding: '30px',
        boxSizing: 'border-box',
    },

    infoCardBase: {
        padding: '20px 30px',
        borderRadius: '10px',
        boxShadow: SHADOW_LIGHT,
        flex: '1 1 0',
        minWidth: '200px',
        transition: TRANSITION_DEFAULT,
    },
    
    headerTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '5px',
    }
};