import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import { animations } from '../../utils/animations';
import Logo from '../../images/big-logo.svg';

import '../../styles/pages/auth.css';

export default function Login() {
    const { goBack } = useHistory();
    const { opacity } = animations;
    
    return (
        <motion.div id="page-login" variants={opacity} initial="initial" animate="final" exit="exit">
            <section>
                <img src={Logo} alt="Happy" />

                <strong>São Bernardo do Campo</strong>
                <span>São Paulo</span>
            </section>

            <aside>
                <header>
                    <button type="button" onClick={goBack}>
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </button>
                </header>
                
                <div className="form-container">
                    <form method="GET" className="login-restrict-access">
                        <legend style={{ marginBottom: '24px' }}>Esqueci a senha</legend>
                        <div className="legend-details">Sua redefinição de senha será enviada para o e-mail cadastrado.</div>

                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" autoFocus />
                        </div>

                        <button className="login-button">
                            Resetar Senha
                        </button>
                    </form>
                </div>
            </aside>
        </motion.div>
    )
}