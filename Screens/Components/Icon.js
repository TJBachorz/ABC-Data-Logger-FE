import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

export const NavIcon = ({ name="nav-icon-a" }) => {
    return (
        <Icon
            name={name}
            size={20}
            color="#1761a0"
        />
    )
}