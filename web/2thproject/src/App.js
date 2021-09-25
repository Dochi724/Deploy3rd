import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile'
import Ranking from './components/Ranking'
import Write from './components/Write'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from './components/Register';
const App = () => {
  return (
    
    <Router>
      <div>
        <Switch> 
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/write" component={Write} />
          <Route path="*">
            <h1>이상한 페이지</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;