import React from 'react';

function PublicationCard({ name, email, body}) {
    return (
        <div className="w-4/6 border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                    {/* Tag for Journal Type */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        JOURNAL OPEN ACCESS
                        </span>
                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        PDF
                        </span>
                    </div>

                    {/* Author Name */}
                    <h2 className="text-lg font-medium text-gray-900 mb-1 text-left">
                        {name}
                    </h2>

                    {/* Email */}
                    <p className="text-sm text-blue-600 hover:underline cursor-pointer mb-2 text-left">
                        {email}
                    </p>
                </div>

                {/* Metrics Section */}
                <div className="text-right">
                    <div className="text-sm text-gray-600">
                        <div className="mb-1">
                            <span className="font-semibold">0</span> Citations
                        </div>
                        <div>
                            <span className="font-semibold">0</span> Readers
                        </div>
                    </div>
                </div>
            </div>

            {/* Body Text */}
            <p className="text-sm text-gray-700 mb-4 text-justify">
                {body}
            </p>

            {/* Footer Actions */}
            <div className="flex gap-4 text-sm text-blue-600">
                <button className="hover:underline flex items-center gap-1">
                    <span>+ Adicionar a biblioteca</span>
                </button>
                <button className="hover:underline flex items-center gap-1">
                    <span>Download PDF</span>
                </button>
                <button className="hover:underline flex items-center gap-1">
                    <span>Relacionados</span>
                </button>
            </div>
        </div>
    );
}

export default PublicationCard;