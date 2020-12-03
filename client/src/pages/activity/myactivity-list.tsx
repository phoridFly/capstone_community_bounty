import React, { useEffect, useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { BuyerView } from './buyer-component';
import { SellerView } from './seller-component';
import { SolicitsPlusTransactions } from '../../models';
import Constants from '../../auth/Constants';
import { fetchBuyerSPTransaction, fetchSellerSPTransaction} from '../../services'  // USE AFTER MODEL IS FIXED

import '../list.css';
import { Container } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxHeight: '90vh',
            overflowY: 'scroll',
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

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
        <Container
          role="tabpanel"
          hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            key={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography component={'span'}>{children}</Typography>
            </Box>
          )}
        </Container>
      );
}

function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export const  MyActivityAuth: React.FunctionComponent = () => {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const classes = useStyles();
    
    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
      };
 

    // fetch myBuyerSolicitsPlusTransactions
    const [buyerSPTs, getBuyerSPTs] = useState<SolicitsPlusTransactions[]>([])
    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently({
                    aueience: `${Constants.audience}`,
                    scope: 'read:current_user',
                })
                fetchBuyerSPTransaction(user.sub, token).then(response => {
                    getBuyerSPTs(response);
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }, [getAccessTokenSilently, user]);

    // fetch mySellerSolicitsPlusTransactions
    const [sellerSPTs, getSellerSPTs] = useState<SolicitsPlusTransactions[]>([])
    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently({
                    aueience: `${Constants.audience}`,
                    scope: 'read:current_user',
                })
                fetchSellerSPTransaction(user.sub, token).then(response => {
                    getSellerSPTs(response);
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }, [getAccessTokenSilently, user]);

    const currentBuyerSPTs = buyerSPTs.filter((mySPT: SolicitsPlusTransactions) => (mySPT.completed === false));
    const completedBuyerSPTs = buyerSPTs.filter((mySPT: SolicitsPlusTransactions) => (mySPT.completed === true));
    
    const currentSellerSPTs = sellerSPTs.filter((mySPT: SolicitsPlusTransactions) => (mySPT.completed === false));
    const completedSellerSPTs= sellerSPTs.filter((mySPT: SolicitsPlusTransactions) => (mySPT.completed === true));


    return (
       isAuthenticated ? (
            <>
                <Container className={classes.superContainer}>
                    
                    
                    <Container className={classes.root}>
                        <AppBar position="static">
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
                                <Tab label="Purchasing" {...a11yProps(0)} style={{textAlign:'center'}}/>
                                <Tab label="Selling" {...a11yProps(1)} style={{textAlign:'center'}}/>
                            </Tabs>
                        </AppBar>
                        <TabPanel value={tabValue} index={0} key={0}>
                            <BuyerView currentBuyerSPTs={currentBuyerSPTs} completedBuyerSPTs={completedBuyerSPTs} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1} key={1}>
                            <SellerView currentSellerSPTs={currentSellerSPTs} completedSellerSPTs={completedSellerSPTs} />
                        </TabPanel>
                    </Container>

                </Container>
               
            </>
        ) : (
            <div>
                <h2> Need to login</h2>
            </div>
            )   
        );
    };
export default MyActivityAuth;


export const MyActivityList: React.FunctionComponent = () => {

    return (
    
                <>
                   <MyActivityAuth/>
                </>
            
            
    );
}