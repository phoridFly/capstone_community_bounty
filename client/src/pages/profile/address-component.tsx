import React, { useEffect, useState } from 'react';
import { Address, PlaceType } from '../../models';
import { fetchTotalAddress, deleteAddress, createAddress, updateAddress} from '../../services';
import { useAuth0 } from "@auth0/auth0-react";
import {List }from '@material-ui/core';
import {ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import {ListItemSecondaryAction } from '@material-ui/core';
import { ListItemText} from '@material-ui/core';
import { Avatar} from '@material-ui/core';
import { IconButton, Paper } from '@material-ui/core';
import { Edit, Home } from '@material-ui/icons';
import  { Delete }  from '@material-ui/icons';
import Constants from '../../auth/Constants';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import '../list.css';
import { Divider } from '@material-ui/core';
import * as dotenv from "dotenv";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
    },
    card: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: '900px',
      color: "#292f2d",
      backgroundColor: '#8a918c'
  },
  cardNew: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 'xl',
    display: 'block',
      backgroundColor: '#F8F8F8'
  },
  }));

/**********************GOOGLE AUTOCOMPLETE SECTION*************************/

//load API 
function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface PropsInterface {
  placeID: any;
}

//autcomplete combo box 
export default function GoogleMaps(props: PropsInterface) {
  const classes = useStyles();
  const [addressInfo, setAddressInfo] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const loaded = React.useRef(false);
  dotenv.config();

  const configValue: string | undefined = process.env.REACT_APP_APIKEY; 
  
  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${configValue}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request: { input: string }, callback: (results?: PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(addressInfo ? [addressInfo] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[];

        if (addressInfo) {
          newOptions = [addressInfo];
         //this is where we grab info for parent
         // console.log("place id", addressInfo.place_id);
          props.placeID(addressInfo.place_id);
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [addressInfo, inputValue, fetch, props]);


  return (
    <Autocomplete
      id="google-map-api"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={addressInfo}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setAddressInfo(newValue);
       
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Address" variant="outlined" fullWidth />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
            </Grid>
        );
      }}
    />
  );
}


/**************************PRIMARY ADDRESS COMPONENT***************************** */


//address component parent 
export const AddressInfo: React.FunctionComponent = () => {
  const classes = useStyles();

  const { user, getAccessTokenSilently } = useAuth0();
  const [newAddress, updateAddress] = useState(false);
  const refreshComponent = () => {
    updateAddress(newAddress => !newAddress);
}
  //initial load get address
  const [addy, setAddy] = useState<Address[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: `${Constants.audience}`,
          scope: 'read:current_user',
        })
        fetchTotalAddress(user.sub, token).then(response => {
          setAddy(response);
      });
  } catch (e) {
    console.error(e);
  }
})();
  }, [getAccessTokenSilently, newAddress, user]);

  /*************************this is for default Addresses ***************************/

const [showDefault, setDefaultForm] = useState(false);
const DefaultToggle = () => {
    setDefaultForm(showDefault => !showDefault);
  }
//d  
const mydefaultAddress = addy.filter( (addresses:Address) => (addresses.default_address === true));
  const notDefaultAddress = addy.filter((addresses: Address) => (addresses.default_address === false));
  const [defaultValue, setdefaultValue] = React.useState('');
var defaultAddressForm =  (<React.Fragment />);
  if (showDefault) {
    defaultAddressForm =
    (<React.Fragment>
      <Paper className={classes.cardNew}>         
        <Autocomplete
          id="combo-box-demo"
          options={notDefaultAddress}
          getOptionLabel={(option) => option.address_name}
          renderInput={(params) => <TextField {...params} label="Select Address from list" variant="outlined" />}
          inputValue={defaultValue}
          onInputChange={(event, newInputValue) => {
            setdefaultValue(newInputValue);
          }}
        />
        <ButtonGroup orientation="vertical">
          <Button onClick={() => {
                (async () => {
                    try {
                    const token = await getAccessTokenSilently({
                    audience: `${Constants.audience}`,
                    scope: 'read:current_user',
                 })
               if (defaultValue) {
                  changeDefaultValue(defaultValue, user.sub, token);
              }
             }catch (err) {
                   console.log(err);
              }
             })();        
              CreateDelay();
              DefaultToggle();
              }}>         
               Change Default</Button>
          <Button onClick={() => { setdefaultValue(""); DefaultToggle(); }}>
            Cancel
                       </Button>
        </ButtonGroup>
      </Paper>
    </React.Fragment>)
  } else {
    defaultAddressForm = (<React.Fragment />);
  }
  
 /************************this is for creating a new Address**************************** */ 
