import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
                  Go Back Home
            </Link>
        </div>
    );
}