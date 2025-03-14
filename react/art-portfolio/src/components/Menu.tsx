import React, { useState, useEffect} from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const DESKTOP_WIDTH = 768;
const MOBILE_WIDTH = 200;

const DESKTOP_MENU_WIDTH = 500;
const MOBILE_MENU_WIDTH = 100;

function Menu() {
  const [selectedItem, setSelectedItem] = useState('home');
  const [content, setContent] = useState(<div>Welcome to Home!</div>);
    type VariantType = "persistent" | "temporary" | "permanent" | undefined;

  const [variant, setVariant] = useState<VariantType>(window.innerWidth > DESKTOP_WIDTH ? "persistent" : "temporary");
  const [width, setWidth] = useState(window.innerWidth < DESKTOP_WIDTH ? MOBILE_MENU_WIDTH : DESKTOP_MENU_WIDTH);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > DESKTOP_WIDTH) {
        setVariant("persistent" as const);
        setWidth(DESKTOP_MENU_WIDTH);
      } else {
        setVariant("temporary" as const);
        setWidth(MOBILE_MENU_WIDTH);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    switch (item) {
      case 'home':
        setContent(<div>Welcome to Home!</div>);
        break;
      case 'about':
        setContent(<div>Welcome to About!</div>);
        break;
      case 'contact':
        setContent(<div>Welcome to Contact!</div>);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Drawer
        anchor="left"
        variant={variant} // @ts-ignore
        open={true}
        sx={{
          width: {width},
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: {width},
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem key="home" onClick={() => handleItemClick('home')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem key="about" onClick={() => handleItemClick('about')}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem key="contact" onClick={() => handleItemClick('contact')}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ marginLeft: window.innerWidth < DESKTOP_WIDTH ? MOBILE_MENU_WIDTH : DESKTOP_MENU_WIDTH }}>
        {content}
      </div>
    </div>
  );
}

export default Menu;
