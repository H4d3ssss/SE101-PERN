import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-yellow-500 py-10 flex justify-between space-x-7">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between space-y-4 mx-20">
                    {/* Firm Name */}
                    <h2 className="text-2xl font-bold text-gray-800">F&M LAW FIRM</h2>

                    {/* Copyright and Design Credit */}
                    <p className="text-sm text-gray-600">
                        © Copyright 2025. Designed by R.Dev™
                    </p>

                    {/* Links */}
                    <div className="flex space-x-6">
                        <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Terms of Services
                        </a>
                        <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Privacy policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer