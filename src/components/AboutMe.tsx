import React from 'react';

interface AboutMeProps {
  menuWidth: number;
}

const MOBILE_FONT_SIZE = 10;
const DESKTOP_FONT_SIZE = 13;

const AboutMe: React.FC<AboutMeProps> = ({ menuWidth }) => {
  const [dynamicPadding, setDynamicPadding] = React.useState(20);
  const [fontSize, setFontSize] = React.useState(DESKTOP_FONT_SIZE);

  React.useEffect(() => {
    const handleResize = () => {
      const newPadding = window.innerWidth < 600 ? 5 : 20;
      setDynamicPadding(newPadding);

      const newFontSize = window.innerWidth < 600 ? MOBILE_FONT_SIZE : DESKTOP_FONT_SIZE;
      setFontSize(newFontSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial padding and font size based on current window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div style={{ padding: dynamicPadding, backgroundColor: 'var(--menu-color'  }}>
    <div style={{ textAlign: 'center' }}>
      <img
        src="profile.jpg"
        alt="About Me"
        style={{  width: `${menuWidth * 0.8}px`, height:  `${menuWidth * 0.55}px`, borderRadius: '1%', opacity: 0.5 }}
      />
    </div>
      <div style={{ textAlign: 'center', width: `${menuWidth * 0.9}px`, backgroundColor: 'var(--menu-color'  }}>

        <p style={{ textAlign:"left", fontSize: fontSize, color: 'var(--menu-text-color'}}>
          <strong className="font-bold italic">lillian hong</strong> is an indie comics artist, r&d prototyper, and
          master angler. While her professional work lives at the future intersection of wearable tech and artificial intelligence, her creative work is rooted in the past, infused with a reverence for nature and history. She draws inspiration from Fujianese/Taoist mythology, wuxia fantasy, chinese porcelain, and the ocean.
        </p>
        <p style={{ fontSize: fontSize * 0.85, color: 'var(--menu-text-color'}}>
          <strong><em>favorite things:</em></strong> oolong tea, emerald, moon snails, fish
        </p>
        <div style={{ textAlign: 'center', color: 'var(--menu-text-color', fontSize: fontSize}}>
              let's collaborate! <br />
              <a href="#"
                  style = {{color: 'var(--menu-text-color', textAlign: 'center', fontSize: fontSize}}

                  onClick={(e) => {
                      e.preventDefault();
                      const sausage = 'c.lillianhong@gmail.com';
                      window.open(`mailto:${sausage}`, '_blank');
                      }}>contact me</a>
        </div>
      </div>

    </div>
  );
};

export default AboutMe;
