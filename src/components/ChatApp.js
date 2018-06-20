import React, { Component } from 'react';
import { Grid, Row, Col, Media, Alert } from 'react-bootstrap';

import logo from '../images/chat_logo.svg';
import '../css/chat.css';
import LoginForm from './LoginForm';
import Room from './Room';
import { newUserEvent, userLogoutEvent, sendMessageEvent, userLoggedIn, userLoggedOut, messageReceived } from '../client';

class ChatApp extends Component {
    constructor(props){
      super(props);

      this.state = {
        currentUser: null,
        alert: null,
        alertStyle: 'warning',
        history: [],
        connectedUsers: []
      }

      const currentUser = sessionStorage.getItem('currentUser')
      const history = JSON.parse(sessionStorage.getItem('history'))
      const connectedUsers = JSON.parse(sessionStorage.getItem('connectedUsers'))
      if(currentUser){
        this.state = { 
          ...this.state,
          currentUser 
        }
      }
      if(history){
        this.state = { 
          ...this.state,
          history 
        }
      }
      if(connectedUsers){
        this.state = { 
          ...this.state,
          connectedUsers 
        }
      }

      this.handleUserLogin = this.handleUserLogin.bind(this)
      this.handleUserLogout = this.handleUserLogout.bind(this)
      this.handleAlertDismiss = this.handleAlertDismiss.bind(this)

    }

    componentDidMount(){

      userLoggedIn((user, connectedUsers) =>{
        this.setState({
          connectedUsers: connectedUsers
        })
      })

      userLoggedOut((disconnectedUser, connectedUsers) =>{
        this.setState({
          connectedUsers: connectedUsers,
          alert: disconnectedUser + ' left the room.',
          alertStyle: 'info'
        })
        setTimeout(this.handleAlertDismiss, 5000)
      })

      messageReceived((history) => {
        this.setState({ history: history })
      })
    }

    handleUserLogin(user){
      //socket emit
      newUserEvent(user, function(res, history, connectedUsers){
        if(res){
            this.setState({ 
              currentUser: user, 
              alert: user + ' connected', 
              alertStyle: 'warning',
              history: history,
              connectedUsers: connectedUsers 
            });
            sessionStorage.setItem('currentUser', user)
            sessionStorage.setItem('history', JSON.stringify(history))
            sessionStorage.setItem('connectedUsers', JSON.stringify(connectedUsers))
        }else{
            this.setState({ alert: 'Username is taken', alertStyle: 'danger' });
        }
      }.bind(this))
      setTimeout(this.handleAlertDismiss, 10000)
    }

    handleUserLogout(e){
      e.preventDefault()
      //socket emit
      userLogoutEvent(this.state.currentUser, function(res, history, connectedUsers){
        if(res){
            this.setState(
              (prevState) => ({ 
                currentUser: null, 
                alert: 'Bye '+ prevState.currentUser + '! See you soon.', 
                alertStyle: 'warning',
                history: history,
                connectedUsers: connectedUsers 
            }))
            sessionStorage.removeItem('currentUser')
            sessionStorage.removeItem('history')
            sessionStorage.removeItem('connectedUsers')
        }else{
            this.setState({ alert: 'You cannot log out.', alertStyle: 'danger' });
        }
      }.bind(this))
      setTimeout(this.handleAlertDismiss, 10000)
    }

    handleNewMessage(message){
      //socket emit
      sendMessageEvent(message, this.state.currentUser, function(res, history, connectedUsers){
        if(res){
            this.setState({history: history, connectedUsers: connectedUsers})
        }
      }.bind(this))
    }

    handleAlertDismiss(){
      this.setState({ alert: null })
    }

    render() {
      const { 
        currentUser, 
        alert, 
        alertStyle,
        history,
        connectedUsers 
      } = this.state
      return (
        <Grid className="container">
          <Row className="header">
            <Col xs={8}>
              <Media>
                <Media.Left>
                  <img width={80} height={80} src={logo} alt="thumbnail" className="chat-logo"/>
                </Media.Left>
                <Media.Body>
                  <h1>Chat App</h1>
                </Media.Body>
              </Media>
            </Col>
            { currentUser && (
              <Col xs={4} className="text-right">
                <a className="logout" onClick={this.handleUserLogout}>Log out</a>
              </Col>
            )}
          </Row>
          { alert && (
            <Alert bsStyle={alertStyle} onDismiss={this.handleAlertDismiss}>
              {alert}
            </Alert>
          )}
          { !currentUser && (
            <Row className="loginWrapper">
              <LoginForm handleUserLogin={this.handleUserLogin.bind(this)}/>
            </Row>
          )}
          { currentUser && (
            <Row className="roomWrapper">
              <Room 
                currentUser={currentUser} 
                history={history} 
                connectedUsers={connectedUsers}
                handleNewMessage={this.handleNewMessage.bind(this)}
              />
            </Row>
          )}
        </Grid>
      );
    }
  }
  
  export default ChatApp;