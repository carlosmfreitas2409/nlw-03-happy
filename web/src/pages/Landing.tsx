import React from 'react';
import { FiArrowRight} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { animations } from '../utils/animations';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

function Landing() {
    const { slideLeft, slideRight, slideTop, opacity } = animations;

    return (
        <div id="page-landing">
            <motion.div className="content-wrapper" variants={opacity} initial="initial" animate="final" exit="exit">
                <motion.img variants={slideTop} initial="initial" animate="final" src={logoImg} alt="Happy"/>

                <motion.main variants={slideLeft} initial="initial" animate="final">
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </motion.main>

                <motion.div className="restrict" variants={slideRight} initial="initial" animate="final">
                    <Link to="/login" className="enter-restrict">Acesso Restrito</Link>
                </motion.div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </motion.div>
        </div>
    );
}

export default Landing;