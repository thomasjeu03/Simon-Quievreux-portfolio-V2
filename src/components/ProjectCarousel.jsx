import React, { memo, useEffect, useState } from "react";
import CardProject from "./CardProject.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import {motion} from "framer-motion";

const ProjectCarousel = ({ projects, loading }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!loading) {
            const carouselTrack = document.querySelector('.carousel-track');
            let speed = 5; // Initial speed
            carouselTrack?.style.setProperty('--timer', (projects.length || 3) * speed + 's');

            const checkIsMobile = () => {
                if (window.innerWidth > 1100) {
                    setIsMobile(false);
                } else {
                    setIsMobile(true);
                }
            };

            const handleWheel = (event) => {
                if (isMobile) {
                    return
                }
                speed = 5;
                carouselTrack?.style.setProperty('--timer', (projects.length || 3) * speed + 's');
            };

            // Initial check for mobile view
            checkIsMobile();

            // Event listeners
            window.addEventListener('resize', checkIsMobile);
            window.addEventListener('wheel', handleWheel);

            // Cleanup
            return () => {
                window.removeEventListener('resize', checkIsMobile);
                window.removeEventListener('wheel', handleWheel);
            };
        }
    }, [projects, loading, window.innerWidth]);

    return (
        <div className="carousel">
            {!isMobile ? (
                <>
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
                </>
            ):(
                <>
                    {!loading && (
                        <Swiper
                            direction={isMobile ? 'horizontal' : 'vertical'}
                            slidesPerView={'auto'}
                            spaceBetween={isMobile ? 16 : 32}
                            loop
                            autoplay={{ // Autoplay configuration
                                delay: 3000, // Delay in milliseconds between slides
                                disableOnInteraction: false, // Autoplay continues even when user interacts with swiper
                            }}
                            mousewheel={{
                                releaseOnEdges: true,
                            }}
                        >
                            {projects.map((project, index) => (
                                <SwiperSlide key={index}>
                                    <CardProject
                                        data={project?.acf}
                                        slug={project?.slug}
                                        scale={1}
                                        rotate={0}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </>
            )}
        </div>
    );
};

export default memo(ProjectCarousel);
