import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

import Sidebar from '../../components/SidebarRestrict';

import api from '../../services/api';
import mapIcon from '../../utils/mapIcon';

import '../../styles/pages/RestrictAccess/dashboard.css';
import 'react-toastify/dist/ReactToastify.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function Dashboard() {
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, [orphanages]);

    async function handleDeleteOrphanage(id: number) {
        try {
            await api.delete(`orphanages/${id}`);

            toast.success('Orfanato removido!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } catch(e) {
            toast.error('Erro ao tentar remover!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }
    
    return (
        <div id="page-dashboard">
            <Sidebar />

            <ToastContainer />
            <main>
                <div className="dashboard-container">
                    <legend>
                        <span className="title">Orfanatos Cadastrados</span>
                        <span className="subtitle">{orphanages.length} orfanatos</span>
                    </legend>

                    <div className="dashboard-orphanages">
                        { orphanages.map(orphanage => {
                            return (
                                <div className="orphanage-card">
                                    <Map 
                                        center={[orphanage.latitude, orphanage.longitude]}
                                        zoom={16} 
                                        style={{ width: '100%', height: 227, borderRadius: '20px' }}
                                        dragging={false}
                                        touchZoom={false}
                                        zoomControl={false}
                                        scrollWheelZoom={false}
                                        doubleClickZoom={false}
                                    >
                                        <TileLayer 
                                            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                        />

                                        <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                                    </Map>

                                    <footer>
                                        <span>{orphanage.name}</span>

                                        <div className="options">
                                            <button type="button">
                                                <FiEdit3 size={24} color="#15C3D6" />
                                            </button>

                                            <button type="button" onClick={() => handleDeleteOrphanage(orphanage.id)}>
                                                <FiTrash size={24} color="#15C3D6" />
                                            </button>
                                        </div>
                                    </footer>
                                </div>
                            );
                        }) }
                        
                    </div>
                </div>
            </main>
        </div>
    );
}