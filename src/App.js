import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, Footer, Card, Section } from '@getfutureproof/fpsb';
import * as Layout from './layout';
import * as Pages from './pages';
import { useCohort } from './contexts/cohort';
import { colors } from '@getfutureproof/fpsb';

const App = () => {
    const { featured } = useCohort();

    return (
        <>
            <ToastContainer />
            <Header />

            {/* <main style={{ backgroundColor: colors.violet, color: colors.purple }}> */}
            <main>
            {/* <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="teams" element={<Teams />}>
                    <Route path=":teamId" element={<Team />} />
                    <Route path="new" element={<NewTeamForm />} />
                    <Route index element={<LeagueStandings />} />
                    </Route>
                </Route>
            </Routes> */}

            <Routes>
                <Route exact path="/" element={<Pages.Landing />} />

                <Route path="/available/:student?" element={<Pages.Available />} />

                <Route path="/:cohort/:student?" element={<Pages.Cohort />} />

                <Route element={<Pages.NotFound />} />
            </Routes>

            </main>

            { featured && <Layout.Modal /> }
            <Layout.Contact />
            <Footer />
        </>
    );
}

export default App;
