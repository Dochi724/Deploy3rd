import './App.css';
import Home from './components/Home';
import Login from './components/Login';
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
          <Route path="*">
            <h1>이상한 페이지</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;