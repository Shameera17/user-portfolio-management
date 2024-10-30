import React from 'react'

export default function Wrapper({children}: { children: React.ReactNode }) {
    return (
        <div className="space-y-6 border border-customGray rounded-lg p-4">
            {children}
        </div>
    )
}
