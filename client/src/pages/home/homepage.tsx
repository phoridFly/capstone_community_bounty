/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState} from 'react';
import './homepage.css';
import SplitPane from 'react-split-pane';
import { SolicitationList } from './solicitation-list';
//import MapView from './mapview';
import { WebMapView } from './mapview';
import { SolicitsWithAddress, Watchlist } from '../../models';   // FIX THIS MODEL
import { fetchSolicitationsWithAddressCoordinates, fetchMyWatchlist} from '../../services'  // USE AFTER MODEL IS FIXED

import { useAuth0 } from "@auth0/auth0-react";
import Constants from '../../auth/Constants';

const styles = {
  background: '#48504c',
  width: '2px',
  cursor: 'col-resize',
  margin: '0 5px',
  height: '100%',
};




//middle of country
var centerLong: number = -98.35;
var centerLat: number = 39.413;
var activeTab = 1; 
var radius = 15;
var selected = "";
var popselect = "";

export const HomePage: React.FunctionComponent = () => {

  const { user, getAccessTokenSilently } = useAuth0();

  //when user updates radius 
  const [newRadius, updateRadius] = useState(false);
  const refreshRadius = () => {
    updateRadius(newRadius => !newRadius);
  }
  
  //when user updates coordinates
  const [newCoords, updateCoords] = useState(false);
  const refreshComponent = () => {
    updateCoords(newCoords => !newCoords);
  }    

  //when user selects a card or tab
  const [userSelect, updateComponent] = useState(false);
  const updateView = () => {
    updateComponent(userSelect => !userSelect);
  }



  const setLong = (arg: number) => {
    centerLong = arg;
    //console.log("homepage long");
    //console.log(centerLong);
    //refreshComponent();
  }  

  //this sets selected on list
  const setSelected = (arg: string) => {
    selected = arg; 
    popselect = arg; 
    updateView();
  }

  const setPopSelect = (arg: string) => {
    popselect = arg;
    selected = arg; 
    updateView();
  }

  const setTab = (arg: number) => {
    activeTab = arg;
    //console.log("homepage long");
    //console.log(centerLong);
    updateView();
  }

  const setLat = (arg: number) => {
    centerLat = arg;
    //console.log("homepage lat");
    //console.log(centerLat);
    refreshComponent();
  } 

  const setRadius = (arg: number) => {
    radius = arg;
    //console.log("homepage lat");
    //console.log(centerLat);
    refreshRadius();
  } 


  

const [solicitsAndAddresses, getSolicitation] = useState<SolicitsWithAddress[]>([])
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: `${Constants.audience}`,
          scope: 'read:current_user',
        })
        fetchSolicitationsWithAddressCoordinates(centerLong, centerLat, radius, token).then(response => {
          //console.log(centerLong + ' ' + ' ' + centerLat)
        //  console.log("in fetchWithCoords");

          getSolicitation(response);
        });
      } catch (e) {
        console.error(e);
      }  
    })();
  }, [getAccessTokenSilently, newCoords, newRadius, userSelect, user]);

  //console.log(solicitsAndAddresses);

  //fetch for watchlist 
  const [watchlist, getWatchlist] = useState<Watchlist[]>([])
  useEffect(() => {
      (async () => {
          try {
            const token = await getAccessTokenSilently({
              audience: `${Constants.audience}`,
              scope: 'read:current_user',
            })
      fetchMyWatchlist(user.sub, token).then(response => {
        //console.log("in fetchWatchlist");

          getWatchlist(response);
      });

  } catch (e) {
    console.error(e);
  }
})();
}, [getAccessTokenSilently, user]);
  
  //console.log(watchlist);

  //pulls posts on watchlist
  var watchArray: SolicitsWithAddress[] = [];
  watchlist.forEach(watching => {
    solicitsAndAddresses.forEach(post => {
      if (post.product_name === watching.product_name) {
        watchArray.push(post);
      }
    });
  });
  //console.log("Watching",watchArray);

  //the map doesn't like empty things 
  var emptyCheck:SolicitsWithAddress[] = [];
  solicitsAndAddresses.forEach(post => {
    if (post._id === "default") {
    //  console.log("empty");
    } else {
      emptyCheck.push(post);
    }
  });
  
  
  return (
  
    <>
    <SplitPane split="vertical" style={{height:'93vh'}} minSize={200} maxSize={350} defaultSize={300} resizerStyle={styles}>
  
        <SolicitationList posts={emptyCheck} watch={watchArray} activeTab={setTab} rad={setRadius} selected={setSelected} popselect={popselect} />
     
        <WebMapView lat={setLat} activeTab={activeTab} long={setLong} posts={solicitsAndAddresses} watch={watchArray} rad={radius} selected={selected} popselect={setPopSelect}/>
     
      </SplitPane>
      </>
    );
  }



export default HomePage; 