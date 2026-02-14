import React, { useState } from 'react';
import { Send, Play, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
// Removed local Toaster to prevent stacking context issues
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../context/ThemeContext';

import { containsProfanity } from '../../utils/badwords';

const ContactForm = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [lastResponse, setLastResponse] = useState(null);

    const validateForm = () => {
        const { name, email, subject, message } = formData;

        // 1. Required Fields
        if (!name.trim()) { toast.error("Name is required"); return false; }
        if (!email.trim()) { toast.error("Email is required"); return false; }
        if (!subject.trim()) { toast.error("Subject is required"); return false; }
        if (!message.trim()) { toast.error("Message is required"); return false; }

        // 2. Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        // 3. Profanity Check (English, Hindi, Marathi + Leet/Obfuscation)
        const combinedText = `${name} ${subject} ${message}`;

        if (containsProfanity(combinedText)) {
            toast.error("Message rejected: Abusive language detected.", { icon: '🚫' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus('sending');
        setLastResponse(null);
        const toastId = toast.loading('Establishing connection...');

        try {
            // Use Netlify Function endpoint
            const fetchResponse = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await fetchResponse.json();

            if (fetchResponse.ok) {
                setStatus('success');
                const successData = {
                    status: 200,
                    message: "Message dispatched successfully.",
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString()
                };
                setLastResponse(successData);
                toast.success('Message sent successfully!', { id: toastId });
                setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
            } else {
                setStatus('error');
                const errorData = {
                    status: fetchResponse.status || 500,
                    error: result.message || "Failed to send message.",
                    details: result.error,
                    timestamp: new Date().toISOString()
                };
                setLastResponse(errorData);
                toast.error(result.message || "Failed to send message.", { id: toastId });
            }
        } catch (networkError) {
            setStatus('error');
            const netErrorData = {
                status: 503,
                error: "Service Exception",
                message: "Server unreachable. Is the backend running?",

                timestamp: new Date().toISOString()
            };
            setLastResponse(netErrorData);
            toast.error("Server unreachable. Is the backend running?", { id: toastId });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-0 md:p-8 max-w-4xl mx-auto pb-32">
            {/* Top Bar (Browser/Postman Style) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-4 md:mb-6 px-2 md:px-0">
                <div className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded h-8 md:h-10 flex items-center px-3 md:px-4 font-mono text-[10px] md:text-sm text-[var(--text-secondary)] overflow-hidden">
                    <span className="text-[var(--success-color)] font-bold mr-2 md:mr-4 shrink-0">POST</span>
                    <span className="text-[var(--text-primary)] truncate">https://api.portfolio.com/v1/contact/send</span>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    className="bg-[var(--accent-color)] hover:bg-orange-600 text-white font-bold h-8 md:h-10 px-3 md:px-6 rounded flex items-center justify-center gap-2 font-mono transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 text-xs md:text-base"
                >
                    {status === 'sending' ? <Loader2 size={14} md:size={16} className="animate-spin" /> : <Send size={14} md:size={16} />}
                    <span className="md:inline">{status === 'sending' ? 'SENDING...' : 'SEND'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[450px]">
                {/* Request Editor (The Form) */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-xl flex flex-col mx-2 md:mx-0">
                    <div className="flex items-center border-b border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-1.5 md:px-4 md:py-2">
                        <span className="text-[var(--text-secondary)] text-[10px] md:text-xs font-mono">Body (application/json)</span>
                    </div>

                    <div className="flex-1 bg-[var(--bg-primary)] p-3 md:p-4 font-mono text-xs md:text-sm overflow-auto relative custom-scrollbar">
                        {/* Line Numbers */}
                        <div className="absolute left-0 top-3 md:top-4 bottom-0 w-6 md:w-8 text-right pr-1 md:pr-2 text-[var(--text-secondary)] opacity-30 select-none border-r border-[var(--border-color)] h-full text-[10px] md:text-xs">
                            1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10
                        </div>

                        <form className="pl-5 md:pl-6 space-y-0.5 md:space-y-1">
                            <div className="text-[var(--code-brace)]">{'{'}</div>

                            {/* Name Field */}
                            <div className="flex items-baseline group">
                                <span className="text-[var(--code-key)] ml-2 md:ml-4">"name":</span>
                                <span className="text-[var(--code-string)] ml-1 md:ml-2">"</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-transparent border-none outline-none text-[var(--code-string)] flex-1 focus:ring-0 p-0 placeholder-opacity-20 placeholder-[var(--code-string)] font-mono w-full"
                                    placeholder="Recruiter Name"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <span className="text-[var(--code-string)]">",</span>
                            </div>

                            {/* Email Field */}
                            <div className="flex items-baseline group">
                                <span className="text-[var(--code-key)] ml-2 md:ml-4">"email":</span>
                                <span className="text-[var(--code-string)] ml-1 md:ml-2">"</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-transparent border-none outline-none text-[var(--code-string)] flex-1 focus:ring-0 p-0 placeholder-opacity-20 placeholder-[var(--code-string)] font-mono w-full"
                                    placeholder="recruiter@company.com"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <span className="text-[var(--code-string)]">",</span>
                            </div>

                            {/* Subject Field */}
                            <div className="flex items-baseline group">
                                <span className="text-[var(--code-key)] ml-2 md:ml-4">"subject":</span>
                                <span className="text-[var(--code-string)] ml-1 md:ml-2">"</span>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="bg-transparent border-none outline-none text-[var(--code-string)] flex-1 focus:ring-0 p-0 placeholder-opacity-20 placeholder-[var(--code-string)] font-mono w-full"
                                    placeholder="Hiring Query"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <span className="text-[var(--code-string)]">",</span>
                            </div>

                            {/* Message Field */}
                            <div className="flex items-start group">
                                <span className="text-[var(--code-key)] ml-2 md:ml-4 whitespace-nowrap">"message":</span>
                                <span className="text-[var(--code-string)] ml-1 md:ml-2">"</span>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="bg-transparent border-none outline-none text-[var(--code-string)] flex-1 focus:ring-0 p-0 resize-none placeholder-opacity-20 placeholder-[var(--code-string)] block font-mono w-full"
                                    placeholder="Hi Sameer..."
                                    spellCheck="false"
                                />
                                <span className="text-[var(--code-string)] self-end">"</span>
                            </div>

                            <div className="text-[var(--code-brace)]">{'}'}</div>
                        </form>
                    </div>

                    {/* No Global Error Banner needed */}
                </div>

                {/* Response Viewer */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-xl flex flex-col h-full mx-2 md:mx-0">
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-1.5 md:px-4 md:py-2">
                        <span className="text-[var(--text-secondary)] text-[10px] md:text-xs font-mono">Response</span>
                        {status === 'success' && <span className="text-[var(--success-color)] text-[10px] md:text-xs font-mono flex items-center gap-1"><CheckCircle size={10} /> 200 OK</span>}
                        {status === 'error' && <span className="text-[var(--error-color)] text-[10px] md:text-xs font-mono">400 Bad Request</span>}
                    </div>

                    <div className="w-full h-full bg-[var(--bg-primary)] p-3 md:p-4 font-mono text-xs md:text-sm overflow-auto relative">
                        {status === 'idle' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-secondary)] opacity-50">
                                <Play size={24} md:size={32} className="mb-2" />
                                <p>Waiting for request...</p>
                            </div>
                        )}
                        {status === 'sending' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--accent-color)]">
                                <Loader2 size={24} md:size={32} className="animate-spin mb-2" />
                                <p>Processing payload...</p>
                            </div>
                        )}
                        {(status === 'success' || status === 'error') && lastResponse && (
                            <SyntaxHighlighter
                                language="json"
                                style={theme === 'dark' ? vscDarkPlus : vs}
                                customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.75rem' }}
                                wrapLongLines={true}
                            >
                                {JSON.stringify(lastResponse, null, 2)}
                            </SyntaxHighlighter>
                        )}
                    </div>
                </div>
            </div>

            <p className="mt-4 text-center text-[10px] md:text-xs text-[var(--text-secondary)] font-mono px-4">
                * Fields are validated before transmission. Abusive content will be rejected.
            </p>
        </div>
    );
};

export default ContactForm;
