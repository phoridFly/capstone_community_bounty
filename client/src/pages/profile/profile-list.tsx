import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { ProfileInfo } from './profile-component';
import { AddressInfo } from './address-component';

import '../list.css';
import { Container } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

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
            flexGrow: 1,
            maxWidth: 'xl',
            height: '100%'
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
            padding: "30px",

        },
        wrapperOne: {
            align: "justify",
            backgroundColor: '#9caca3',
            color: '#080c0d',
            padding: "30px"

        }

    }),
);


export const  ProfileAuth: React.FunctionComponent = () => {
    const { isAuthenticated } = useAuth0();
    const classes = useStyles();


    
    return (

        
       isAuthenticated ? (
            <>
                <Container className={classes.superContainer}>
                    <br></br>
                         <div className={classes.wrapperOne}>
                        <ProfileInfo />
                    </div> <br></br><div className={classes.wrapper}>
                        <AddressInfo />
                    </div>
            
                    </Container>
               
            </>
        ) : (
                <div>
                    <h2> Need to login</h2>
                </div>
          
            )
     
                
        );
    };
            
export default ProfileAuth;


export const ProfileList: React.FunctionComponent = () => {

    return (
    
                <><div>
                   <ProfileAuth/>
                </div>
                </>
            
            
    );
}