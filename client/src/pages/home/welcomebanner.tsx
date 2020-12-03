
import React from 'react';
import { Button } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import './welcomebanner.css'








export const WelcomeBanner = (props: any) => {

  const {
    loginWithRedirect,
  } = useAuth0();
  return (
  
    <><div>
    </div>

      
     <div className="bgimg-2">
  <div className="caption"> 
  </div>
      </div>
      
      <div className= "relative" >
        <div className="secondary">
          <h2> Community Bounty </h2>
  <p>Share your Bounty, Create a Community</p>
      <Button color= "dark"  onClick={() => loginWithRedirect()}>
            Login
          </Button>
  </div>
</div>

<div className="bgimg-2">
  <div className="caption">
  
  </div>
      </div>
      
      <div className= "relative" >
        <div className="primary">
          <h2> Why Community Bounty? </h2>
          <p> The dual issues of food waste and inaccessibility of fresh food are
          drivers of both climate change and widespread health issues. Millions of tons of food are wasted every year,
          and lack of availability or cost of fresh food in many urban and suburban areas restricts access to these resources.
          Backyard gardens, residential poultry, small orchards and small farms across the US produce tons of wasted food, either because there
          is too much for the owner to use or little incentive or incomplete infrastructure in place to distribute it.
          Community Bounty aims to change that.  Whether your garden is bountiful or you are in search for local goods, we look to 
          provide a simple tool that creates a community focused on the joy of sharing the spoils of a garden.</p>
    
  </div>
      </div>
   

<div className="bgimg-2">
  <div className="caption">
  
  </div>
      </div>
      <div className= "credit">
  image credit: Mark Weinberg | markweinbergphoto.com
</div>
</>   
 
    
  );
};

