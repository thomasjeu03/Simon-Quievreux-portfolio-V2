import {memo} from "react";
import CardProject from "./CardProject.jsx";

const ProjectCarousel = ({projects}) => {
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