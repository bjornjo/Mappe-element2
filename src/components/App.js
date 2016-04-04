import React from 'react';
import AlbumList from './AlbumList.js'
import Login from './Login.js'
import Register from './Register.js'

export default class App extends React.Component {
//Bestemmer hvilken component som skal vises frem
//State / Redux!

    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
        this.handleClick = this.handleClick.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    handleClick(){
        this.setState({
            user: undefined,
            token: undefined
        })
    }

    login(username, password) {
        console.log('login called with', username, password);
        // send brukernavn og passord til serveren
        fetch('/login', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.text())
            .then(token => this.setState({token}))
            .catch(err => console.log('error: ' + err));
    }

    register(username, password) {
        // opprett en ny bruker
        // lagre token
        // skriv den nye brukeren til state

        const user = {
            username,
            password
        };

        this.setState({
            user
        })
    }

    render() {
        const {
            user
        } = this.state;

        if (!user) {
            // return default page + login/register form
            return <div className="container">
                <Login onLogin={this.login}/>
                <hr/>
                <Register onRegister=
                              {(username, password) => this.register(username, password)} />
                <hr/>
                <AlbumList albums={this.props.albums.slice(0,10)}/>
            </div>
        } else {
            // return data for logged in user
            return <div className="container">
                <p>Hello, {JSON.stringify(user)}!</p>
                <button className="btn btn-danger" onClick=
                    {this.handleClick}> Log out</button>
                <hr/>
                <AlbumList albums={this.props.albums} />
            </div>
        }
    }
}