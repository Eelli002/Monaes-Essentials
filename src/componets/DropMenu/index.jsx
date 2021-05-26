import { useState } from 'react';
import './style.css';
import React from 'react'

const DropMenu = ({ categories }) => {

  return (
    <>
      <div className='drop-menu'>
        <nav className='dd-nav'>
          <ul>
            {categories.map((category, index) => {
              return (
                <li className={category.name}>
                  <a href={`/#${category.name}`}>
                    {category.name}
                  </a>
                </li>
              )
            })}
            <li>
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
