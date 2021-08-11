import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar, { PageType } from "../../Components/NavBar"
import Content from "../../Components/Content"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


const LandingPage = () => {

    const [defaultTab, setDefaultTab] = useState(PageType.HOME)
    const [chosenTab, setChosenTab] = useState(PageType.HOME);

    const resetChosenTab = () => {
        setChosenTab(defaultTab);
    }

    return (<main id="landing">


        <div className="flex flex-row h-full w-full absolute">
            {/* <NavBar setChosenTab={setChosenTab} resetChosenTab={resetChosenTab} /> */}
            <Content chosenTab={chosenTab} />
        </div>

        <div id="navbardiv" className="flex h-1/4 w-full absolute inset-x-0 bottom-0">
            <NavBar setChosenTab={setChosenTab} resetChosenTab={resetChosenTab} setDefaultTab={setDefaultTab} />
        </div>
        <div className="flex h-1/6 w-full absolute inset-xy-0 top-0 items-center justify-center text-xs italic" >
            [instructions] click objects, drag for orbit camera, two finger swipe for zoom
        </div>

    </main>);
}

export default LandingPage;