import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { SolicitsPlusTransactions, Transaction } from '../../models';
import {updateTransaction, updateTransactionMsg } from '../../services';

import '../list.css';
import { Container } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import TextField from '@material-ui/core/TextField';

import Constants from '../../auth/Constants';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

var dateFormat = require('dateformat');

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
      cardComplete: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '900px',
        display: 'flex',
        backgroundColor: 'grey',
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
        prodType: {
            padding: theme.spacing(1),
            display: 'inline-block',
            align: 'center',
        },
        expand: {
          marginLeft: "auto"
        },
        wrapper: {
            backgroundColor: '#9caca3',
            color: '#080c0d',
            padding: "30px"

        },
        wrapperOne: {
            align: "justify",
            backgroundColor: '#9caca3',
            color: '#080c0d',
            padding: "30px"

        }

    }),
);


interface propsInterface {
  currentSellerSPTs: SolicitsPlusTransactions[];
  completedSellerSPTs: SolicitsPlusTransactions[];
}

export const SellerView: React.FunctionComponent<propsInterface> = (props:propsInterface) => {
  const classes = useStyles();

  const { user, getAccessTokenSilently } = useAuth0();

  //create delay for post submission and reload 
  const CreateDelay=()=>{
    const timeout =  setTimeout(function(){
          refreshComponent();
    }, 500);
     return () => clearTimeout(timeout);
    }
    const refreshComponent = () => {
      window.location.reload();
  }


  const [messagesToShow, setMessagesToShow] = React.useState('');
  const updateMessagesToShow = (newMessagesString: string) => {
    setMessagesToShow(newMessagesString);
    if (newMessagesString === '' && showSendMessageVal !== '') {
      setShowSendMessageVal(newMessagesString);
    }
  };

  const [showSendMessageVal, setShowSendMessageVal] = React.useState('');
  const updateShowSendMessageVal = (newShowSendMessageVal: string) => {
    updateMessagesToShow(newShowSendMessageVal);
    setShowSendMessageVal(newShowSendMessageVal);
  }

  //message in form 
  const [userMessage, setMessage] = React.useState('');
  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }


  const currentTransacs = props.currentSellerSPTs.map((value:SolicitsPlusTransactions) =>
  (<React.Fragment>
      <Paper key={value._id} className={classes.card} variant="outlined">
        <Grid item>
          <Typography className={classes.buyer_nickname}>
            Buyer: {value.buyer_nickname}
          </Typography>
          <Typography className={classes.product_name}>
            Product: {value.product_name}
          </Typography>
          <Typography className={classes.product_cost}>
            Cost: {value.product_cost} Per {value.cost_unit}
          </Typography>
          <Typography className={classes.description}>
            Description: {value.description}
          </Typography>
          <Typography>
            {(value.message_log === undefined || value.message_log === null || messagesToShow !== value._id)
              ?
              <Button variant="contained" color="secondary" onClick={()=>updateMessagesToShow(value._id!)}>Show Message Log</Button>
              :
              <Typography>
                <Button variant="contained" color="secondary" onClick={()=>updateMessagesToShow('')}>Hide Messages</Button>
                {
                  Object.values(value.message_log).map((msgVal:any) => {
                    return (
                      <Container>
                        <Typography>
                          {(msgVal.person_sub === user.sub) ? "You " : "Buyer "}
                          at {dateFormat((msgVal.time_stamp as Date), "shortDate")} {dateFormat((msgVal.time_stamp as Date), "shortTime")}
                        </Typography>
                        <Typography>
                          "{msgVal.message}"
                        </Typography>
                      </Container>
                    )
                  })
                }
                {(showSendMessageVal === value._id)
                  ? (
                    <>
                    <TextField variant="outlined"
                    placeholder="Enter message here:"
                    value={userMessage}
                    onChange={handleMessage}
                    /><Button color="secondary" variant="contained" onClick={() => {
                      (async () => {
                        try {
                          const token = await getAccessTokenSilently({
                            audience: `${Constants.audience}`,
                            scope: 'read:current_user',
                          });
                          submitMsg({
                            _id: value._id!,
                            solicitation_id: value.solicitation_id,
                            buyer_sub: value.buyer_sub!,
                            seller_sub: value.seller_sub!,
                            seller_nickname: value.seller_nickname!,
                            person_sub: user.sub!,
                            mess: userMessage,
                          }, token);
                        } catch (err) {
                          console.log(err);
                        }
                      })();
                        updateShowSendMessageVal('');
                        CreateDelay();
                      } }>
                      Send
                    </Button>
                  </>
                  ): (
                      <></>
                  )}
              </Typography>
            }
          </Typography>
        </Grid>
        <ButtonGroup orientation="vertical" style={{float:'right', marginLeft:'auto'}}>
          <Button variant="contained" color="primary" onClick={() => {
            if (window.confirm('Are you sure?\nCompleted transactions do not allow for more messages.\nCompletion is irreversible.'))
              (async () => {
              try {
                const token = await getAccessTokenSilently({
                  audience: `${Constants.audience}`,
                  scope: 'read:current_user',
                });
                updateTransactionStatus({
                  _id: value._id!,
                  solicitation_id: value.solicitation_id,
                  completed: true,
                },
                  token,
                  user.sub,
                  ("[Seller marked transaction as complete]")
                );
              } catch (err) {
                console.log(err);
                }
                CreateDelay();
            })();
          }}>
            Mark as<br/>Complete
          </Button>
          {(showSendMessageVal === value._id)
            ? (
              <Button variant="contained" color="secondary" onClick={() => updateShowSendMessageVal('')}>
              Cancel <br/> Message
              </Button>
            ) : (
            <Button variant="contained" color="secondary" onClick={() => updateShowSendMessageVal(value._id!)}>
              Send Message<br/>To Buyer
            </Button>
          )}
          
        </ButtonGroup>
      </Paper>
    </React.Fragment>)
  );

  const completedTransacs = props.completedSellerSPTs.map((value:SolicitsPlusTransactions) =>
  (<React.Fragment>
      <Paper key={value._id} className={classes.cardComplete} variant="outlined">
        <Grid item>
        <Typography className={classes.buyer_nickname}>
            Buyer: {value.buyer_nickname} | COMPLETED
          </Typography>
          <Typography className={classes.product_name}>
            Product: {value.product_name}
          </Typography>
          <Typography className={classes.product_cost}>
            Cost: {value.product_cost} per {value.cost_unit}
          </Typography>
          <Typography className={classes.description}>
            Description: {value.description}
          </Typography>
          {(value.message_log === undefined || value.message_log === null || messagesToShow !== value._id) ?
            <Button onClick={()=>updateMessagesToShow(value._id!)}>Show Message Log</Button>
            :
            <Typography>
              <Button variant="contained" color="secondary" onClick={()=>updateMessagesToShow('')}>Hide Messages</Button>
              {
                Object.values(value.message_log).map((msgVal:any) => {
                  return (
                    <Container>
                      <Typography>
                        {(msgVal.person_sub === user.sub) ? "You " : "Buyer "}
                        at {dateFormat((msgVal.time_stamp as Date), "shortDate")} {dateFormat((msgVal.time_stamp as Date), "shortTime")}
                      </Typography>
                      <Typography>
                        "{msgVal.message}"
                      </Typography>
                    </Container>
                  )
                })
              }
            </Typography>
          }
          <Typography className={classes.error}>
            {value.error}            
          </Typography>
        </Grid>
      </Paper>
    </React.Fragment>)
  );

  return (
    <Container>
      <Container>
        {currentTransacs}
      </Container>
      <Container>
        {completedTransacs}
      </Container>
    </Container>
    
  )


}


//helper function for add message
function submitMsg(updatedAction: Transaction, token: string): void {
  updateTransactionMsg(updatedAction, token).then((result: { status: number; }) => {
      if (result.status === 200) {
        console.log(updatedAction);
      }
  });
}

// Helper function for marking transaction complete
function updateTransactionStatus(updatedAction: Transaction, token: string, personSub:string, completeMsg:string): void{
  updateTransaction(updatedAction, token).then((result: { status: number; }) => {
    if (result.status === 200) {
      console.log(updatedAction);
    }
  });
  var updatedActionPlusMessage: Transaction = updatedAction;
  updatedActionPlusMessage.person_sub = personSub;
  updatedActionPlusMessage.mess = completeMsg;
  updateTransactionMsg(updatedAction, token).then((result: { status: number; }) => {
    if (result.status === 200) {
      console.log(updatedAction);
    }
});
}