import './style/App.scss'
import {Routes, Route} from "react-router-dom"
import TemplatePage from "./pages/TemplatePage.jsx"
import {useEffect, useState} from "react";
import {useDarkModeContext} from "./providers/DarkModeProvider.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import axios from "axios";
import baseURL from "./config.js";

function App() {
    const {darkMode} = useDarkModeContext();
    const [home, setHome] = useState({})
    const [loadingHome, setLoadingHome] = useState(true)

    useEffect(() => {
        const htmlTag = document.documentElement;
        if (darkMode) {
            htmlTag.classList.add('darkMode');
        } else {
            htmlTag.classList.remove('darkMode');
        }
        return () => {
            htmlTag.classList.remove('darkMode');
        };
    }, [darkMode]);

    useEffect(() => {
        setLoadingHome(true)
        const fetchHomes = async () => {
            try {
                const response = await axios.get(`${baseURL}/home/?per_page=1`)
                setHome(response.data[0] || {})
                setLoadingHome(false)
            } catch (error) {
                console.error("Error fetching home:", error)
                setLoadingHome(false)
            }
        }
        fetchHomes()
    }, [])

    const root = document.documentElement;

    const primaryColor = `${home?.acf?.primary_color?.red},${home?.acf?.primary_color?.green},${home?.acf?.primary_color?.blue}`;
    const secondaryColor = `${home?.acf?.secondary_color?.red},${home?.acf?.secondary_color?.green},${home?.acf?.secondary_color?.blue}`;

    root.style.setProperty('--primary-rgb', primaryColor);
    root.style.setProperty('--secondary-rgb', secondaryColor);

    return (
        <div className="main">
            {home?.acf?.background && (
                <figure className="backgroundImage invertInDarkMode">
                    <img src={home?.acf?.background?.sizes?.large} alt="backgroundImage"/>
                </figure>
            )}
            <Routes>
                <Route exact path='/' element={<TemplatePage home={home} loadingHome={loadingHome}/>}/>
                <Route path='/:slug' element={<ProjectPage logo={darkMode ? home?.acf?.logo_dark?.sizes?.thumbnail : home?.acf?.logo?.sizes?.thumbnail} loadingLogo={loadingHome} />} />
            </Routes>
        </div>
    )
}

export default App
