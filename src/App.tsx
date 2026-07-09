import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingScreen from './screens/landing/landing.screen';
import IngestScreen from './screens/ingest/ingest.screen';
import IndexingScreen from './screens/indexing/indexing.screen';
import ChatScreen from './screens/chat/chat.screen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/ingest" element={<IngestScreen />} />
        <Route path="/indexing/:repositoryId" element={<IndexingScreen />} />
        <Route path="/chat/:repositoryId" element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
