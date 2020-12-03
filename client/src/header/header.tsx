import React, { ReactNode, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Constants } from '../auth/Constants';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import Button from '@material-ui/core/Button';
import './header.css';
import { Redirect } from 'react-router-dom';

export const Header = (props: { children: React.ReactNode; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  
  
  
    return (
         <>
        <header>
          <Navbar className="color-nav" dark expand="md">
            <NavbarBrand className="brand-nav" href="/home">
          Community Bounty</NavbarBrand>

            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>

                {isAuthenticated && (
                  <><NavItem>
                    <NavLink href="/home">Home</NavLink>
                  </NavItem><NavItem>
                      <NavLink href="/watchlist">My Watchlist</NavLink>
                    </NavItem><NavItem>
                      <NavLink href="/activity">My Activity</NavLink>
                    </NavItem><NavItem>
                      <NavLink href="/posts">My Posts</NavLink>
                    </NavItem><NavItem>
                      <NavLink href="/profile">My Profile</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/contactus">Contact-Us</NavLink>
                    </NavItem></>
                )}  {isAuthenticated ? (
                  <Button size="small" color="secondary" variant="outlined" onClick={event => logout({ returnTo: `${Constants.redirectUri}` })}>
                               Logout
                  </Button>
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                  )}
              </Nav>
            </Collapse>
          </Navbar>



        </header>
  
        <main>
          {props.children}
        </main></>
      
    );
}
      
