import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import { useAuth0 } from "@auth0/auth0-react";
import Constants from '../../auth/Constants';
import Uploady from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";

import InputAdornment from '@material-ui/core/InputAdornment';


import { Solicitation, Item, Address, Person } from '../../models';
import { fetchMySolicitations, getSinglePerson, fetchItems, createSolicitation, fetchTotalAddress, updateSolicitation } from '../../services';

import '../list.css';


const url = Constants.baseURL;
//const googleBucketurl = Constants.bucketURL;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: '100%',
            //display: 'block',
            backgroundColor: '#9caca3'
        },
        compostCard: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 'xl',
            display: 'block',
            backgroundColor: 'Grey'
        },
        cardNew: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 'xl',
            display: 'block',
            backgroundColor: '#9caca3'
        },
        superContainer: {
            backgroundColor: '#333d39',
            color: '#f7eee9',
            height: '100vh',
            maxWidth: 'xl',
        },
        myPostButtons: {
            marginRight: '5%',
            marginBottom: '1%',
        },
        productImage: {
            height: '15vh',
            width: '15vh',
        },
        prodImg: {
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 'auto',
            display: 'block',
        },
        prodName: {
            // padding: theme.spacing(1),
            // display: 'inline-block',
            // align: 'left',
            // height: '15vh',
            // width: '10%',
        },
        prodDesc: {
            // padding: theme.spacing(1),
            // display: 'inline-block',
            // align: 'left',
            // height: '15vh',
            // width: '30%',
        },
        prodPrice: {
            // padding: theme.spacing(1),
            // display: 'inline-block',
            // align: 'right',
            // width: '10%',
        },
        prodButtons: {
            // padding: theme.spacing(1),
            // display: 'inline-block',
            //justifyContent: 'right',
            // width: '10%',
        },
        dateField: {
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1),
        },
        uploadButton: {
            cursor: 'pointer',
            width: '100%',
            textAlign: 'center',
            marginTop: '1%',
            overflow: 'hidden',
            
        },

    }),
);


