import React, { useCallback } from 'react';


export const PageType = {
    HOME: 1,
    ABOUT: 2,
    ART: 4,
    FB: 5,
}


const NavBar = props => {

    const { setChosenTab, resetChosenTab, setDefaultTab } = props;
    const pages = ['home', 'about', 'experience', 'art'];

    const onMouseEnter = (type) => {
        setChosenTab(type);
    }

    return (
        <>

            <div className="absolute inset-x-0 bottom-0 p-20">
                <nav className="h-1/4 w-auto bg-transparent flex items-center justify-center rounded-lg">
                    <ul className="flex flex-row items-center space-x-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">

                        <li id="home">
                            <div className="font-mono font-extrabold	 hover:text-white text-transparent" onClick={() => setDefaultTab(PageType.HOME)} onMouseEnter={() => onMouseEnter(PageType.HOME)} onMouseLeave={resetChosenTab}>
                                home
                        </div>
                        </li>
                        <li>
                            <div className="font-mono hover:text-white" onClick={() => setDefaultTab(PageType.ABOUT)} onMouseEnter={() => onMouseEnter(PageType.ABOUT)} onMouseLeave={resetChosenTab}>lillian</div>
                        </li>
                        <li>
                            <div className="font-mono hover:text-white" onClick={() => window.open("https://www.instagram.com/art.czar.lillian/")} >art</div>
                        </li >
                        <li>
                            <div className="font-mono hover:text-white" >|</div>
                        </li >
                        <li>
                            <div className="font-mono hover:text-white" onClick={() => setDefaultTab(PageType.FB)} onMouseEnter={() => onMouseEnter(PageType.FB)} onMouseLeave={resetChosenTab}>oculus</div>
                        </li >
                        <li>
                            <div className="font-mono hover:text-white" onClick={() => setDefaultTab(PageType.AMAZON)} onMouseEnter={() => onMouseEnter(PageType.AMAZON)} onMouseLeave={resetChosenTab}>amazon</div>
                        </li>
                    </ul >
                </nav >
            </div >
        </>
    );

}


export default NavBar;
