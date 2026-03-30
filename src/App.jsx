import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CVProvider } from './context/CVContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Landing from './pages/Landing';
import TemplateSelector from './pages/TemplateSelector';
import Editor from './pages/Editor';
import './index.css';

export default function App() {
    return (
        <ErrorBoundary>
            <CVProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/templates" element={<TemplateSelector />} />
                        <Route path="/editor" element={<Editor />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </CVProvider>
        </ErrorBoundary>
    );
}
