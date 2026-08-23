import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Laguna Plaza Hotel & Restaurante Mandi - Cardápio',
  description: 'Cardápio digital completo de refeições, pratos executivos e bebidas do Laguna Plaza Hotel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
