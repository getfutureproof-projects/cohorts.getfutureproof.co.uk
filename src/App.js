import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as Layout from './layout';
import * as Pages from './pages';
import { useCohort } from './contexts/cohort';
import { colors } from '@getfutureproof/fpsb';

const App = () => {
    const { featured } = useCohort();

    return (
        <>
            <ToastContainer />
            <Layout.Header />

            <main style={{ backgroundColor: colors.violet, color: colors.purple }}>
            <Switch>
                <Route exact path="/">
                    <Pages.Landing />
                </Route>

                <Route path="/available/:student?">
                    <Pages.Available />
                </Route>

                <Route path="/:cohort/:student?">
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
