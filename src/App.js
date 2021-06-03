import React from 'react';
import { Switch, Route } from 'react-router-dom';
import fakeRoster from './test/fakeRoster.json';
import * as Layout from './layout';
import * as Pages from './pages';

const App = () => {

    return (
        <>
            <Layout.Header />

            <main>
            <Switch>
                <Route exact path="/">
                    <Pages.Landing />
                </Route>

                <Route exact path="/:cohortName">
                    <Pages.Cohort />
                </Route>

                <Route>
                    <Pages.NotFound />
                </Route> 
            </Switch>
            </main>

            <Layout.Modal />
            <Layout.Contact />
            <Layout.Footer />
        </>
    );
}

export default App;
