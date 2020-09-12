import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { editNote, home, addNote, viewNote } from '../utils/routes';
import ProcessNote from '../containers/ProcessNote/ProcessNote';
import Home from '../containers/Home/Home';
import AppContext, { useAppContext } from './AppContext';
import Header from '../components/Header/Header';
import Note from '../containers/Note/Note';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function App() {
    const contextValue = useAppContext();
    return (
        <ErrorBoundary>
            <AppContext.Provider value={contextValue}>
                <Router>
                    <Header />
                    <Switch>
                        <Route path={home} exact component={Home} />
                        <Route exact path={viewNote} component={Note} />
                        <Route exact path={[editNote, addNote]} component={ProcessNote} />
                        <Route>No page found</Route>
                    </Switch>
                </Router>
            </AppContext.Provider>
        </ErrorBoundary>
    );
}

export default App;