export const MyPostsList: React.FunctionComponent = () => {
    const classes = useStyles();
    const { user, getAccessTokenSilently } = useAuth0();

    //create delay for post submission and reload 
    const CreateDelay=()=>{
    const timeout =  setTimeout(function(){
          refreshComponent();
    }, 1000);
     return () => clearTimeout(timeout);
    }
    const [newPost, updatePost] = useState(false);
    const refreshComponent = () => {
        updatePost(newPost => !newPost);
    }

    // Fetch for user's Person data
    const [myPersonDataArray, getMyPersonDataArray] = useState<Person[]>([])
    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: `${Constants.audience}`,
                    scope: 'read:current_user',
                })
                getSinglePerson(user.sub, token).then(response => {
                    getMyPersonDataArray(response);
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }, [getAccessTokenSilently, user]);
    const myPersonData = myPersonDataArray[0];

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
    }, [getAccessTokenSilently, newPost, user]);

    // Fetch for addresses to populate dropdown
    const [myAddresses, getMyAddresses] = useState<Address[]>([])
    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: `${Constants.audience}`,
                    scope: 'read:current_user',
                })
                fetchTotalAddress(user.sub, token).then(response => {
                    getMyAddresses(response);
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }, [getAccessTokenSilently, user]);
    
    const mergeByAddrId = (mySolicitations : any, myAddresses : any) =>
        mySolicitations.map((sol : any) => ({
            ...myAddresses.find((adr : any) => (sol.address_id === adr._id) && sol),
            ...sol
        }));
    
    const mySolicitsWithAddrName = mergeByAddrId(mySolicitations, myAddresses);
    
    const myValidSolicits = mySolicitsWithAddrName.filter(
        (solicit: Solicitation) => (solicit.compost_heap === false)
    );
    const myCompostHeap = mySolicitsWithAddrName.filter(
        (solicit: Solicitation) => (solicit.compost_heap === true)
    );

    const addDefaultSrc = (e : any) =>{
        e.target.src = '../logo192.png';
        e.alt='Default Visage'
    }



    const FreshUploadButton = asUploadButton(
        (React.forwardRef((props) => {
            return (
                <Box {...props} className={classes.uploadButton} border={1} borderRadius={16}>
                    Upload Photo
                </Box >
            )
        }
    )));


    const mySolicits = myValidSolicits.map((value: any) => (
        <React.Fragment>
            <Paper className={classes.card} variant="outlined">
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.productImage}>
                            <img className={classes.prodImg} alt="Product"
                                src={`https://storage.googleapis.com/imagerybucket/${value.food_pic}`}
                                onError={addDefaultSrc}
                            />
                        </ButtonBase>
                        <Uploady
                            destination={{ url: `${url}/solicitations/images/${value._id}` }}>
                            <FreshUploadButton/>
                        </Uploady>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs={4} justify="center" alignItems="center">
                                <Typography gutterBottom variant="subtitle1">
                                    {value.product_name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {value.description}
                                </Typography>
                                <Typography variant="body2">
                                    $ {value.product_cost} per {value.cost_unit}
                                </Typography>
                                <Typography variant="body2">
                                    {value.address_name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {(value.still_active) ?
                                    (<Button id={value._id} color="secondary" style={{cursor:'pointer'}}  variant="contained"
                                        onClick={(() => {
                                            (async () => {
                                                try {
                                                    const token = await getAccessTokenSilently({
                                                        audience: `${Constants.audience}`,
                                                        scope: 'read:current_user',
                                                    })
                                                    updateMySolicitation(value._id,
                                                        {
                                                            product_name: value.product_name,
                                                            product_cost: value.product_cost,
                                                            description: value.description,
                                                            still_active: !(value.still_active),
                                                            still_available: value.still_available,
                                                            compost_heap: value.compost_heap,
                                                            food_pic : value.food_pic,
                                                            seller_sub: value.seller_sub,
                                                            product_id: value.product_id,
                                                            address_id: value.address_id,
                                                    }, token);
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                            })();
                                            CreateDelay();
                                        })}> Status: Active </Button>)
                                    :
                                    (<Button id={value._id} style={{cursor:'pointer'}} variant="contained" color="primary"
                                        onClick={() => {
                                            (async () => {
                                                try {
                                                    const token = await getAccessTokenSilently({
                                                        audience: `${Constants.audience}`,
                                                        scope: 'read:current_user',
                                                    })
                                                    updateMySolicitation(value._id,
                                                        {
                                                            product_name: value.product_name,
                                                            product_cost: value.product_cost,
                                                            description: value.description,
                                                            still_active: !(value.still_active),
                                                            still_available: value.still_available,
                                                            compost_heap: value.compost_heap,
                                                            food_pic : value.food_pic,
                                                            seller_sub: value.seller_sub,
                                                            product_id: value.product_id,
                                                            address_id: value.address_id,
                                                    }, token);
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                            })();
                                            CreateDelay();
                                        }}> Status: Inactive </Button>)
                            }
                            {/* Product's Available State Display / Toggle */}
                            {(value.still_available) ?
                                (<Button id={value._id} style={{cursor:'pointer'}} variant="contained" color="secondary"
                                    onClick={() => {
                                        (async () => {
                                            try {
                                                const token = await getAccessTokenSilently({
                                                    audience: `${Constants.audience}`,
                                                    scope: 'read:current_user',
                                                })
                                                updateMySolicitation(value._id,
                                                    {
                                                        product_name: value.product_name,
                                                        product_cost: value.product_cost,
                                                        description: value.description,
                                                        still_active: value.still_active,
                                                        still_available: !(value.still_available),
                                                        compost_heap: value.compost_heap,
                                                        food_pic : value.food_pic,
                                                        seller_sub: value.seller_sub,
                                                        product_id: value.product_id,
                                                        address_id: value.address_id,
                                                }, token);
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        })();
                                        CreateDelay();
                                    }}> Product: Available </Button>)
                                :
                                (<Button id={value._id} style={{cursor:'pointer'}} variant="contained" color="primary"
                                    onClick={() => {
                                        (async () => {
                                            try {
                                                const token = await getAccessTokenSilently({
                                                    audience: `${Constants.audience}`,
                                                    scope: 'read:current_user',
                                                })
                                                updateMySolicitation(value._id,
                                                    {
                                                        product_name: value.product_name,
                                                        product_cost: value.product_cost,
                                                        description: value.description,
                                                        still_active: value.still_active,
                                                        still_available: !(value.still_available),
                                                        compost_heap: value.compost_heap,
                                                        food_pic : value.food_pic,
                                                        seller_sub: value.seller_sub,
                                                        product_id: value.product_id,
                                                        address_id: value.address_id,
                                                }, token);
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        })();
                                        CreateDelay();
                                    }}> Product: Unavailable </Button>)
                            }
                            </Grid>
                            <Grid >
                                {/**Compost button */}
                                <Grid container justify="flex-end">
                                    
                                    <Button  id={value._id} variant="contained" color="primary"
                                            onClick={() => {
                                                if(window.confirm('Are you sure?\nComposted listings cannot be altered or activated.\nComposting is irreversible.')) (async () => {
                                                    try {
                                                        const token = await getAccessTokenSilently({
                                                            audience: `${Constants.audience}`,
                                                            scope: 'read:current_user',
                                                        })
                                                        updateSolicitation(value._id,
                                                            {
                                                            product_name: value.product_name,
                                                            product_cost: value.product_cost,
                                                            description: value.description,
                                                            still_active: false,
                                                            still_available: false,
                                                            compost_heap: true,
                                                            seller_sub: user.sub,
                                                            address_id: value.address_id,
                                                        }, token);
                                                    } catch (err) {
                                                        console.log(err);
                                                    }
                                                })();
                                                CreateDelay();
                                            }}> Compost </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    ));

    const myCompost = myCompostHeap.map((value: any) =>
        (<React.Fragment>
            <Paper className={classes.compostCard} variant="outlined">
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.productImage}>
                        <img className={classes.prodImg} alt="Product"
                                src={`https://storage.googleapis.com/imagerybucket/${value.food_pic}`}
                                onError={addDefaultSrc}
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs={4} justify="center" alignItems="center">
                                <Typography gutterBottom variant="subtitle1">
                                    {value.product_name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {value.description}
                                </Typography>
                                <Typography variant="body2">
                                    $ {value.product_cost} per {value.cost_unit}
                                </Typography>
                                <Typography variant="body2">
                                    {value.address_name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {(value.still_active) ?
                                    (<Typography > Status: Active </Typography>)
                                    :
                                    (<Typography > Status: Inactive </Typography>)
                                }
                                {/* Product's Available State Display / Toggle */}
                                {(value.still_available) ?
                                    (<Typography > Product: Available </Typography>)
                                    :
                                    (<Typography > Product: Unavailable </Typography>)
                                }
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>)
    );


    // Fetch for items to populate product autocomplete / dropdown
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

    const [showForm, setShowForm] = useState(false);
    const showFormToggle = () => {
        setProductValue('');
        setProductPrice(0);
        setProductUnit('');
        setProductDesc('');
        setChosenAddressState(0);
        setShowForm(showForm => !showForm);
    }
    const [showCompost, setShowCompost] = useState(false);
    var myCompostSection = (<React.Fragment />);
    if (showCompost) {
        myCompostSection = myCompost;
    } else {
        myCompostSection = (<React.Fragment />);
    }
    const showCompostToggle = () => {
        setShowCompost(showCompost => !showCompost);
    }

    var postingStillActive = true;
    var postingStillAvailable = true;
    var postingCompost = false;
    
    
    const [productValue, setProductValue] = React.useState('');
    const [productPrice, setProductPrice] = React.useState(0);
    const [productUnit, setProductUnit] = React.useState('');
    const [productDesc, setProductDesc] = React.useState('');
    const [chosenAddressState, setChosenAddressState] = React.useState(0);

    const productPriceHandler = (event: React.ChangeEvent<{ value: any }>) => {
        var newPrice = event.target.value;
        setProductPrice(newPrice);
    }
    const productUnitHandler = (event: React.ChangeEvent<{ value: any }>) => {
        setProductUnit(event.target.value);
    }
    const productDescHandler = (event: React.ChangeEvent<{ value: any }>) => {
        setProductDesc(event.target.value);
    }
    const addressStateHandler = (event: React.ChangeEvent<{ value: any }>) => {
        setChosenAddressState(event.target.value);
    }
    
    // Address dropdown
    var addressDropdown = (
        <React.Fragment>
            <Container style={{ marginTop: '1%'}}>
                <Typography>
                    Please select an address:                     
                </Typography>
                <Select style={{minWidth: 200}}
                    id="cat-dropdown"
                    value={chosenAddressState}
                    onChange={addressStateHandler}
                >
                    {myAddresses.map((myAddresses) => (
                        <MenuItem key={myAddresses._id} value={myAddresses._id}>
                            {myAddresses.address_name}
                        </MenuItem>
                    ))}
                </Select>
            </Container>
        </React.Fragment>
    );


    var newPostForm = (<React.Fragment />);
    if (showForm) {
        newPostForm =
            (
                (<React.Fragment >
                    <Paper className={classes.cardNew} style={{ marginBottom: '1%'}}>
                    <h3>Create New Post</h3>
                    <Container style={{ marginTop: '1%'}}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={products}
                            getOptionLabel={(option) => option.product_name}                       
                            renderInput={(params) => <TextField {...params} label="Select a Product" variant="outlined" />}
                            inputValue={productValue}
                            onInputChange={(event, newProductValue) => {
                           setProductValue(newProductValue);
                          }}                        
                        />
                    </Container>
                    <Container style={{ marginTop: '1%'}}>
                        <TextField required label="Product Price" style={{display: 'inline-block'}}
                            InputProps={{
                                startAdornment:< InputAdornment position="start" > $</InputAdornment>,
                            }}
                            value={productPrice}
                            onChange={productPriceHandler}
                        />
                        <Typography style={{display: 'inline-block', verticalAlign: 'bottom', marginLeft: '1%', marginRight: '1%'}} > per </Typography>
                        <TextField required label="Product Unit" style={{display: 'inline-block'}}
                            placeholder="lb, each, dozen, etc"
                            value={productUnit}
                            onChange={productUnitHandler}
                        />
                    </Container>
                    {addressDropdown}
                    <Container style={{ marginTop: '1%'}}>
                        <TextField label="Product Description" style={{minWidth: 300, overflow: 'hidden'}}
                            value={productDesc}
                            onChange={productDescHandler}
                        />
                    </Container>
                    <Container>
                    <ButtonGroup orientation="horizontal" style={{ marginTop: '2%'}}>
                        <Button
                            onClick={() => {
                                (async () => {
                                    try {
                                        const token = await getAccessTokenSilently({
                                            audience: `${Constants.audience}`,
                                            scope: 'read:current_user',
                                        })
                                        submitNewPost({
                                            product_name: productValue,
                                            product_cost: productPrice,
                                            cost_unit: productUnit,
                                            description: productDesc,
                                            still_active: postingStillActive,
                                            still_available: postingStillAvailable,
                                            compost_heap: postingCompost,
                                            seller_sub: user.sub,
                                            seller_nickname: myPersonData.nickname,
                                            address_id: chosenAddressState.toString(),
                                        }, token);
                                    } catch (err) {
                                        console.log(err);
                                    }
                                })();
                                
                                CreateDelay();
                                setShowForm(showForm => !showForm);
                            }}
                        >Post!</Button>
                            <Button onClick={() => { setShowForm(showForm => !showForm);}} >Cancel</Button>
                        </ButtonGroup>
                        </Container>
                    </Paper>
                </React.Fragment>)
            );
    } else {
        newPostForm = (<React.Fragment />);
    }




    return (
        <>
            <Container className={classes.superContainer} style={{overflow:'auto'}}>
                {(myPersonData === undefined)
                    ? <h2> My Posts</h2> 
                    : <h2> {myPersonData.nickname}'s Posts </h2>
                }
                <Button variant="contained" onClick={showFormToggle} className={classes.myPostButtons}>
                    Create New Post
                </Button>
                    {newPostForm}
                <Button variant="contained" onClick={showCompostToggle} className={classes.myPostButtons}>
                    {(showCompost)
                        ? <>Hide My Composted Listings</>
                        : <>Show My Composted Listings</>
                    }
                </Button>
                <Grid>
                    {myCompostSection}
                </Grid>
                <Grid>
                    {mySolicits}
                </Grid>
            </Container>
       </>
    );
}

// submit new post helper function
function submitNewPost(newSolicitation: Solicitation, accessToken:string): void {
    createSolicitation(newSolicitation, accessToken).then((result: { status: number; }) => {
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