//from child to parent
  var addressPlace: string = "";
  const setAddressPlace = (arg: string) => {
    addressPlace = arg;
    //console.log("Parent place: ", addressPlace);
}  
  //form for add 
const [showForm, setShowForm] = useState(false);
const showFormToggle = () => {
    //console.log(showForm);
    setShowForm(showForm => !showForm);
  }
  
   //create delay for post submission and reload 
   const CreateDelay=()=>{
    const timeout =  setTimeout(function(){
          refreshComponent();
    }, 1000);
     return () => clearTimeout(timeout);
  }
  
  //    patch, edit form
//const [editEntry, setEdit] = useState(false);
//const showEditToggle = () => {
    //console.log(showForm);
  //  setEdit(editEntry => !editEntry);
  //}  
  
 
  
  //addressString in form 
  const [addressName, setName] = React.useState('');
  const handleAddressName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  }
  //console.log(addressName);



 //add new address form 
var AddressForm = (<React.Fragment />);
if (showForm) {
    AddressForm =
        (
      (<React.Fragment><br></br>
                           <Paper className={classes.cardNew}>

        <TextField required label="Address Name"  value={addressName}
          onChange={handleAddressName} />
        <br></br>
        <br></br>
        <GoogleMaps placeID={setAddressPlace}/>
        <ButtonGroup orientation="vertical">
            <br></br>
          <Button  onClick={() => {
            (async () => {
              try {
                const token = await getAccessTokenSilently({
                  audience: `${Constants.audience}`,
                  scope: 'read:current_user',
                })
                if (addressName) {
                  submitForm({
                    place_id: addressPlace,
                    address_name: addressName,
                    person_sub: user.sub
                  }, token);
                }
              }catch (err) {
                  console.log(err);
                }
              })();        
            CreateDelay();
            showFormToggle();
          }}>
                      Submit
            </Button>
                    <Button onClick={() => { setShowForm(showForm => !showForm); }}>
                        Cancel
                    </Button>
                </ButtonGroup>
          </Paper>
            </React.Fragment>)
        );
} else {
    AddressForm = (<React.Fragment />);
  }

  
  /********************this is the address List ************************* */
  
  //mapping the address values 
  const items = addy.map((value, index) => 
  (<><ListItem key={value._id}>
    <ListItemAvatar>
      <Avatar>
        <Home />
      </Avatar>
    </ListItemAvatar>
    <ListItemText className="name-col"
      primary={value.address_name}
      secondary={ value.address_string } />

    <ListItemSecondaryAction>

      <IconButton aria-label="delete" color="secondary" onClick={() => {
        if (window.confirm('Are you sure you want to delete this address?')) {
          (async () => {
            try {
              const token = await getAccessTokenSilently({
                audience: `${Constants.audience}`,
                scope: 'read:current_user',
              });
              handleDelete(value._id!, token);
            } catch (err) {
              console.log(err);
            }
          })();
          setAddy(addy.filter(item => item._id !== value._id));
        }
      } }>
        <Delete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
    <Divider variant="inset" component="li" /></>
  
 )
);

return (
<>
    <h2>Address Information <Button variant="contained" onClick={showFormToggle}>Add Address</Button> </h2>
   
    {AddressForm}
    {mydefaultAddress.map((defaultAddy) => (
      <ListItem key={defaultAddy._id}>
        <h4>Default Address is: {defaultAddy.address_name}    </h4>
      
          <IconButton aria-label="edit" onClick={DefaultToggle} >
                <Edit/>
            </IconButton>

      </ListItem>
    ))} 
    { defaultAddressForm}
    <div className = {"ScrollStyleTwo"}>
  <List dense={false} className={classes.card} variant="outlined">
      {items}
      </List>
      </div>
</>
);
};
  
//helper function for delete
function handleDelete(_id: string, token:string) {
  deleteAddress(_id, token).then(result => {
      //console.log(result);
  });
}

//helper function for add
function submitForm(newAddy: Address, token: string): void {
  createAddress(newAddy, token).then((result: { status: number; }) => {
      if (result.status === 200) {
          
      }
  });
}

function changeDefaultValue(addressName: string, user: string, token: string) {
  updateAddress(addressName, user, token).then((result: any) => {
   // console.log(result);
  });
}
 
  

