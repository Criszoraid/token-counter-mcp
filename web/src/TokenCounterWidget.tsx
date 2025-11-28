/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";

declare global {
    interface Window {
        openai: any;
    }
}

type CostsByModel = Record<
    string,
    {
        prompt_tokens: number;
        response_tokens: number;
        total_tokens: number;
        estimated_cost_usd: number;
    }
>;

interface ToolOutput {
    prompt_tokens: number;
    response_tokens: number;
    total_tokens: number;
    default_model: string;
    costs: CostsByModel;
}

export const TokenCounterWidget: React.FC = () => {
    const toolOutput: ToolOutput | null = window.openai?.toolOutput ?? null;
    const toolInput = window.openai?.toolInput ?? null;

    const [prompt, setPrompt] = useState<string>(
        toolInput?.prompt_text ?? ""
    );
    const [response, setResponse] = useState<string>(
        toolInput?.response_text ?? ""
    );
    const [model, setModel] = useState<string>(
        toolInput?.model ?? toolOutput?.default_model ?? "gpt-4o-mini"
    );

    const [data, setData] = useState<ToolOutput | null>(toolOutput);

    // Mantener estado entre renders
    useEffect(() => {
        const state = window.openai?.widgetState as any;
        if (state?.prompt !== undefined) setPrompt(state.prompt);
        if (state?.response !== undefined) setResponse(state.response);
        if (state?.model !== undefined) setModel(state.model);
    }, []);

    useEffect(() => {
        window.openai?.setWidgetState?.({ prompt, response, model });
        window.openai?.notifyIntrinsicHeight?.();
    }, [prompt, response, model]);

    const handleRecalculate = async () => {
        if (!window.openai?.callTool) return;

        const result = await window.openai.callTool("token_counter", {
            prompt_text: prompt,
            response_text: response,
            model,
        });

        if (result?.toolOutput) {
            setData(result.toolOutput);
        }
    };

    const current = data ?? toolOutput;

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <header className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Token Counter</h1>
                            <p className="text-sm text-gray-500 mt-1">Cuenta tokens y estima su coste</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <label className="text-xs font-medium text-gray-600">Model</label>
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="gpt-4o-mini">GPT-4o Mini</option>
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
                        </select>
                    </div>
                </header>

                {/* Prompt Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-base font-semibold text-gray-900">Prompt</h2>
                    </div>
                    <div className="p-6">
                        <textarea
                            className="w-full min-h-[200px] text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Pega tu prompt aquí..."
                        />
                    </div>
                </div>

                {/* Response Area (Optional) */}
                <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 list-none flex items-center gap-2">
                        <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Añadir respuesta (opcional)
                    </summary>
                    <div className="mt-3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-base font-semibold text-gray-900">Respuesta</h2>
                        </div>
                        <div className="p-6">
                            <textarea
                                className="w-full min-h-[150px] text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Pega la respuesta del modelo aquí..."
                            />
                        </div>
                    </div>
                </details>

                {/* Calculate Button */}
                <button
                    onClick={handleRecalculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm"
                >
                    Calcular tokens
                </button>

                {/* Total Summary */}
                {current && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Total:</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            {current.total_tokens.toLocaleString()} tokens
                        </span>
                    </div>
                )}

                {/* Model Comparison Table */}
                {current && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Modelo
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tokens
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Coste Estimado (€)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {Object.entries(current.costs).map(([modelName, info]) => (
                                    <tr key={modelName} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {modelName === "gpt-4o-mini" && "GPT-4o Mini"}
                                                {modelName === "gpt-4o" && "GPT-4o"}
                                                {modelName === "gpt-4.1-mini" && "GPT-4.1 Mini"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">
                                                {info.total_tokens.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {(info.estimated_cost_usd * 0.92).toFixed(5)} €
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
