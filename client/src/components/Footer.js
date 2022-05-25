import React from 'react';
//import '../styles/style.css';


function Footer() {
  const jennyrae818 = () => {
    window.open("https://github.com/jennyrae818");
  };
  const aditore = () => {
    window.open("https://github.com/aditore");
  };
  const marycpriyankae= () => {
    window.open("https://github.com/marycpriyankae");
  };
  const becca6758 = () => {
    window.open("https://github.com/becca6758");
  };
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
      <button onClick={jennyrae818}><img src="../images/pacman_orange.png" alt="Jenny Github" className="icon"/></button>
    </div>

    <div class="column">
      <button onClick={aditore}><img src="../images/pacman_blue.png" alt="Anthony Github" className="icon"/></button>
    </div>

    <div class="column">
      <button onClick={marycpriyankae}><img src="../images/pacman_pink.png" alt="Priyanka Github" className="icon"/></button>
    </div>

    <div class="column">
      <button onClick={becca6758}><img src="../images/pacman_red.png" alt="Rebecca Github" className="icon"/></button>
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