import React from 'react';
import fakeRoster from './test/fakeRoster.json';
import { Header } from './layout';

const App = () => {

    return (
        <div>
            <Header namesake={fakeRoster.namesake}/>
            
            {/* <Footer /> */}
        </div>
    );
}

export default App;
