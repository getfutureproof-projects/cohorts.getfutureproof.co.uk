import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import fakeRoster from './test/fakeRoster.json';
import { Header, Footer, Contact } from './layout';

const App = () => {
    const [ cohort, setCohort ] = useState({ name: "Morris"})
    const [ roster, setRoster ] = useState(fakeRoster)

    return (
        <div>
            <Header roster={roster}/>

            <main>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>

                <Route path="/:cohort">
                    <Cohort />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
            </main>

            <Contact cohort={cohort} />
            <Footer />
        </div>
    );
}

export default App;
