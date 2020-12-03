import React, { useEffect, useRef} from 'react';
import './homepage.css';
import { loadModules } from 'esri-loader';
import { useAuth0 } from "@auth0/auth0-react";
import { SolicitsWithAddress } from '../../models';   // FIX THIS MODEL


//middle of country
var centerLong: number = -98.35;
var centerLat: number = 39.413;
var zoomLevel: number = 4;
var rad = 0; 
/*
Web Map component. Use useEffect to get the address coordinates we want to plot
                   Use useEffect to render the map.
*/

interface PropsInterface {
  lat: any;
  long: any;
  posts: SolicitsWithAddress[];
  watch: SolicitsWithAddress[];
  activeTab: any;
  rad: any; 
  selected: any;
  popselect: any; 
}


export const WebMapView = (props:PropsInterface) => {
  const mapRef = useRef(null);
  const { user, isAuthenticated } = useAuth0();

  //this prevents the homepage from breaking since it still loads in webpack
  var test: string;
  if (isAuthenticated) {
    test = user.sub;
  }
  else {
    test = " ";
  }


  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      // basemaptoggle is if we want to add a widget that allows users to change the map type
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/symbols/SimpleLineSymbol','esri/symbols/SimpleFillSymbol','esri/Graphic', 'esri/geometry/Circle','esri/layers/GraphicsLayer', 'esri/widgets/BasemapToggle', 'esri/widgets/Search',"esri/PopupTemplate"], { css: true })
      .then(([ArcGISMap, MapView, SimpleLineSymbol, SimpleFillSymbol, Graphic, Circle, GraphicsLayer, BasemapToggle, Search, PopupTemplate]) => {
        const map = new ArcGISMap({
          basemap: 'gray-vector'
        });

      
        // load the map view at the ref's DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [centerLong, centerLat],
          zoom: zoomLevel
        });


        
        var list: SolicitsWithAddress[] = [];
        var active = props.activeTab; 
        if (active == 1) {
          list = props.posts;
        }
        if (active == 2) {
          list = props.watch;
        }

        //console.log("List", list);
        //console.log("watch", props.watch);
        //console.log("posts", props.posts);
    
        // create new graphics layer
        var graphicsLayer = new GraphicsLayer();
        if (isAuthenticated) {

        
          // loop over the coordinate array and create a new point for each one
          for (let i = 0; i < list.length; i++) {
            //console.log(props.posts[i].coordinates[0]);
            //console.log(props.posts[i].coordinates[1]);

            var point = {
              type: "point",
              longitude: list[i].coordinates[0],
              latitude: list[i].coordinates[1]
            };
          
        
            var simpleMarkerSymbol;
           // console.log(props.selected);
            if (list[i]._id === props.selected) {
              //to highlight the view 
              simpleMarkerSymbol = {
                type: "text",
                color: "#7A003C",
                text: "\ue67f", //star
                font: {
                  // autocasts as new Font()
                  size: 30,
                  family: "CalciteWebCoreIcons" // Esri Icon Font
                }
              };
              //console.log("posts", props.posts);
              // Create attributes for our pop up here
            }else{
     
              // setup the marker symbol
              simpleMarkerSymbol = {
                type: "text", // autocasts as new TextSymbol()
                color: "#333d39",
                text: "\ue61d", // esri-icon-map-pin
                font: {
                  // autocasts as new Font()
                  size: 30,
                  family: "CalciteWebCoreIcons" // Esri Icon Font
                }
              };
            }

            var foodAvailable:string = "No";
            if(list[i].still_available === true) {
              foodAvailable = "Yes";
            }
            // process the end date here
            var attributes = {
              Food: list[i].product_name,  // Name for the pop up, we can set this later when we get solicitations to work
              PerUnit: list[i].cost_unit,
              Description: list[i].description,  // We could anything from solictiations we want here
              Cost: list[i].product_cost,  // We could anything from solictiations we want here
              SellerName: list[i].seller_nickname,
              IsAvailable: foodAvailable,
              ImageName: list[i].food_pic,
              SolicitationId: list[i]._id
            };
            //button
            var seeThis = {
              title: "view Item",
              id: "view-this",
              className: "esri-icon-left-arrow-circled"
            };

            var zoomHere = {
              title: "zoom in",
              id: "zoom-in",
              className: "esri-icon-zoom-in-magnifying-glass"
            }
            // Create popup template
            var template = new PopupTemplate({
              title: "{Food}",
              content: [{ 
                type: "media",
                mediaInfos: [{
                title: "",
                caption: "<b>Cost: </b>${Cost} per {PerUnit}</b></br><b> Description: </b>{Description}</br> <b>Seller: </b> {SellerName} </br> <b>Available: </b> {IsAvailable}",
                value: {
                   sourceURL: 'https://storage.googleapis.com/imagerybucket/{ImageName}'
                }
                      }],
              }], 
              actions: [seeThis, zoomHere]
            });
            template.overwriteActions = true;

            // combine the point and symbol options together
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
              //*** ADD ***//
              attributes: attributes,
              popupTemplate: template
            });

            graphicsLayer.add(pointGraphic);
          };

     

          var searchBtn = new Search({
            view: view,
            resultGraphicEnabled: false
          });

          var basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "hybrid"
          });

          searchBtn.on('search-complete', function (event: any) {
           centerLong = event.results[0].results[0].feature.geometry.longitude;
           props.long(centerLong);
           centerLat = event.results[0].results[0].feature.geometry.latitude;
            props.lat(centerLat);
            //console.log("view", centerLat, centerLong);
         
            zoomLevel = 8;

       
          });
          
         

          // Add the search widget to the top right of map
          view.ui.add(searchBtn, {
            position: "top-right"
          });

          
          view.ui.add(basemapToggle, "top-right");

          rad = props.rad;
          var circle = new Circle({
            center: [centerLong, centerLat],
            radius: rad,             // add distance
            radiusUnit: "miles", // add distance unit  
            geodesic: true
          });

        // if(props.rad === 5)
         var fillSymbol = {
            type: "simple-fill",
            color: [10,0,0, 0.1],
            style: "solid",
            outline: {
              color: "#6A7B76",
              width: 1
            }
          };
          

          var circleGraphic = new Graphic({
            geometry: circle,
            symbol: fillSymbol
          });

          view.graphics.add(circleGraphic);

          
          
       }
      map.add(graphicsLayer);

        //this triggers the action on the popup
        view.popup.on("trigger-action",
          function (event:any) {
            if (event.action.id === "view-this") {
              var addThis = view.popup._feature._contentWidgets[0].attributes.SolicitationId;
              props.popselect(addThis);
            } 
            if (event.action.id === "zoom-in") {
              view.goTo({
                center: view.center,
                zoom: view.zoom + 6
              });
            }
          })  

        return () => {
          if (view) {
            // destroy the map view
            view.destroy();
          }
        };
      });
    }
    );

  return <div className="webmap" ref={mapRef} />;
};