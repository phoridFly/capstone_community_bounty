
import * as React from 'react';
import {hot} from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './header/header';
import { ContactUsPg, MyPostsList, ProfileList, HomePage, MyWatchlist, WelcomeBanner, MyActivityList } from './pages';
import './app.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from 'reactstrap';
import {  createPerson, createProfile, getProfile } from './services';
import { Person, Profile } from './models';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Constants from './auth/Constants';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#292f2d',
    },  
    secondary: {
      main: '#F7EEE9',
    },
  },
  typography: {
    fontFamily: [
      '"Merriweather"', 'serif',

    ].join(','),
  },
});



const App = () => {  
  const { user, isAuthenticated, getAccessTokenSilently, isLoading, error} = useAuth0();

  //check if person is in our database
  function checkPeep(): void {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: `${Constants.audience}`,
          scope: 'read:current_user',
        })
        checkProf(token);
      } catch (err) {
        console.log(err);
      }
    })();
    
  }          


function checkProf(token:string): void {
        getProfile(user.sub, token).then(function (result) {
          if (result.status === 200 ){
            //console.log(result);
          } else {
            //if they aren't create them
            const newPeep: Person = ({ person_sub: user.sub, nickname: user.nickname, name: user.name, picture : "defaultImage.jpg" });
            const newProf: Profile = ({ person_sub: user.sub });
            addPerson(newPeep, token);
            addProfile(newProf, token);
          }
        }).catch(function (e) {
          console.error(e);
        });       
  }
  
  //create new person
  function addPerson(newPeep: Person, token:string): void {
    createPerson(newPeep, token).then((result: { status: number; }) => {
        if (result.status === 200) {
          //console.log(result);       
      }
    });
  }

  //create new profile
  function addProfile(newProf: Profile, token:string): void {
    createProfile(newProf,token).then((result: { status: number; }) => {
        if (result.status === 200) {
          //console.log(result);       
        }
    });
  }


  // wait for user to be loaded, and location is known
  if (isLoading ) {
    return <div className="loader center">
      <i className="fas fa-recycle fa-spin" />
      </div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  
  // check if user is signed in
  if (isAuthenticated) {
     checkPeep();
  }
  
  if (!isAuthenticated) {
   
    return <WelcomeBanner />;

   }
 

  return (
    <ThemeProvider theme={theme}>
      
    <Router >
        
        <Header>
        <Container className="fullHeight">
            <Switch>
            <Route path='/login'>
                <WelcomeBanner />
                </Route>
              <Route path='/home'>
                <HomePage />
                </Route>
                <Route path='/watchlist'>
                  <MyWatchlist />
              </Route>
                <Route path='/activity'>
                  <MyActivityList />
                </Route><Route path='/posts'>
                  <MyPostsList />
                </Route><Route path='/profile'>
                  <ProfileList />
                </Route><Route path='/contactus'>
                  <ContactUsPg />
                </Route>
            </Switch>
          </Container>
        </Header>

      </Router>  
      </ThemeProvider>
  
  );
}

export default hot(App);