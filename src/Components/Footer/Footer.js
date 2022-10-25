import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <div className='FooterContainer'>
        <div className='FooterIcons'>
            <a className='FooterLinks' href="https://twitter.com/Alexandre_Imre" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
            <a className='FooterLinks' href="https://www.linkedin.com/in/alexandre-imre-87b1b071" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            <a className='FooterLinks' href="https://github.com/AlexImre" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
        </div>
    </div>
  )
}