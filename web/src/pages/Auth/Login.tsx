import React, { FormEvent, useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { useAuth }  from '../../contexts/auth';
import { animations } from '../../utils/animations';
import api from '../../services/api';
import Logo from '../../images/big-logo.svg';

import '../../styles/pages/auth.css';

export default function Login() {
    const { signed, loading, signIn } = useAuth();
    const { goBack } = useHistory();
    const { opacity } = animations;

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSignIn(event: FormEvent) {
        event.preventDefault();

        try {
            const data = { email, password };
            
            const response = await api.post('auth/authenticate', data);
      
            signIn(response.data);
        } catch(e) {
            if(e.response.status === 404) return console.log('E-mail inválido! Por favor, confira se o mesmo está correto.');
            if(e.response.status === 400) return console.log('Senha inválida! Por favor, tente novamente.');
        }
    }
    
    if(loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>
                <p>Carregando...</p>
            </div>
        )
    }

    return (
        <>
            { signed ? (
                <Redirect to="/dashboard" />
            ) : (
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
                                <legend>Fazer login</legend>

                                <div className="input-block">
                                    <label htmlFor="email">E-mail</label>
                                    <input 
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        autoFocus 
                                    />
                                </div>

                                <div className="input-block">
                                    <label htmlFor="password">Senha</label>
                                    <input 
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                </div>

                                <div className="input-block options">
                                    <label>
                                        <input type="checkbox" id="remember" />
                                        <span className="checkmark"></span>
                                        Lembrar-me
                                    </label>

                                    <Link to="/forgotpassword" className="forgotPassword">Esqueci minha senha</Link>
                                </div>

                                <button className="login-button" onClick={handleSignIn}>
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </aside>
                </motion.div>
            )}
        </>
    )
}