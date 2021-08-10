import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from './components/Details'
import RecipeCreate from './components/RecipeCreate';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/home/:id" component={Details}/>
        <Route path="/create" component={RecipeCreate}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
