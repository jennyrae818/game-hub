import React from 'react';
//import '../styles/style.css';


function Footer() {
  return (
    <footer className="footer">
    <div class="row">

    <div class="column">
      <div class="pacman">
      <div class="pacman__eye"></div>
      <div class="pacman__mouth"></div>
      <div class="pacman__food"></div> 
      </div>   
    </div>

    <div class="column">
      <a href="https://github.com/jennyrae818" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_orange.png" alt="Jenny Github" className="icon"/></a>
    </div>

    <div class="column">
      <a href="https://github.com/aditore" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_blue.png" alt="Anthony Github" className="icon"/></a>
    </div>

    <div class="column">
      <a href="https://github.com/marycpriyanka" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_pink.png" alt="Priyanka Github" className="icon"/></a>
    </div>

    <div class="column">
      <a href="https://github.com/becca6758" target="_blank" rel="noreferrer noopener"><img src="../images/pacman_red.png" alt="Rebecca Github" className="icon"/></a>
    </div>
    

    <div class="column">
      <div class="pacman2">
      <div class="pacman__eye"></div>
      <div class="pacman__mouth"></div>
      <div class="pacman__food"></div> 
    </div>   

    

    </div>

    </div>

{/*   
    <div class="pacman">
      <div class="pacman-top"></div>
      <div class="pacman-bottom"></div>
      <div class="feed"></div>
      </div>
    */}

  </footer>
  );
}

export default Footer;