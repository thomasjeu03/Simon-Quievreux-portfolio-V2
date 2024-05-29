import {memo, useEffect} from "react";
import CardProject from "./CardProject.jsx";
import {useDarkModeContext} from "../providers/DarkModeProvider.jsx";
import {motion} from "framer-motion";

const ProjectCarousel = ({projects, loading}) => {
    const {darkMode} = useDarkModeContext()

    useEffect(() => {
        if (!loading) {
            const carouselTrack = document.querySelector('.carousel-track')
            const speed = 6
            carouselTrack?.style.setProperty('--timer', (projects.length || 3 ) * speed + 's');
        }
    }, [projects, darkMode, loading])

    return (
        <>
            <div className="carousel">
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: 0,
                            type: "spring",
                            bounce: 0.35
                        }}
                        className="carousel-track">
                        {projects.concat(projects).map((project, index) => (
                            <CardProject
                                key={index}
                                data={project?.acf}
                                slug={project?.slug}
                                scale={1}
                                rotate={0}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default memo(ProjectCarousel)