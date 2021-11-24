import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Ranking from './components/Ranking';
import Write from './components/Write';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from './components/Register';
import PublicRoute from './lib/PublicRoute';
import PrivateRoute from './lib/PrivageRoute';
import DetailPage from './components/DetailPage';
import Nav from './components/Nav';
import isLogin from './lib/isLogin';
const App = () => {
  return (
  // PublicRoute : 로그인되어있고 restricted가 true이면 접근 못함 ex)회원가입 페이지
  // PrivateRoute : 로그인 안했을때 접근 못함 ex)home
    <Router>
      <div>
        {isLogin() && <Nav />}
        <Switch> 
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute restricted path="/login" component={Login} />
          <PublicRoute restricted path="/register" component={Register} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/ranking" component={Ranking} />
          <PrivateRoute path="/write" component={Write} />
          <PrivateRoute path="/post/:id" component={DetailPage} />
          <PrivateRoute path="*">
            <h1>이상한 페이지</h1>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App;