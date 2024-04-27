import './Home.scss';
import {memo} from "react";

function HomePage() {
    return (
        <div className="HomePage">
            <div className="gradient-blur gradient-blur--revert">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <br/>
            <br/>
            <h1>Simon Quievreux</h1>
            <a target='_blank'
               rel='noopener'
               href="https://twitter.com/Sq_Visuals">
                My X account
            </a>
        </div>
    )
}

export default memo(HomePage)