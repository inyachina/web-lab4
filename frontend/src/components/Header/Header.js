import React from "react";
import {header} from './Header.module.scss';
import {cool_text} from './Header.module.scss'

const Header = () => {
    return (
        <div className={header}>
                <h5 className={cool_text}>Инячина Диана P3214 Вариант 3812</h5>
        </div>);
}

export default Header;