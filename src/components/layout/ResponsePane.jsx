import React from 'react';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const StatusCode = ({ status }) => {
    let color = 'text-green-400';
    let text = '200 OK';

    if (status >= 400 && status < 500) {
        color = 'text-red-400';
        text = `${status} Not Found`;
    } else if (status >= 500) {
        color = 'text-orange-400';
        text = `${status} Server Error`;
    }

    return (
        <span className={`font-mono text-xs font-bold ${color}`}>
            {text}
        </span>
    );
};

const ResponsePane = ({ data, status = 200, time = '120ms', size = '1.2KB', isLoading, visualComponent, isVisualMode }) => {
    return (
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-h-0 relative">
            {/* Visual Mode (Default) */}
            {isVisualMode && !isLoading ? (
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar bg-[#161616]">
                    {visualComponent || (
                        <div className="flex items-center justify-center h-full text-gray-500 font-mono">
                            Select an endpoint to view details
                        </div>
                    )}
                </div>
            ) : (
                /* JSON Mode (Classic API Console) */
                <>
                    {/* Response Meta Bar */}
                    <div className="h-10 border-b border-[#333] flex items-center justify-between px-4 bg-[#212121]">
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                            <button className="text-orange-500 border-b-2 border-orange-500 pb-2.5 mt-2.5">Body</button>
                            <button className="hover:text-gray-200 pb-2.5 mt-2.5">Headers</button>
                        </div>

                        {!isLoading && (
                            <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                                <span>Status: <StatusCode status={status} /></span>
                                <span>Time: <span className="text-green-400">{time}</span></span>
                                <span>Size: <span className="text-green-400">{size}</span></span>
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto relative custom-scrollbar flex flex-col">
                        {isLoading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4 bg-[#1e1e1e]">
                                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="font-mono text-xs animate-pulse">Sending request...</p>
                            </div>
                        ) : (
                            <SyntaxHighlighter
                                language="json"
                                style={atomOneDark}
                                customStyle={{
                                    background: 'transparent',
                                    padding: '1.5rem',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.5',
                                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                }}
                                showLineNumbers={true}
                                lineNumberStyle={{ minWidth: '2em', paddingRight: '1em', color: '#4b5563', textAlign: 'right' }}
                            >
                                {JSON.stringify(data, null, 2)}
                            </SyntaxHighlighter>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ResponsePane;
