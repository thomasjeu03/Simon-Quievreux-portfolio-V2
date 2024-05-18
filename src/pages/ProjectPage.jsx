import './home/Home.scss';
import {memo, useEffect, useState} from "react";
import { Download, Send, Sun, Moon } from 'lucide-react';
import logo from '../../public/img/logo.png'
import {useDarkModeContext} from "../providers/DarkModeProvider.jsx";
import baseURL from "../config.js";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const ProjectPage = () => {
    const iconSize  = 20
    const {darkMode, setDarkMode} = useDarkModeContext()
    const { slug } = useParams();

    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState([])

    useEffect(() => {
        setLoading(true)
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${baseURL}/projet/?slug=${slug}`)
                setProject(response?.data?.[0])
                setLoading(false)
            } catch (error) {
                console.error("Error fetching projects:", error)
                setLoading(false)
            }
        }
        fetchProjects()
    }, [slug])


    return (
        <div className="ProjectPage">
            <div className="left">
                {loading && (
                    <p>Chargement</p>
                )}
                <div className='dflexrow gapBetween gap8 w100' style={{ alignItems: 'flex-start'}}>
                    <Link to="/">
                        <img src={logo} className='invertInDarkMode' alt="Logo Simon Quievreux" width={64} height={64} style={{ opacity: .5}}/>
                    </Link>
                    <button type='button' onClick={()=>setDarkMode(!darkMode)}>
                        {darkMode ? (
                            <Sun size={iconSize} className='gray-400' />
                        ):(
                            <Moon size={iconSize} className='gray-400' />
                        )}
                    </button>
                </div>
                <div className='dflexcolumn gap32' style={{justifyContent: 'center', height: '100%'}}>
                    <div className='dflexrow gap8 nowrap w100 gapBetween'>
                        {project?.acf?.tag && project?.acf?.tag?.length > 0 && (
                            <div className='dflexrow gap8 wrap w100'>
                                {project?.acf?.tag.map((tag, index) => (
                                    <div className='tag' key={index}>
                                        <h6 className='regular16' key={index}>{tag?.value}</h6>
                                    </div>
                                ))}
                            </div>
                        )}
                        {project?.acf?.year && (
                            <h3 className='gray-200'
                                style={{fontWeight: 600, textAlign: 'right'}}>{project?.acf?.year}</h3>
                        )}
                    </div>
                    <div className="dflexcolumn w100">
                        <h1 className='gradientTitre gradientTitreGray'>{project?.acf?.name}</h1>
                    </div>
                    {project?.acf?.description && (
                        <p className='titre6 gray-500'>{project?.acf?.description}</p>
                    )}
                </div>
            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default memo(ProjectPage)