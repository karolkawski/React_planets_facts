// import iconHamburger from './assets/icon-hamburger.png';

export function Navigation() {
    return (
        <header className="App__Header">
        <nav className='Navigation'>
          <div className="Navigation__Title">THE PLANNETS</div>
          <ul className="Navigation__Menu">
            <li className="Navigation__Item">Mercury</li>
            <li className="Navigation__Item">Venus</li>
            <li className="Navigation__Item">Earth</li>
            <li className="Navigation__Item">Mars</li>
            <li className="Navigation__Item">Jupiter</li>
            <li className="Navigation__Item">Saturn</li>
            <li className="Navigation__Item">Uranus</li>
            <li className="Navigation__Item">Neptune</li>
          </ul>
          
          <button className="Navigation__Toggle"><img src="/assets/icon-hamburger.png"/></button>
        </nav>
      </header>
    )

}