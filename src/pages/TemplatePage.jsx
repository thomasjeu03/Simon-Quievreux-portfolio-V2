import './home/Home.scss';
import {memo, useEffect, useState} from "react";
import { Download, Send, Sun, Moon } from 'lucide-react';
import {useDarkModeContext} from "../providers/DarkModeProvider.jsx";
import baseURL from "../config.js";
import axios from "axios";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import ProjectCarousel from "../components/ProjectCarousel.jsx";
import Xlogo from "../../public/img/xlogo.png";
import discordLogo from "../../public/img/discordlogo.png";
import ReactTypingEffect from 'react-typing-effect';

const TemplatePage = ({home, loadingHome}) => {
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
            {loading && loadingHome && (
                <div className='loader'></div>
            )}
            <ProjectCarousel projects={projects} loading={loading && loadingHome} />
            {!loadingHome && !loading && (
                <motion.div
                    initial={{opacity: 0, x: 60}}
                    animate={{opacity: 1, x: 0}}
                    transition={{
                        duration: .6,
                        type: "spring",
                        bounce: 0.35
                    }} className="right">
                    <div className='dflexrow gapBetween gap8 w100' style={{alignItems: 'flex-start'}}>
                        {home?.acf?.logo && (
                            <Link to="/">
                                <img src={darkMode ? home?.acf?.logo_dark?.sizes?.thumbnail : home?.acf?.logo?.sizes?.thumbnail}
                                     alt="Logo Simon Quievreux" width={64} height={64}
                                />
                            </Link>
                        )}
                        {!loading && (
                            <button type='button' onClick={() => setDarkMode(!darkMode)}>
                                {darkMode ? (
                                    <Sun size={iconSize} className='gray-400'/>
                                ) : (
                                    <Moon size={iconSize} className='gray-400'/>
                                )}
                            </button>
                        )}
                    </div>
                    <div className="dflexcolumn w100">
                        <h1 className='gradientTitre'>{home?.acf?.title}</h1>
                        {(home?.acf?.subtitle && home?.acf?.subtitle_2 && home?.acf?.subtitle_3) ? (
                            <ReactTypingEffect
                                speed={50}
                                eraseSpeed={25}
                                eraseDelay={3000}
                                typingDelay={0}
                                cursor={'_'}
                                cursorClassName='cursor'
                                text={[home?.acf?.subtitle, home?.acf?.subtitle_2, home?.acf?.subtitle_3]}
                                displayTextRenderer={(text, i) => {
                                    return (
                                        <h2 className='gray-500' key={i}>
                                            {text}
                                        </h2>
                                    );
                                }}
                            />
                        ):(
                            <>
                                {(home?.acf?.subtitle && !home?.acf?.subtitle_2 && !home?.acf?.subtitle_3) && (
                                    <h2 className='gray-500'>{home?.acf?.subtitle}</h2>
                                )}
                                {(!home?.acf?.subtitle && home?.acf?.subtitle_2 && !home?.acf?.subtitle_3) && (
                                    <h2 className='gray-500'>{home?.acf?.subtitle_2}</h2>
                                )}
                                {(!home?.acf?.subtitle && !home?.acf?.subtitle_2 && home?.acf?.subtitle_3) && (
                                    <h2 className='gray-500'>{home?.acf?.subtitle_3}</h2>
                                )}
                            </>
                        )}
                    </div>
                    {home?.acf?.description && (
                        <h3 className='titre6 gray-500'>{home?.acf?.description}</h3>
                    )}
                    {(home?.acf?.email || home?.acf?.resume) && (
                        <div className='dflexrow gap16 w100 wrap'>
                            {home?.acf?.email && (
                                <a className='CTA'
                                   href={`mailto:${home?.acf?.email}`}>
                                    <Send className='white' size={iconSize}/>
                                    {home?.acf?.contact_button_text || "Contact me"}
                                </a>
                            )}
                            {home?.acf?.resume && (
                                <a target='_blank'
                                   rel='noopener'
                                   className='CTA CTA--pink'
                                   href={home?.acf?.resume?.url}>
                                    <Download className='white' size={iconSize}/>
                                    {home?.acf?.resume_button_text || "My resume"}
                                </a>
                            )}
                        </div>
                    )}
                    {(home?.acf?.twitter_url || home?.acf?.instagram_url) && (
                        <div className='dflexrow gap24 w100 wrap'>
                            {home?.acf?.twitter_url && (
                                <a href={home?.acf?.twitter_url} target="_blank" rel='noopener'>
                                    <img src={Xlogo} alt='logo X' height={22} style={darkMode ? {
                                        filter: 'invert(1)',
                                        opacity: .8
                                    } : {opacity: .8}}/>
                                </a>
                            )}
                            {home?.acf?.instagram_url && (
                                <a href={home?.acf?.instagram_url} target="_blank" rel='noopener'>
                                    <img src={discordLogo} alt='logo Discord' height={22} style={darkMode ? {
                                        filter: 'invert(1)',
                                        opacity: .8
                                    } : {opacity: .8}}/>
                                </a>
                            )}
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    )
}

export default memo(TemplatePage)