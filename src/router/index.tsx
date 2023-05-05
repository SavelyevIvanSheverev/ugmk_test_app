import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import FactoryDetails from '../pages/FactoryDetails';
import Home from '../pages/Home';

const Routers = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path=":factoryId/:monthNumber" element={<FactoryDetails />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
