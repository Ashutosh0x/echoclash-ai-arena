import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Mistral Dashboard',
  description: 'Dark dashboard theme — vals.ai inspired',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
