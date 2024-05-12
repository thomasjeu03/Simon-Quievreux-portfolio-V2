import './style/App.scss'
import {Routes, Route} from "react-router-dom"
import backgroundImage from "./../public/img/homeBg.png"
import TemplatePage from "./pages/TemplatePage.jsx"
import {useEffect} from "react";
import {useDarkModeContext} from "./providers/DarkModeProvider.jsx";

function App() {
    const {darkMode} = useDarkModeContext();

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

    return (
        <div className="main">
            <div className="gradient-blur gradient-blur--revert">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <figure className="backgroundImage invertInDarkMode">
                <img src={backgroundImage} alt="backgroundImage"/>
            </figure>
            <Routes>
                <Route exact path='/' element={<TemplatePage/>}/>
                <Route path='/:slug' element={<TemplatePage />} />
            </Routes>
        </div>
    )
}

export default App
