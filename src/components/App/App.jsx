import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import RoundsView from '../RoundsView/RoundsView';
import HoleScoreView from '../HoleScoreView/HoleScoreView';
import ReviewRoundView from '../ReviewRound/ReviewRound';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <ProtectedRoute
            exact
            path="/rounds"
          >
            <RoundsView />
          </ProtectedRoute>

          <ProtectedRoute 
              exact path='/activeround/:course/:id/:round?/:holeScore?' 
              children={<HoleScoreView />} />
          
          <ProtectedRoute
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>     
            
          <ProtectedRoute exact path='/review/:round?/:course?' 
              children={<ReviewRoundView />} />

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/rounds" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>
                   
          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/rounds" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/rounds" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
