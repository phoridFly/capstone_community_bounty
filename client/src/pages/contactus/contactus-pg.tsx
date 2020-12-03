import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from "@auth0/auth0-react";
import Constants from '../../auth/Constants';
import { Person } from '../../models';
import { getSinglePerson } from '../../services';





/*
const ContactUsSelect = styled(Select)({
    backgroundColor: 'DarkSeaGreen',
    height: 48,
});
*/

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    superContainer: {
        backgroundColor: '#333d39',
        color: '#f7eee9',
        height: '100vh',
        maxWidth: 'xl',
        },
    mainContainer: {
        backgroundColor: '#9caca3',
        color: '#080c0d',
        textAlign: 'center',
        
    },
    childContainer: {
        backgroundColor: '1b2423',
        maxWidth: 'lg',
        border: '2px',
        display: 'inline-block',
        margin: 'auto',
        padding: '10px',
        },
    selectionContainer: {
        display: 'flex',
        overflow: 'hidden',
        marginTop: '1%',
        paddingTop: '1%',
    },
    dropdown: {
        backgroundColor: '#f7eee9',
        margin: theme.spacing(1),
        minWidth: 200,
        color: '#333d39',
        height: 48,
        width: '25ch',
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: 'F8F8F8',
        height: 120,
        width: '50ch',
    },
    contactButtons: {
        align: 'right',
        paddingBottom: '1%',
    },
    buttonSubmit: {
        backgroundColor: '#f7eee9',
        color: '#333d39',
        fontWeight: 'bold'
    },
    buttonClear: {
        backgroundColor: '#333d39',
        color: '#f7eee9',
        fontWeight: 'bold'
    },
    toastCont: {
        width: '80%',
    }

    }),
);



export const ContactUsPg: React.FunctionComponent = () => {
    // Styling
    const localClasses = useStyles();
    const { user, getAccessTokenSilently } = useAuth0();

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


    // Declarations of Input States
    const [categoryState, setCategoryState] = React.useState('NUL');
    const [severityState, setSeverityState] = React.useState('-1');
    const [commentBox, setCommentBox] = React.useState("");

    // Input State Handlers
    const setCatStateHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategoryState(event.target.value as string);
    }
    const setSevStateHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSeverityState(event.target.value as string);
    }
    const setComBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentBox( event.target.value );
    }

    // Category Options
    const categories = [
        {
            value: 'NUL',
            label: 'Categories',
        },
        {
            value: 'GEN',
            label: 'General',
        },
        {
            value: 'QUE',
            label: 'Question',
        },
        {
            value: 'COM',
            label: 'Comment',
        },
        {
            value: 'CON',
            label: 'Concern',
        }
    ];

    // Severity Options
    const severities = [
        {
            value: '-1',
            label: 'Pick one',
        },
        {
            value: '0',
            label: 'Not a Big Dill',
        },
        {
            value: '1',
            label: 'Somewhat Melon-choly',
        },
        {
            value: '2',
            label: 'Really Shucks',
        },
        {
            value: '3',
            label: 'Criti-kale to fix',
        }
    ];

    // Clear Form Handling
    const [confirmClear, setConfirmClear] = useState(false);

    const clearFormCheck = () => {
        //console.log(confirmClear);
        if (confirmClear) {
            clearFormConfirmed();
        }
        if (!confirmClear) {
            setConfirmClear(true);
        }
    }

    const clearFormConfirmed = () => {
        setCategoryState('NUL');
        setSeverityState('-1');
        setCommentBox("");
        setConfirmClear(false);
    }

    

    // Submit Form Handling
    const submitContactUs = () => {
        
        if ((categoryState !== 'NUL') && (severityState !== '-1') && (commentBox !== '')) {
        
            
            toast.success(<div>Thank you for your feedback, {myPersonData.nickname}!</div>);
            clearFormConfirmed();
        } else {
            toast.error("Please fill out the form completely.");
        }
    };        
    
    // Page Sections to Render
    var headerSection = (
        <React.Fragment>
            <Typography variant="h4"> 
                Contact Us
            </Typography>
            <Typography variant="h6" gutterBottom> 
                Please share with us your comments or concerns!
            </Typography>
        </React.Fragment>
    );

    var categorySelectSection = (
        <React.Fragment>
            <Container className={localClasses.childContainer}>
                <Typography>
                    Please select a category:                     
                </Typography>
                <Select className={localClasses.dropdown}
                    id="cat-dropdown"
                    value={categoryState}
                    onChange={setCatStateHandler}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Container>
        </React.Fragment>
    );

    var severitySelectSection = (
        <React.Fragment>
            <Container className={localClasses.childContainer}>
                <Typography>
                        Please select a severity:
                    </Typography>
                <Select className={localClasses.dropdown}
                    id="sev-dropdown"
                    value={severityState}
                    onChange={setSevStateHandler}
                >
                    {severities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Container>
        </React.Fragment>
    );

    var contactButtonsSection = (
        <React.Fragment>
            <Container className={localClasses.childContainer}>
                <ButtonGroup className={localClasses.contactButtons}>
                    <Button className={localClasses.buttonSubmit} color="primary"
                        onClick={() => submitContactUs()} >
                        Submit
                    </Button>
                    <Button className={localClasses.buttonClear}
                        onClick={clearFormCheck}
                        color="secondary">
                        {!confirmClear ? "Clear" : "Clear Form?"}
                    </Button>
                </ButtonGroup>
                <Typography gutterBottom> </Typography>
            </Container>
        </React.Fragment>
    );
    
    var messageInputSection = (
        <React.Fragment>
            <Container className={localClasses.childContainer}>
                <TextField className={localClasses.textInput}
                    multiline
                    rows={4}
                    variant="filled"
                    label="Enter your mesage to us:"
                    value={commentBox}
                    onChange={setComBoxHandler}
                />
            </Container>
        </React.Fragment>
    );

    var selectionSection = (
        <React.Fragment>
            <Container className={localClasses.selectionContainer}>
                {categorySelectSection}
                {severitySelectSection}
            </Container>
        </React.Fragment>
    );

    



    // Return Page Sections to Render
    return (
        <>
            <Container className={localClasses.superContainer}>
                {headerSection}
                <Container className={localClasses.mainContainer}>
                    {selectionSection}
                    {messageInputSection}                
                    {contactButtonsSection}
                </Container>
                <ToastContainer className={localClasses.toastCont}/>
            </Container>
       </>
    );
}