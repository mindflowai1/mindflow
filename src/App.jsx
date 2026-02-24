import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import LandingPage from './LandingPage';
import ServicesPage from './ServicesPage';
import ContactModal from './ContactModal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <LanguageProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="/" element={<LandingPage onOpenModal={() => setIsModalOpen(true)} />} />
                    <Route path="/services" element={<ServicesPage onOpenModal={() => setIsModalOpen(true)} />} />
                </Routes>
                <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
