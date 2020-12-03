import React, { useEffect, useState } from 'react';
import { Person, Solicitation } from '../../models';
import { getSinglePerson, updatePerson, fetchMySolicitations, updateSolicitation } from '../../services';
import { useAuth0 } from "@auth0/auth0-react";
import Constants from '../../auth/Constants';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Uploady from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';

/**********************PROFILE SECTION*************************/
const url = Constants.baseURL;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      color: "light"
    },
    cardNew: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 'xl',
      display: 'block',
      backgroundColor: '#F8F8F8'
  },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      align: 'center',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    uploadButton: {
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center',
      marginTop: '1%',
      overflow: 'hidden',
      
  },
  }));



export const ProfileInfo: React.FunctionComponent =(props)  => {
  const { user, getAccessTokenSilently } = useAuth0();

  const [newInput, updatePerson] = useState(false);
  const refreshComponent = () => {
    updatePerson(newInput => !newInput);
  }
  
  //create delay for post submission and reload 
  const CreateDelay=()=>{
    const timeout =  setTimeout(function(){
          refreshComponent();
    }, 1000);
    return () => clearTimeout(timeout);
  }
  //initial fetch
  const [pers, setPerson] = useState<Person[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: `${Constants.audience}`,
          scope: 'read:current_user',
        })
        getSinglePerson(user.sub, token).then(response => {
          setPerson(response);
      });
  } catch (e) {
    console.error(e);
  }
})();
  }, [getAccessTokenSilently, newInput, user]);
 


  //form toggle  
  const [showForm, setShowForm] = useState(false);
  const showFormToggle = () => {
      setShowForm(showForm => !showForm);
  }

  //form control  
  const classes = useStyles();
  /* 
  const [locAmb, setLocAmb] = React.useState('');
  const handleLocAmb = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocAmb(event.target.value as string);
  }
*/
  //nickname in form 
  const [newNickname, setName] = React.useState('');
  const handleNickName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  }

  // Fetch for solicitations
  const [mySolicitations, getMySolicitations] = useState<Solicitation[]>([])
  useEffect(() => {
      (async () => {
          try {
              const token = await getAccessTokenSilently({
                  audience: `${Constants.audience}`,
                  scope: 'read:current_user',
              })
              fetchMySolicitations(user.sub, token).then(response => {
                  getMySolicitations(response);
              });
          } catch (err) {
              console.error(err);
          }
      })();
  }, [getAccessTokenSilently, user]);

  const FreshUploadButton = asUploadButton(
    (React.forwardRef((props) => {
        return (
            <Box {...props} className={classes.uploadButton} border={1} borderRadius={16}>
                Upload Photo
            </Box >
        )
    }
)));

  //edit profile form
  var ProfileForm = (<React.Fragment />);
  if (showForm) {
    ProfileForm =
        (
        (<React.Fragment>
          <Paper className={classes.cardNew}>
            <h4>Edit Profile</h4>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper classname = {classes.paper}>
                    <p>    Change NickName</p>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField  label="New Nickname"  value={newNickname}
                      onChange={handleNickName} />
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper classname = {classes.paper}>
                    <p>Change Picture
                      <br></br>
                      <br></br>
                      <Uploady
                      destination={{ url: `${url}/people/images/${user.sub}` }}>
                        <FreshUploadButton />
                      </Uploady>
                      <br></br>
                    </p>
                  </Paper>
                </Grid>
              </Grid>
              <br></br>
              <ButtonGroup orientation="vertical">
                <Button  onClick={() => {
                  (async () => {
                    try {
                      const token = await getAccessTokenSilently({
                        audience: `${Constants.audience}`,
                        scope: 'read:current_user',
                      })
                      if (newNickname) {
                        submitForm({
                          nickname: newNickname,
                        }, user.sub, token);
                        updateSolicitationsWithNickname(mySolicitations, newNickname, token);
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
                <Button onClick={() => { showFormToggle(); }}>
                  Cancel
                </Button>
                </ButtonGroup>
          </Paper>
        </React.Fragment>)
        );
  } else {
    ProfileForm = (<React.Fragment />);
  }
  


  //add ratings and reviews?  
  const items = pers.map((value, index: any) =>
  
  (<><Container key={value._id}>
    <h2>Welcome {value.name}!</h2>
    <br></br><Box>
      <Avatar alt="Remy Sharp" src={`https://storage.googleapis.com/imagerybucket/${value.picture}`} className={classes.large} />
      </Box><br></br><Box>
      <h3>Nickname: {value.nickname} </h3>
      </Box>
  </Container>
  
  </>)
     );
  
  var ProfileList = (<React.Fragment />);
  if (!showForm) {
     ProfileList=
        (
       (<React.Fragment><br></br>
        
         {items}
              <br></br>
              <Button variant="contained" onClick={showFormToggle}>Edit Profile</Button>
        

            
            </React.Fragment>)
        );
} else {
    ProfileList = (<React.Fragment />);
}

  return (
    <>
      {ProfileForm}        
      {ProfileList}
      </>

    );
  }



//helper function for add
function submitForm(perUpdate: Person, user:string, token:string): void {
  //console.log("person update", perUpdate, user);
  updatePerson(perUpdate, user, token).then((result: { status: number; }) => {
      if (result.status === 200) {
          
      }
  });
}

// update post helper function
function updateMySolicitation(solicitation_id: string, updatedSolicitation: Solicitation, accessToken: string): void {
  updateSolicitation(solicitation_id, updatedSolicitation, accessToken).then((result: { status: number; }) => {
      if (result.status === 200) {
          
      }
  });
}

function updateSolicitationsWithNickname(mySolicits: Solicitation[], updatedNickname: string, accessToken: string) {
  for (var eachSolicit of mySolicits) {
    if (eachSolicit.seller_nickname !== updatedNickname) {
      updateMySolicitation(eachSolicit._id as string, {
        product_name: eachSolicit.product_name,
        product_cost: eachSolicit.product_cost,
        description: eachSolicit.description,
        still_active: eachSolicit.still_active,
        still_available: eachSolicit.still_available,
        compost_heap: eachSolicit.compost_heap,
        food_pic : eachSolicit.food_pic,
        seller_sub: eachSolicit.seller_sub,
        seller_nickname: updatedNickname,
        product_id: eachSolicit.product_id,
        address_id: eachSolicit.address_id,
      },
        accessToken);
    }
  }
}