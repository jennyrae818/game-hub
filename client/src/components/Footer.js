import React from "react";


function Footer() {
  return (
    <footer className="footer">
    
      <div className="row">

        {/* PAC-MAN ANIMATION */}
        <div className="column">
          <div className="pacman">
            <div className="pacman__eye"></div>
            <div className="pacman__mouth"></div>
            <div className="pacman__food"></div> 
          </div>   
        </div>

        {/* GITHUB LINKS */}
        <div className="column">
          <a href="https://github.com/jennyrae818" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_orange.png" alt="Jenny Github" className="icon"/></a>
        </div>

        <div className="column">
          <a href="https://github.com/aditore" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_blue.png" alt="Anthony Github" className="icon"/></a>
        </div>

        <div className="column">
          <a href="https://github.com/marycpriyanka" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_pink.png" alt="Priyanka Github" className="icon"/></a>
        </div>

        <div className="column">
          <a href="https://github.com/becca6758" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_red.png" alt="Rebecca Github" className="icon"/></a>
        </div>
    
        {/* PACMAN ANIMATION */}
        <div className="column">
          <div className="pacman2">
            <div className="pacman__eye"></div>
            <div className="pacman__mouth"></div>
            <div className="pacman__food"></div> 
          </div>   
        </div>

      </div>

    </footer>
  );
}

export default Footer;