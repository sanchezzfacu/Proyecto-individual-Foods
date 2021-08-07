import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
// import LandingPage from './components/LandingPage';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
