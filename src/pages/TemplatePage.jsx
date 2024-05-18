import './home/Home.scss';
import {memo, useEffect, useState} from "react";
import { Download, Send, Sun, Moon } from 'lucide-react';
import logo from '../../public/img/logo.png'
import {useDarkModeContext} from "../providers/DarkModeProvider.jsx";
import baseURL from "../config.js";
import axios from "axios";
import {Link} from "react-router-dom";
import ProjectCarousel from "../components/ProjectCarousel.jsx";

const TemplatePage = () => {
    const iconSize  = 20
    const {darkMode, setDarkMode} = useDarkModeContext()

    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setLoading(true)
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${baseURL}/projet/?per_page=100`)
                setProjects(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching projects:", error)
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])


    return (
        <div className="HomePage">
            <ProjectCarousel projects={projects} />
            <div className="right">
                {loading && (
                    <p>Chargement</p>
                )}
                <div className='dflexrow gapBetween gap8 w100' style={{alignItems: 'flex-start'}}>
                    <Link to="/">
                        <img src={logo} className='invertInDarkMode' alt="Logo Simon Quievreux" width={64} height={64}
                             style={{opacity: .5}}/>
                    </Link>
                    <button type='button' onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? (
                            <Sun size={iconSize} className='gray-400'/>
                        ) : (
                            <Moon size={iconSize} className='gray-400'/>
                        )}
                    </button>
                </div>
                <div className="dflexcolumn w100">
                    <h1 className='gradientTitre'>SqVisuals</h1>
                    <h2 className='gray-500'>Graphic Designer</h2>
                </div>
                <h3 className='titre6 gray-500'>Hi, I'm Simon, a 22yo graphic designer and video maker based in France
                    specialized in sports and esports.</h3>
                <div className='dflexrow gap12 w100 wrap'>
                    <a className='CTA'
                       href="mailto:quievrs@gmail.com">
                        <Send className='white' size={iconSize}/>
                        Contact me
                    </a>
                    <a target='_blank'
                       rel='noopener'
                       className='CTA CTA--pink'
                       href="https://twitter.com/Sq_Visuals">
                        <Download className='white' size={iconSize}/>
                        My resume
                    </a>
                </div>
            </div>
        </div>
    )
}

export default memo(TemplatePage)