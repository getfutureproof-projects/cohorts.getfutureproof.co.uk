import React, { useState } from 'react';
import fakeRoster from './test/fakeRoster.json';
import { Header, Footer, Contact } from './layout';

const App = () => {
    const [ cohort, setCohort ] = useState({ name: "Morris"})
    const [ roster, setRoster ] = useState(fakeRoster)

    return (
        <div>
            <Header namesake={roster.namesake}/>
            <main>
                
            </main>
            <Contact cohort={cohort} />
            <Footer />
        </div>
    );
}

export default App;
