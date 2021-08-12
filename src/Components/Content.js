import React, { useState } from 'react';
import aboutImage from '../images/aboutimage.jpg';
import { PageType } from "./NavBar"
import Horizon from "./Horizon_Content"
import Ocean from "./Lillian_Content"
import Resume from "./Resume_Content"
import Amazon from "./Amazon_Content"
import useWindowDimensions from "../Hooks/WindowDimensions"

const Content = (props) => {
    const { chosenTab } = props;
    const { height, width } = useWindowDimensions();
    const [contentImage, setContentImage] = useState(PageType.HOME);


    switch (chosenTab) {
        case PageType.ABOUT:
            return < div className="bg-white h-screen flex h-full w-full items-center justify-center" > <Ocean width={width} height={height} /> </div >
            break;
        case PageType.FB:
            return < div className="bg-white h-screen flex h-full w-full items-center justify-center" > <Horizon width={width} height={height} /> </div >
            break;
        case PageType.HOME:
            return < div className="bg-white h-screen flex h-full w-full items-center justify-center" >
                <Resume width={width} height={height} />
            </div >
            break;
        case PageType.AMAZON:
            return < div className="bg-black h-screen flex h-full w-full items-center justify-center" > <Amazon width={width} height={height} /> </div >
            break;
        default:
            return (< div className="bg-white h-screen flex h-full w-full items-center justify-center " >

            </div >)
            break;
    }

}



export default Content; 
