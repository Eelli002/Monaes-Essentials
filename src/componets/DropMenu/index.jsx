import './style.css';
import React from 'react'

const DropMenu = ({ categories, setOpen, open }) => {

  return (
    <>
      <div className='drop-menu'>
        <nav className='dd-nav' onClick={() => setOpen(!open)}>
          <ul className='dd-nav-ul'>
            {categories.map((category, index) => {
              return (
                <li className='dd-items'>
                  <a href={`/#${category.name}`}>
                    {category.name}
                  </a>
                </li>
              )
            })}
            <li className='dd-items'>
              <a href='/about'>
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default DropMenu
