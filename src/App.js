import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
            {/* <Section bgColor='purple'> */}
            <Layout.Header />
            {/* </Section> */}

            <main style={{paddingBottom: '15vh'}}>
                <Routes>
                    <Route exact path="/" element={<Pages.Landing />} />

                    <Route path="/available" element={<Pages.Available />}>
                        <Route path=":student" />
                    </Route>
                    <Route path="/:cohort" element={<Pages.Cohort />}>
                        <Route path=":student" />
                    </Route>
                    <Route element={<Pages.NotFound />} />
                </Routes>
            </main>

            {featured && <Layout.Modal />}
            {/* <Layout.Contact /> */}

            <Layout.Footer />
        </>
    );
}

export default App;
