import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ScreenResolution from './pages/tools/ScreenResolution';
import IpAddress from './pages/tools/IpAddress';
import UserAgent from './pages/tools/UserAgent';
import ColorTools from './pages/tools/ColorTools';
import JsonFormatter from './pages/tools/JsonFormatter';
import JwtDecoder from './pages/tools/JwtDecoder';
import UrlEncoder from './pages/tools/UrlEncoder';
import TextCase from './pages/tools/TextCase';
import UuidGenerator from './pages/tools/UuidGenerator';
import HashGenerator from './pages/tools/HashGenerator';
import Base64Tools from './pages/tools/Base64Tools';
import RegexTester from './pages/tools/RegexTester';
import QrGenerator from './pages/tools/QrGenerator';
import TimeTools from './pages/tools/TimeTools';
import PasswordGenerator from './pages/tools/PasswordGenerator';
import LoremGenerator from './pages/tools/LoremGenerator';
import CssGenerator from './pages/tools/CssGenerator';
import ImageOptimizer from './pages/tools/ImageOptimizer';
import MarkdownPreview from './pages/tools/MarkdownPreview';
import DiffChecker from './pages/tools/DiffChecker';
import CodeBeautifier from './pages/tools/CodeBeautifier';
import UnitConverter from './pages/tools/UnitConverter';
import Games from './pages/Games';
import SnakeGame from './pages/games/SnakeGame';
import TetrisGame from './pages/games/TetrisGame';
import MemoryGame from './pages/games/MemoryGame';
import TypingTest from './pages/games/TypingTest';
import ReactionTime from './pages/games/ReactionTime';
import ColorGuess from './pages/games/ColorGuess';
import Game2048 from './pages/games/Game2048';
import TicTacToe from './pages/games/TicTacToe';
import BasicCalculator from './pages/calculators/BasicCalculator';
import ScientificCalculator from './pages/calculators/ScientificCalculator';
import LoanCalculator from './pages/calculators/LoanCalculator';
import SipCalculator from './pages/calculators/SipCalculator';
import MutualFundCalculator from './pages/calculators/MutualFundCalculator';
import CssToTailwind from './pages/tools/CssToTailwind';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/screen-resolution" element={<ScreenResolution />} />
              <Route path="/ip-address" element={<IpAddress />} />
              <Route path="/user-agent" element={<UserAgent />} />
              <Route path="/color-tools" element={<ColorTools />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/jwt-decoder" element={<JwtDecoder />} />
              <Route path="/url-encoder" element={<UrlEncoder />} />
              <Route path="/text-case" element={<TextCase />} />
              <Route path="/uuid-generator" element={<UuidGenerator />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/base64-tools" element={<Base64Tools />} />
              <Route path="/regex-tester" element={<RegexTester />} />
              <Route path="/qr-generator" element={<QrGenerator />} />
              <Route path="/time-tools" element={<TimeTools />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/lorem-generator" element={<LoremGenerator />} />
              <Route path="/css-generator" element={<CssGenerator />} />
              <Route path="/image-optimizer" element={<ImageOptimizer />} />
              <Route path="/markdown-preview" element={<MarkdownPreview />} />
              <Route path="/diff-checker" element={<DiffChecker />} />
              <Route path="/code-beautifier" element={<CodeBeautifier />} />
              <Route path="/unit-converter" element={<UnitConverter />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/snake" element={<SnakeGame />} />
              <Route path="/games/tetris" element={<TetrisGame />} />
              <Route path="/games/memory" element={<MemoryGame />} />
              <Route path="/games/typing-test" element={<TypingTest />} />
              <Route path="/games/reaction-time" element={<ReactionTime />} />
              <Route path="/games/color-guess" element={<ColorGuess />} />
              <Route path="/games/2048" element={<Game2048 />} />
              <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
              <Route path="/calculator/basic" element={<BasicCalculator />} />
              <Route path="/calculator/scientific" element={<ScientificCalculator />} />
              <Route path="/calculator/loan" element={<LoanCalculator />} />
              <Route path="/calculator/sip" element={<SipCalculator />} />
              <Route path="/calculator/mutual-fund" element={<MutualFundCalculator />} />
              <Route path="/css-to-tailwind" element={<CssToTailwind />} />
            </Routes>
          </Layout>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;