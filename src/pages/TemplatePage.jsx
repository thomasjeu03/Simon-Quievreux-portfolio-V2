import './home/Home.scss';
import {memo, useEffect, useState} from "react";
import { Download, Send, Sun, Moon } from 'lucide-react';
import logo from '../../public/img/logo.png'
import {useDarkModeContext} from "../providers/DarkModeProvider.jsx";
import baseURL from "../config.js";
import axios from "axios";
import CardProject from "../components/CardProject.jsx";
import {useParams} from "react-router-dom";

const TemplatePage = () => {
    const iconSize  = 20
    const {darkMode, setDarkMode} = useDarkModeContext()
    const { slug } = useParams();

    const [loading, setLoading] = useState(true)
    const [isProjectSelected, setIsProjectSelected] = useState(false)
    const [projectSelected, setProjectSelected] = useState({})
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

    useEffect(() => {
        if (projects.length > 0){
            if (slug) {
                setIsProjectSelected(true)
                setProjectSelected(projects?.find(project => project?.slug === slug))
            }
        }
    }, [slug, projects]);

    console.log(projectSelected)
    console.log(projects?.find(project => project?.slug === slug))

    return (
        <div className="HomePage">
            {!isProjectSelected && (
                <div className="left">
                    {projects && projects?.map((project, index) => (
                        <CardProject
                            key={index}
                            data={project?.acf}
                            slug={project?.slug}
                            scale={1}
                            rotate={0}
                        />
                    ))}
            </div>
            )}
            <div className="right">
                <p>slug : {slug}</p>
                {loading && (
                    <p>Chargement</p>
                )}
                <div className='dflexrow gapBetween gap8 w100' style={{ alignItems: 'flex-start'}}>
                    <a href="/">
                        <img src={logo} className='invertInDarkMode' alt="Logo Simon Quievreux" width={64} height={64} style={{ opacity: .5}}/>
                    </a>
                    <button type='button' onClick={()=>setDarkMode(!darkMode)}>
                        {darkMode ? (
                            <Sun size={iconSize} className='gray-400' />
                        ):(
                            <Moon size={iconSize} className='gray-400' />
                        )}
                    </button>
                </div>
                <div className="dflexcolumn w100">
                    {isProjectSelected ? (
                        <h1 className='gradientTitre gradientTitreGray'>{projectSelected?.acf?.name}</h1>
                    ):(
                        <h1 className='gradientTitre'>SqVisuals</h1>
                    )}
                    <h2 className='gray-500'>Graphic Designer</h2>
                </div>
                <h3 className='titre6 gray-500'>Hi, I'm Simon, a 22yo graphic designer and video maker based in France specialized in sports and esports.</h3>
                <div className='dflexrow gap12 w100 wrap'>
                    <a className='CTA'
                       href="mailto:quievrs@gmail.com">
                        <Send className='white' size={iconSize} />
                        Contact me
                    </a>
                    <a target='_blank'
                       rel='noopener'
                       className='CTA CTA--pink'
                       href="https://twitter.com/Sq_Visuals">
                        <Download className='white' size={iconSize} />
                        My resume
                    </a>
                </div>
            </div>
        </div>
    )
}

export default memo(TemplatePage)