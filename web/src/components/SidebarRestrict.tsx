import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiAlertCircle, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { useAuth } from '../contexts/auth';
import { animations } from '../utils/animations';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/components/sidebar.css';

export default function Sidebar() {
    const { opacity } = animations;
    
    const { goBack } = useHistory();
    const { signOut } = useAuth();
    function handleSignOut() {
        signOut();
    }
    
    return (
        <motion.aside className="app-sidebar" variants={opacity} initial="initial" animate="final" exit="exit">
            <Link to="/">
                <img src={mapMarkerImg} alt="Happy" />
            </Link>

            <div className="menu-sidebar">
                <button type="button" className="active">
                    <FiMapPin size={24} color="#0089A5" />
                </button>

                <button type="button">
                    <FiAlertCircle size={24} color="#FFF" />
                </button>
            </div>

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>

                <button type="button" onClick={handleSignOut}>
                    <FiPower size={24} color="#FFF" />
                </button>
            </footer>
        </motion.aside>
    );
}