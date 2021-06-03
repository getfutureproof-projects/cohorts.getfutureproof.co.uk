import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import fakeRoster from './test/fakeRoster.json';
import { Header, Footer, Contact } from './layout';
import { Landing } from './pages';

const App = () => {
    const [ cohort, setCohort ] = useState()
    const [ roster, setRoster ] = useState()

    return (
        <div>
            <Header roster={roster}/>

            <main>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>
{/* 
                <Route path="/:cohort">
                    <Cohort />
                </Route>

                <Route>
                    <NotFound />
                </Route> */}
            </Switch>
            </main>

            <Contact cohort={cohort} />
            <Footer />
        </div>
    );
}

export default App;
