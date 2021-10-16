import React from 'react';
import styled from 'styled-components/macro';
import { FaFacebookF,FaTwitter,FaInstagram, FaGithubAlt } from "react-icons/fa"
import { Link } from 'react-router-dom';

const Footer = () => {
    return ( 
        <Footers>
            <div className="w3hubs-footer">
      
                <div className="w3hubs-icon">
                    <ul>
                    <li><Link to='/'  target="black"><FaFacebookF/></Link></li>
                    <li><Link to='/'  target="black"><FaGithubAlt/></Link></li>
                    <li><Link to='/'  target="black"><FaTwitter/></Link></li>
                    <li><Link to='/'  target="black"><FaInstagram/></Link></li>
                    
                    </ul>
                </div>
                <div className="w3hubs-nav">
                    <ul>
                    <li><Link to='/' >Home</Link></li>
                    <li><Link to='/' >About</Link></li>
                    <li><Link to='/' >Services</Link></li>
                    <li><Link to='/' >Gallery</Link></li>
                    <li className="p1"><Link to='/' >Contact Us</Link></li>
                    

                    </ul>
                </div>
                <div className="w3hubs-nav1">
                    <ul>
                    <li><Link to='/' >Product</Link></li>
                    <li><Link to='/' >new</Link></li>
                    <li><Link to='/' >Blog</Link></li>
                    <li><Link to='/' >Media</Link></li>
                    
                    
                    </ul>
                </div>

               
            </div>

        </Footers>
        );
}

export const Footers = styled.footer`
    background-color:black;
    width: 100%;
    height:170px;
    
`

export default Footer;