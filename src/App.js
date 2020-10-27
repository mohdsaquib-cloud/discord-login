import React, { Component } from 'react';
import './App.css';
import {Router} from 'react-router-dom'
import history from './history'
import axios from 'axios'
import Login from './components/Login';
class App extends Component{ 
  state={
    user:{}
  }  
  async componentDidMount() {
     const {data} = await axios.get('/user');
     console.log(data)
     this.setState({user:data})
  }
  hanldeLogout=()=>{
    this.setState({user:{}})
  }
  render(){
  return(
    <div>
      <Router history={history}>                                                   
        <Login user={this.state.user} hanldeLogout={this.hanldeLogout}/>
      </Router>        
      </div>
    )
  }
}
 
export default App;
