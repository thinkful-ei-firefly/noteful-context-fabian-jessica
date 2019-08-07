import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import './App.css';
import UserContext from '../UserContext';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        handleDeleteClick: this.handleDeleteClick
    };
    

    componentDidMount() {
        fetch('http://localhost:9090/folders')
            .then(res => res.json())
            .then(folders => this.setState({folders: folders}));
        fetch('http://localhost:9090/notes')
            .then(res => res.json())
            .then(notes => this.setState({notes: notes}));
    }

    handleDeleteClick = (id) => {
        fetch('http://localhost:9090/notes/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => res.ok ? this.setState({notes: this.state.notes.filter(note => note.id!== id)}) : Promise.reject("You got error"))
        .catch(error => console.log(error));

    }
    

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <UserContext.Provider value={this.state}>
                                <NoteListNav {...routeProps} />
                            </UserContext.Provider>                            
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        
                        return (
                            <UserContext.Provider value={this.state}>
                                <NotePageNav {...routeProps}  />
                            </UserContext.Provider>                        
                        );
                    }}
                />
                {/* <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} /> */}
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            return (
                                <UserContext.Provider value = {this.state} >
                                    <NoteListMain
                                        {...routeProps}
                                    />
                                </UserContext.Provider>
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        return (
                        <UserContext.Provider value = {this.state}>
                            <NotePageMain {...routeProps}/>
                        </UserContext.Provider>
                        );
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
    }
}

export default App;
