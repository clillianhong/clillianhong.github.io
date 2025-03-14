import React, { useState, useEffect, createContext, useContext} from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import AboutMe from './AboutMe';
import { IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { UnloadGameContext } from '../App';

const DESKTOP_WIDTH = 768;
const MOBILE_WIDTH = 200;

const DESKTOP_MENU_WIDTH = 400;
const MOBILE_MENU_WIDTH = 100;

const MOBILE_FONT_SIZE = 23;
const DESKTOP_FONT_SIZE = 30;



function Menu({ onWidthChange }: { onWidthChange: (width: number) => void }) {
  const [selectedItem, setSelectedItem] = useState('home');
  const [content, setContent] = useState(<div>Welcome to Home!</div>);
  const { unloadGame, setUnloadGame } = useContext(UnloadGameContext);

    type VariantType = "persistent" | "temporary" | "permanent" | undefined;
    const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setIsToggling(true);
    setOpen(!open);
  };


  const [variant, setVariant] = useState<VariantType>(window.innerWidth > DESKTOP_WIDTH ? "persistent" : "temporary");
  const [width, setWidth] = useState(window.innerWidth < DESKTOP_WIDTH ? MOBILE_MENU_WIDTH : DESKTOP_MENU_WIDTH);
  const [fontSize, setFontSize] = React.useState(DESKTOP_FONT_SIZE);
  const toggleButtonRef = React.createRef<HTMLButtonElement>();
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > DESKTOP_WIDTH) {
        setVariant("persistent" as const);
        setWidth(DESKTOP_MENU_WIDTH);
        setFontSize(DESKTOP_FONT_SIZE);
      } else {
        setVariant("temporary" as const);
        setWidth(MOBILE_MENU_WIDTH);
        setFontSize(MOBILE_FONT_SIZE);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!open || isToggling) return;

      const target = event.target as Element;
      if (target != null && !target.closest('.MuiDrawer-paper') && target !== toggleButtonRef.current) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [open, isToggling, toggleButtonRef]);

  useEffect(() => {
    if (isToggling) {
        setTimeout(() => {
        setIsToggling(false);
        }, 500);
    }
}, [isToggling]);

useEffect(() => {
    onWidthChange(open ? width: 0);
  }, [open, width, onWidthChange]);


  return (
      <div style={{backgroundColor: 'var(--menu-color)'}}>
        {/* <button ref={toggleButtonRef} onClick={handleDrawerToggle}> </button> */}
      <IconButton onClick={handleDrawerToggle} ref={toggleButtonRef} sx={{ position: 'absolute', top: width*0.2 / 2, left: open ? width + width*0.2 / 2: width*0.2 / 2 , width: width*0.2, height: width*0.2, backgroundColor: 'var(--menu-color)' }}>
        {open ? <ChevronLeftIcon sx={{width: width*0.2, height: width*0.2,}}/> : <ChevronRightIcon sx={{width: width*0.2, height: width*0.2,}}/>}
      </IconButton>

      <Drawer
        anchor="left"
        variant={variant} // @ts-ignore
        open={open}
        sx={{

          width: {width},
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: {width},
            boxSizing: 'border-box',
            fontSize: fontSize, // Set the font size here
            paddingTop: width / 9, // Added padding to the top
            backgroundColor: 'var(--menu-color)'
          },
          backgroundColor: 'var(--menu-color)'
        }}
      >
        <AboutMe menuWidth={width} />
        <List style={{backgroundColor: 'var(--menu-color', height: '100%'}} sx={{ '& .MuiListItemText-primary': {
             fontSize: fontSize,
             color: 'var(--menu-text-color)'

             },
             '& a': {
                    textDecorationColor: 'var(--menu-text-color)' // or any other color value
                }
             }} > {/* Set the font size here */}
          <ListItem key="home" >
             <Link to="/">
              <ListItemText primary="home"/ >
            </Link>
          </ListItem>
          {/* <ListItem key="about">
            <Link to="/projects">
              <ListItemText primary="projects" onClick={unloadGame}/>
            </Link>
          </ListItem> */}
          <ListItem key="external">
            <a href="https://www.instagram.com/c.lillianhong/" target="_blank" rel="noopener noreferrer">
              <ListItemText primary="instagram"/>
            </a>
          </ListItem>
          <ListItem key="external">
            <a href="https://www.linkedin.com/in/lillian-hong-69506b176/" target="_blank" rel="noopener noreferrer">
              <ListItemText primary="linkedin"/>
            </a>
          </ListItem>

        </List>
      </Drawer>
      </div>
  );
}

export default Menu;
