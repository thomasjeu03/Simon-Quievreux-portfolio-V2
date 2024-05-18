import {memo, useEffect} from "react";
import CardProject from "./CardProject.jsx";

const ProjectCarousel = ({projects}) => {

    useEffect(() => {
        const carouselTrack = document.querySelector('.carousel-track')
        const speed = 6
        carouselTrack.style.setProperty('--timer', projects.length * speed + 's');
    }, [])

    return (
        <>
            <div className="carousel">
                <div className="carousel-track">
                    {projects.concat(projects).map((project, index) => (
                        <CardProject
                            key={index}
                            data={project?.acf}
                            slug={project?.slug}
                            scale={1}
                            rotate={0}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default memo(ProjectCarousel)