import './home/Home.scss';
import {memo, useEffect, useRef, useState} from "react";
import { Sun, Moon } from 'lucide-react';
import Xlogo from '../../public/img/xlogo.png'
import {useDarkModeContext} from "../providers/DarkModeProvider.jsx";
import baseURL from "../config.js";
import axios from "axios";
import {motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";
import { Player, ControlBar, PlayToggle, VolumeMenuButton, ProgressControl, CurrentTimeDisplay, TimeDivider, DurationDisplay, FullscreenToggle } from 'video-react';
import 'video-react/dist/video-react.css';

const ProjectPage = ({logo, loadingLogo}) => {
    const iconSize  = 20
    const {darkMode, setDarkMode} = useDarkModeContext()
    const { slug } = useParams();

    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState([])

    const rightDiv = useRef(null);

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

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            const halfViewportHeight = viewportHeight / 2;
            rightDiv.current.style.marginTop = `${(viewportHeight - rightDiv.current.children[0]?.offsetHeight) /2}px`;
            rightDiv.current.style.marginBottom = `${(viewportHeight - rightDiv.current.children[rightDiv.current.children.length - 1]?.offsetHeight) /2}px`;

            if (rightDiv.current) {
                const children = rightDiv.current.children;

                Array.from(children).forEach((child) => {
                    const rect = child.getBoundingClientRect();
                    const positionY = rect.top + rect.height / 2;
                    const distanceToMiddle = Math.abs(positionY - halfViewportHeight);
                    const maxDistance = halfViewportHeight;

                    const scale = 0.7 + (1 - 0.7) * (1 - distanceToMiddle / maxDistance);
                    const rotate = 3 - (10 * (distanceToMiddle / maxDistance));

                    child.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
                });
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [project]);

    const socialNetworkarray = [
        {name: 'facebook'},
        {name: 'twitter'},
        {name: 'instagram'},
        {name: 'behance'},
        {name: 'other'},
    ]

    const scale = 1

    const imageArray = [
        'image_1',
        'image_2',
        'image_3',
        'image_4',
        'image_5',
        'image_6',
        'image_7',
        'image_8',
        'image_9',
        'image_10',
        'image_11',
        'image_12',
        'image_13',
        'image_14',
        'image_15',
        'image_16',
        'image_17',
        'image_18',
        'image_19',
        'image_20',
    ]

    const videosArray = [
        'video_1',
        'video_2',
        'video_3',
        'video_4',
        'video_5',
        'video_6',
        'video_7',
        'video_8',
        'video_9',
        'video_10',
    ]

    return (
        <div className="ProjectPage">
            {loading && (
                <div className='loader'></div>
            )}
            <div className="left">
                {!loading && (
                    <motion.div
                        initial={{opacity: 0, x: -60}}
                        animate={{opacity: 1, x: 0}}
                        transition={{
                            duration: .6,
                            delay: 0,
                            type: "spring",
                            bounce: 0.35
                        }}
                        className='dflexcolumn gap32 w100' style={{justifyContent: 'center', height: '94dvh'}}>
                        <div className='dflexrow gapBetween gap8 w100' style={{alignItems: 'flex-start'}}>
                            {logo && (
                                <Link to="/">
                                    <img src={logo} alt="Logo Simon Quievreux" width={64}
                                         height={64}/>
                                </Link>
                            )}
                            {!loadingLogo && (
                                <button type='button' onClick={() => setDarkMode(!darkMode)}>
                                    {darkMode ? (
                                        <Sun size={iconSize} className='gray-400'/>
                                    ) : (
                                        <Moon size={iconSize} className='gray-400'/>
                                    )}
                                </button>
                            )}
                        </div>
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
                        {project?.acf?.client && (
                            <p className='regular16 gray-300'>Made for : <span
                                className="gray-500">{project?.acf?.client}</span></p>
                        )}
                        {darkMode ? (
                            project?.acf?.logo_dark_mode && (
                                <img src={project?.acf?.logo_dark_mode?.sizes?.medium}
                                     alt={project?.acf?.logo_dark_mode?.title} height={100}/>
                            )) : (
                            project?.acf?.logo_light_mode && (
                                <img src={project?.acf?.logo_light_mode?.sizes?.medium}
                                     alt={project?.acf?.logo_light_mode?.title} height={100}/>
                            ))}
                        <div className='dflexrow gap32 wrap w100'>
                            {socialNetworkarray && socialNetworkarray.map((social, index) => (
                                project?.acf?.[social?.name + '_url'] && (
                                    <a href={project?.acf?.[social?.name + '_url']} target="_blank" rel='noopener'
                                       key={index}>
                                        {social?.name === 'facebook' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round"
                                                 className="lucide lucide-facebook gray-400">
                                                <path
                                                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                            </svg>
                                        )}
                                        {social?.name === 'twitter' && (
                                            <img src={Xlogo} alt='logo X' height={22} style={darkMode ? {
                                                filter: 'invert(1)',
                                                opacity: .8
                                            } : {opacity: .8}}/>
                                        )}
                                        {social?.name === 'instagram' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round"
                                                 className="lucide lucide-instagram gray-400">
                                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                            </svg>
                                        )}
                                        {social?.name === 'behance' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" className='gray-400'>
                                                <path
                                                    d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                                            </svg>
                                        )}
                                        {social?.name === 'other' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round" className="lucide lucide-link gray-400">
                                                <path
                                                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                                <path
                                                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                            </svg>
                                        )}
                                    </a>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="right" ref={rightDiv}>
                {!loading && (
                    <>
                        {project?.acf?.main_image && (
                            <motion.div
                                initial={{opacity: 0, y: 60}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: .6,
                                    type: "spring",
                                    bounce: 0.35
                                }}
                                className="cornerBorder imagePreview"
                                style={{transform: `rotate(${0}deg) scale(${scale})`}}>
                                <div className="top"></div>
                                    <div className="bottom"></div>
                                    <div className="firstBorder">
                                        <img id='image_0' className='imagePreview' style={{width: '100%', height: 'auto'}}
                                             src={project?.acf?.main_image?.sizes?.large}
                                             alt={project?.acf?.main_image?.title}/>
                                    </div>
                                </motion.div>
                            )}


                        {videosArray.map((video, index) => (
                            project?.acf?.[video] && (
                                <div className='cornerBorder videoPreview' key={index}>
                                    <div className="top"></div>
                                    <div className="bottom"></div>
                                    <div className="firstBorder">
                                        <Player
                                            src={project?.acf?.[video]?.url}
                                            fluid={true}
                                            width="100%"
                                            height="100%"
                                        >
                                            <ControlBar autoHide={true} disableDefaultControls>
                                                <PlayToggle/>
                                                <VolumeMenuButton/>
                                                <CurrentTimeDisplay/>
                                                <TimeDivider/>
                                                <DurationDisplay/>
                                                <ProgressControl/>
                                                <FullscreenToggle/>
                                            </ControlBar>
                                        </Player>
                                    </div>
                                </div>
                            )
                        ))}

                        {imageArray.map((imageArray, index) => (
                            project?.acf?.[imageArray] && (
                                <motion.div
                                    initial={{opacity: 0, y: 60}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{
                                        duration: .6,
                                        type: "spring",
                                        bounce: 0.35
                                    }}
                                    className="cornerBorder imagePreview" key={index}
                                    style={{transform: `rotate(${0}deg) scale(${scale})`}}>
                                    <div className="top"></div>
                                    <div className="bottom"></div>
                                    <div className="firstBorder">
                                        <img id={`image_${index}`} className='imagePreview'
                                             style={{width: '100%', height: 'auto'}}
                                             src={project?.acf?.[imageArray]?.sizes?.large}
                                                 alt={project?.acf?.[imageArray]?.title}/>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </>
                    )}
                </div>
        </div>
    )
}

export default memo(ProjectPage)