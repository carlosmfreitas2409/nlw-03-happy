import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";
import { FiX, FiPlus } from 'react-icons/fi';
import PhoneInput from 'react-phone-number-input/input';
import Swal from 'sweetalert2';

import { animations } from "../utils/animations";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-orphanage.css';
import { motion } from "framer-motion";

export default function CreateOrphanage() {
    // Alterar título da página atual
    document.title = "Adicionar um Orfanato | Happy";

    const { opacity, slideTop } = animations;

    const history = useHistory();

    const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });

    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ instructions, setInstructions ] = useState('');
    const [ opening_hours, setOpeningHours ] = useState('');
    const [ open_on_weekends, setOpenOnWeekends ] = useState(true);
    const [ images, setImages ] = useState<File[]>([]);
    const [ previewImages, setPreviewImages ] = useState<string[]>([]);
    
    // User Current Position
    const [ mapPosition, setMapPosition ] = useState<[number, number]>([-23.6791252,-46.5451525]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setMapPosition([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;
        setPosition({
            latitude: lat,
            longitude: lng,
        });
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) {
            return;
        }
        
        const selectedImages = Array.from(event.target.files);
        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const { latitude, longitude } = position;

            const data = new FormData();

            data.append('name', name);
            data.append('about', about);
            data.append('phone', phone.replace('+', ''));
            data.append('latitude', String(latitude));
            data.append('longitude', String(longitude));
            data.append('instructions', instructions);
            data.append('opening_hours', opening_hours);
            data.append('open_on_weekends', String(open_on_weekends));

            images.forEach(image => {
                data.append('images', image);
            });

            await api.post('orphanages', data);

            await Swal.fire(
                'Cadastro Realizado!',
                `Seu orfanato já pode estar sendo analisado em nosso mapa principal!`,
                'success'
            );

            history.push('/app');
        } catch(err) {
            await Swal.fire(
                'Ocorreu um erro!',
                `Obtivemos um erro ao tentar cadastrar seu orfanato. Por favor, tente novamente e, lembre-se de preencher todos os campos!`,
                'error'
            );
        }
    }

    return (
        <motion.div id="page-create-orphanage" variants={opacity} initial="initial" animate="final" exit="exit">
            {/* SideBar no final do main */}

            <motion.main initial="initial" animate="final" variants={slideTop}>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Dados</legend>

                        <Map 
                            center={mapPosition} 
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onclick={handleMapClick}
                        >
                            <TileLayer 
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />
                            
                            { position.latitude !== 0 && (
                                <Marker 
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[position.latitude, position.longitude]}
                                />
                            ) }
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input 
                                id="name" 
                                value={name} 
                                onChange={event => setName(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea 
                                id="name" 
                                maxLength={300} 
                                value={about}
                                onChange={event => setAbout(event.target.value)} 
                                required
                            />
                        </div>


                        <div className="input-block">
                            <label htmlFor="phone">Número de Whatsapp</label>
                            <PhoneInput
                                country="BR"
                                international
                                withCountryCallingCode
                                id="phone"
                                value={phone}
                                onChange={setPhone}
                                required
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                { previewImages.map((image, index) => {
                                    return (
                                        <div key={index} className="img-container">
                                            <div 
                                                className="imgRemove" 
                                                onClick={() => {
                                                    setPreviewImages(previewImages.filter((img, i) => i !== index));

                                                    images.splice(index, 1);
                                                    setImages(images);
                                                }}
                                            >
                                                <FiX color="#FF669D" size={25} />
                                            </div>
                                            <img src={image} alt={name} />
                                        </div>
                                    )
                                })}
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>

                            <input multiple onChange={handleSelectImages} type="file" id="image[]" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea 
                                id="instructions" 
                                value={instructions} 
                                onChange={event => setInstructions(event.target.value)}
                                required
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de Funcionamento</label>
                            <input 
                                id="opening_hours"
                                value={opening_hours}
                                onChange={event => setOpeningHours(event.target.value)}
                                required
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button 
                                    type="button" 
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>
                                
                                <button 
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </motion.main>

            <Sidebar />
        </motion.div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
