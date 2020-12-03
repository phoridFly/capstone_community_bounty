import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Container, Button, ButtonGroup, TextField, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchMyWatchlist, fetchItems, deleteWatchlistItem, addWatchlistItem } from '../../services'
import { Item, Watchlist} from '../../models';
import Constants from '../../auth/Constants';
import '../list.css';

//styles for our material ui components
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: '900px',
            display: 'flex',
            backgroundColor: '#9caca3',
            color: '#080c0d'
        },
        cardNew: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 'xl',
            display: 'block',
            backgroundColor: '#F8F8F8'
        },
        superContainer: {
            backgroundColor: '#333d39',
            color: '#f7eee9',
            height: '100vh',
            maxWidth: 'xl',
        },
        prodName: {
            padding: theme.spacing(1),
            display: 'inline-block',
            align: 'left',
        },
     
        expand: {
          marginLeft: "auto"
        }

    }),
);



//watchlist magic happenining 
export const MyWatchlist: React.FunctionComponent = () => {
    const classes = useStyles();
    const { user, getAccessTokenSilently } = useAuth0();

    //fetch for watchlist after post
    const [newWatchlist, updateWatchlist] = useState(false);
    const refreshComponent = () => {
        updateWatchlist(newWatchlist => !newWatchlist);
    }
    //fetch for items 
    const [products, getProducts] = useState<Item[]>([])
    useEffect(() => {
        (async () => {
            try {
              const token = await getAccessTokenSilently({
                audience: `${Constants.audience}`,
                scope: 'read:current_user',
              })
        fetchItems(token).then(response => {
         getProducts(response);
        });
    } catch (e) {
      console.error(e);
    }
  })();
  }, [getAccessTokenSilently]);
      
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
            getWatchlist(response);
        });

    } catch (e) {
      console.error(e);
    }
  })();
  }, [getAccessTokenSilently, newWatchlist, user.sub]);
  
    //watchlist list 
    const items = watchlist.map((value, index)=> 
    (<React.Fragment>
            <Paper key={value._id} className={classes.card} variant="outlined">
                <Typography className={classes.prodName}>
                    {value.product_name}
            </Typography>    
            <IconButton edge="start" className={classes.expand} aria-label="delete" onClick={() => {
                (async () => {
                    try {
                        const token = await getAccessTokenSilently({
                        audience: `${Constants.audience}`,
                        scope: 'read:current_user',
                    })
                        handleDelete(value._id!, user.sub, token);  
                        getWatchlist(watchlist.filter(item => item._id !== value._id));
                    }catch (err) {
                        console.log(err);
                    }
                })();  
                
                    }}>    
                    <Delete/>
                </IconButton>
                </Paper>
        </React.Fragment>)
    );
    
    //toggle for add form 
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
    
  //form for watchlist
    const [inputValue, setInputValue] = React.useState('');
    var newWatchlistForm = (<React.Fragment />);
    if (showForm) {
        newWatchlistForm =
            (
                (<React.Fragment>
                    <Paper className={classes.cardNew}>
                    <h3>Add to Watchlist</h3>
                        <Autocomplete
                            id="combo-box-demo"
                            options={products}
                            getOptionLabel={(option) => option.product_name}                       
                        renderInput={(params) => <TextField {...params} label="Select item from list" variant="outlined" />}
                        inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                           setInputValue(newInputValue);
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
                                    if (inputValue) {
                                        submitForm(inputValue, user.sub, token);
                                        CreateDelay();
                                        showFormToggle();
                                    }    
                                }catch (err) {
                                    console.log(err);
                                }
                                })();        
                                }}>        
                            Add to Watchlist</Button>
                        <Button onClick={() => { setShowForm(showForm => !showForm); }}>
                            Cancel
                       </Button>
                </ButtonGroup>
                    </Paper>
                </React.Fragment>)
            );
    } else {
        newWatchlistForm = (<React.Fragment />);
    }
    //main render 
    return (
        <>
            <Container className={classes.superContainer}>
                <h2> My Watchlist</h2>
                <Button variant="contained" onClick= {showFormToggle}>Create New Watchlist item</Button>
                {newWatchlistForm}
                <div className = {"ScrollStyle"}>
                <Grid >
                    {items}
                </Grid>

                </div>
            </Container>
       </>
    );
}


//add token here as well
const handleDelete = (_id: string, person_sub: string, token: string) => {
    deleteWatchlistItem(_id, person_sub, token).then(result => {
       // console.log(result);
    });
}

//add token here too 
function submitForm(product_name:string,person_sub:string, token:string): void {
    addWatchlistItem(product_name,person_sub ,token).then((result: { status: number; }) => {
        if (result.status === 200) {
            
        }
    });
}