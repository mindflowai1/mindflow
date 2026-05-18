import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import LandingPage from './LandingPage';
import ContactModal from './ContactModal';
import WhatsAppButton from './WhatsAppButton';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <LanguageProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="/" element={<LandingPage onOpenModal={openModal} />} />
                </Routes>
                <WhatsAppButton />
                <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
