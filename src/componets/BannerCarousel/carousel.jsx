/* 
The purpose of this component is to render the proper banner depending on the current state of the carousel
- The default state should display the main welcome banner
- The state will change after a certain period of time
- the still will also change if 'next' or 'go back' arrows are clicked
- for each banner, a dot should be rendered at the bottom to display which banner user is currently on

*/

import { React, useState } from 'react';
import Banner from '../Banner';

import './carousel.css';

const Carousel = () => {
  const [banner, setBanner] = useState(0);

  // const bannerTimer = 
  // after 5 second setBanner = banner =+ 1;
  // if banner === 2, setBanner = 0;

  const bannerRender = banner => {
    if (banner === 2) return <Reviews/>
    else if (banner === 1) return <Specials />
    else return <Banner />
  }

  return (
    <section className='carousel-banner'>
      {bannerRender}
    </section>
  )
}

export default Carousel;