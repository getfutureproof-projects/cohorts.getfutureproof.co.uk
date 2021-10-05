import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import fakeRoster from './test/fakeRoster.json';
import * as Layout from './layout';
import * as Pages from './pages';
import { useCohort } from './contexts/cohort';

const App = () => {
    const { featured } = useCohort();

    return (
        <>
            <ToastContainer />
            <Layout.Header />

            <main>
            <Switch>
                <Route exact path="/">
                    <Pages.Landing />
                </Route>

                <Route exact path="/available">
                    <Pages.Available />
                </Route>

                <Route exact path="/:cohortName">
                    <Pages.Cohort />
                </Route>

                <Route>
                    <Pages.NotFound />
                </Route> 
            </Switch>
            </main>

            { featured && <Layout.Modal /> }
            <Layout.Contact />
            <Layout.Footer />
        </>
    );
}

export default App;
