import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';

import { animations } from '../utils/animations';
import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    // Alterar título da página atual
    document.title = "Localize um Orfanato | Happy";

    const { jumpLoop, slideLeft, opacity } = animations;
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);
    const [ mapPosition, setMapPosition ] = useState<[number, number]>([-23.6791252,-46.5451525]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setMapPosition([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    return (
        <motion.div id="page-map" variants={opacity} initial="initial" animate="final" exit="exit">
            <motion.aside variants={slideLeft} initial="initial" animate="final">
                <header>
                    <motion.img 
                        variants={jumpLoop}
                        animate="animation"
                        src={mapMarkerImg} 
                        alt="Happy"
                    />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Bernardo do Campo</strong>
                    <span>São Paulo</span>
                </footer>
            </motion.aside>

            <Map 
                center={mapPosition}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <div className="footer">
                <span className="footer-text">{orphanages.length} orfanatos encontrados</span>

                <Link to="/orphanages/create" className="create-orphanage">
                    <FiPlus size={32} color="#fff" />
                </Link>
            </div>
        </motion.div>
    );
}

export default OrphanagesMap;