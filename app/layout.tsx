import './globals.css';
import {PreferencesProvider} from './preferences';
export const metadata = { title: 'AgentParking — Read the sign. Know where you stand.', description: 'A clearer answer to UK parking signs.' };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="en-GB"><body><PreferencesProvider>{children}</PreferencesProvider></body></html> }
