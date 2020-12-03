/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { SolicitsWithAddress, Transaction } from '../../models';
import '../list.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, CardImg, CardBody, CardSubtitle } from 'reactstrap';
import classnames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth0 } from '@auth0/auth0-react';
import Constants from '../../auth/Constants';
import { createTransaction } from '../../services';
import { Typography } from '@material-ui/core';

interface PropsInterface {
    posts: SolicitsWithAddress[];
  watch: SolicitsWithAddress[];
  activeTab: any;
  rad: any; 
  selected: any;
  popselect: any; 
}
  
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 'xl',
            display: 'block',
            backgroundColor: 'WhiteSmoke'
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
        color: 'WhiteSmoke'
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      }
     

    }),
);



const addDefaultSrc = (e : any) =>{
  e.target.src = '../logo192.png';
  e.alt='Default Image'
}


export const SolicitationList = (props: PropsInterface) => {
  const classes = useStyles();
  const { user, getAccessTokenSilently } = useAuth0();

  //dialogue box 
  const [dialogKey, setDialogKey] = React.useState('');
  const setNewDialogKey = (newKey: string) => {
    setDialogKey(newKey);
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (newDialogKey: string) => {
    setNewDialogKey(newDialogKey);
    setOpen(true);
  };
  const handleClose = () => {
    setMessage('');
    setOpen(false);
  };

  //message in form 
  const [userMessage, setMessage] = React.useState('');
  const handleMessage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMessage(event.target.value as string);
  }


  //active tab 
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab: React.SetStateAction<string>) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      props.activeTab(tab);
    }
  }
      
  //full list of items
  const items = props.posts.map((value) =>
    (<React.Fragment>
      <>
      {(props.popselect === value._id) ?
        (
        <>
        <Card body inverse style={{ backgroundColor: '#7A003C', borderColor: '#F7EEE9'}} key={value._id} >
          <CardTitle tag="h5">
            {value.product_name}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {value.seller_nickname}
          </CardSubtitle>
          <CardImg width="50%" src={`https://storage.googleapis.com/imagerybucket/${value.food_pic}`} onError={addDefaultSrc} />
          <CardBody>
            <CardText>
              Cost: {`$${value.product_cost}`} per {value.cost_unit}
              <br />
              Description: {value.description}
            </CardText>
          </CardBody>
          <Button variant="contained" disabled={value._id === "default"} color="secondary" onClick={() => {
                  props.selected('');
                //  setdefaultValue('');
          }}>
            Deselect
          </Button>
          <br/>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClickOpen(value._id + value._id)}>
            Contact Seller
          </Button>      
        </Card>
        </>
        ) : (
        <>
        <Card body inverse style={{ backgroundColor: '#9caca3', borderColor: '#F7EEE9' }} key={value._id} >
          <CardTitle tag="h5">
            {value.product_name}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {value.seller_nickname}
          </CardSubtitle>
          <CardImg width="50%" src={`https://storage.googleapis.com/imagerybucket/${value.food_pic}`} onError={addDefaultSrc} />
          <CardBody>
            <CardText>
              Cost: {`$${value.product_cost}`} per {value.cost_unit}
              <br/>
              Description: {value.description}
            </CardText>
          </CardBody>
          <Button variant="contained" disabled={value._id === "default"} color="secondary" onClick={() => {
            props.selected(value._id);
            //setdefaultValue(value._id);
           // console.log(value._id)
          }}>
            View On Map
          </Button>
          <br/>
          <Button variant="contained" color="secondary" onClick={() => handleClickOpen(value._id + value._id)}>
            Contact Seller
          </Button>
          </Card>
          </>
      )}
        <Dialog key={value._id + value._id} open={open && (activeTab === '1') && dialogKey === (value._id + value._id)} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            Contact {value.seller_nickname}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography gutterBottom align="center">
                  {value.product_name} | ${value.product_cost} per {value.cost_unit}   
                </Typography>
                <Typography gutterBottom>
                  Please enter a message to contact the seller:
                </Typography>
            </DialogContentText>
            <TextField
              id="outlined-full-width"
              label="Message"
              style={{ margin: 8 }}
              placeholder="I am interested in your listing"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={userMessage}
              onChange={handleMessage}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={() => {
              (async () => {
                try {
                  const token = await getAccessTokenSilently({
                    audience: `${Constants.audience}`,
                    scope: 'read:current_user',
                  });
                  submitForm({
                    solicitation_id: value._id,
                    buyer_sub: user.sub,
                    seller_sub: value.seller_sub!,
                    seller_nickname: value.seller_nickname!,
                    mess: userMessage
                  }, token);
                } catch (err) {
                  console.log(err);
                }
              })();
              handleClose();
              } }>
              Contact
            </Button>
          </DialogActions>
        </Dialog>    
        </>
  </React.Fragment>)
  );

  const watchers = props.watch.map((value) => 
    (<React.Fragment>
      <>
        {(props.popselect === value._id) ?
          (
            <Card body inverse style={{ backgroundColor: '#7A003C', borderColor: '#080c0d' }} key={value._id} >
              <CardTitle tag="h5">
                {value.product_name}
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {value.seller_nickname}
              </CardSubtitle>
              <CardImg width="50%" src={`https://storage.googleapis.com/imagerybucket/${value.food_pic}`} onError={addDefaultSrc} />
              <CardBody>
                <CardText>
                  Cost: {`$${value.product_cost}`} per {value.cost_unit}
                  <br />
              Description: {value.description}
                </CardText>
              </CardBody>
              <Button variant="contained" color="secondary" onClick={() => {
                  props.selected('');
                 // setdefaultValue('');
          }}>
            Deselect
          </Button>
              <br />
              <Button variant="contained" color="secondary" onClick={() => handleClickOpen(value._id + value._id)}>
                Contact Seller
          </Button>
            </Card>
          ) : (

              <Card body inverse style={{ backgroundColor: '#9caca3', borderColor: '#080c0d' }} key={value._id}>
                <CardTitle tag="h5">
                  {value.product_name}
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {value.seller_nickname}
                </CardSubtitle>
                <CardImg width="50%" src={`https://storage.googleapis.com/imagerybucket/${value.food_pic}`} onError={addDefaultSrc} />
                <CardBody>
                  <CardText>
                    Cost: {`$${value.product_cost}`} per {value.cost_unit}
                    <br />
              Description: {value.description}
                  </CardText>
                </CardBody>
                <Button variant="contained" color="secondary" onClick={() => {
                  props.selected(value._id);
                  //setdefaultValue(value._id);
                  //console.log(value._id);
                }}>
                  View On Map
          </Button>
                <br />
                <Button variant="contained" color="secondary" onClick={() => handleClickOpen(value._id + value._id)}>
                  Contact Seller
          </Button>
              </Card>

          )}
        </>
        <Dialog key={value._id + value._id} open={open && (activeTab === '2') && dialogKey === (value._id + value._id)} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            Contact {value.seller_nickname}
          </DialogTitle>
          <DialogContent>
              <DialogContentText>
                <Typography gutterBottom align="center">
                  {value.product_name} | ${value.product_cost} per {value.cost_unit}   
                </Typography>
                <Typography gutterBottom>
                  Please enter a message to contact the seller:
                </Typography>
            </DialogContentText>
            <TextField
              id="outlined-full-width"
              label="Message"
              style={{ margin: 8 }}
              placeholder="I am interested in your listing"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={userMessage}
              onChange={handleMessage}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={() => {
              (async () => {
                try {
                  const token = await getAccessTokenSilently({
                    audience: `${Constants.audience}`,
                    scope: 'read:current_user',
                  });
                  submitForm({
                    solicitation_id: value._id,
                    buyer_sub: user.sub,
                    seller_sub: value.seller_sub!,
                    seller_nickname: value.seller_nickname!,
                    mess: userMessage
                  }, token);
                } catch (err) {
                  console.log(err);
                }
              })();
              handleClose();
              } }>
              Contact
            </Button>
          </DialogActions>
        </Dialog>
    </React.Fragment>)   
);


 
//state handler radius 
  const [radius, setRadius] = React.useState(15);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRadius(event.target.value as number);
    props.rad(event.target.value);
  };

  //the form and lists 
    return (         
        
      <div style={{ height: "100%" }}>
        <div className="centerMe" style={{ backgroundColor: "#d1d1d1"}} >
      <FormControl  variant= "outlined" className={classes.formControl}>
        
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={radius}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
      
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>

        </Select>
        <FormHelperText>Pick a Search Radius</FormHelperText>
      </FormControl>
</div>
      <Nav tabs className="tabClass">
        <NavItem className = "tabItem">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Posts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Watchlist
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} style={{height:"100%"}}>
        <TabPane tabId="1" >
          <Row>
            <Col sm="12">
            <Container className= "ScrollStyle"style={{backgroundColor: "#d1d1d1", height: "75vh"}}>     
                    {items}
                    </Container> 
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
        <Row>
            <Col sm="12">   
            <Container className= "ScrollStyle" style={{backgroundColor: "#d1d1d1", height: "75vh"}}>      
                    {watchers}
                    </Container>                     
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}


//helper function for add
function submitForm(newAction: Transaction, token: string): void {
  createTransaction(newAction, token).then((result: { status: number; }) => {
      if (result.status === 200) {
          
      }
  });
}