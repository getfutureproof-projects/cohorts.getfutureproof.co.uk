import React from 'react';
import { Switch, Route } from 'react-router-dom';
import fakeRoster from './test/fakeRoster.json';
import { Header, Footer, Contact } from './layout';
import { Landing, Cohort, NotFound } from './pages';

const App = () => {
    return (
        <div>
            <Header />

            <main>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>

                <Route path="/:cohortName">
                    <Cohort />
                </Route>

                <Route>
                    <NotFound />
                </Route> 
            </Switch>
            </main>

            <Contact />
            <Footer />
        </div>
    );
}

export default App;
