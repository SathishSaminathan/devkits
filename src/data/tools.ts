import { 
  Monitor, 
  Globe, 
  Smartphone, 
  Palette, 
  Code, 
  Key, 
  Link, 
  Type,
  Hash,
  FileImage,
  Search,
  Zap,
  QrCode,
  Clock,
  Calculator,
  Shield,
  FileText,
  Paintbrush,
  Image,
  Eye,
  GitCompare,
  Wand2,
  Ruler,
  DollarSign,
  TrendingUp,
  PiggyBank
} from 'lucide-react';

export const toolCategories = [
  {
    name: 'Core Utilities',
    description: 'Essential system and device information tools',
    icon: Monitor,
    tools: [
      {
        name: 'Screen Resolution',
        description: 'Display your screen width, height, and pixel density information',
        icon: Monitor,
        path: '/screen-resolution',
        color: 'bg-blue-600'
      },
      {
        name: 'IP Address Info',
        description: 'Show your public IP address, location, and ISP details',
        icon: Globe,
        path: '/ip-address',
        color: 'bg-green-600'
      },
      {
        name: 'User Agent Info',
        description: 'Analyze browser, OS, and device information',
        icon: Smartphone,
        path: '/user-agent',
        color: 'bg-purple-600'
      }
    ]
  },
  {
    name: 'Design Tools',
    description: 'Color utilities and visual design helpers',
    icon: Palette,
    tools: [
      {
        name: 'Color Tools',
        description: 'Color picker, converter (HEX/RGB/HSL), and contrast checker',
        icon: Palette,
        path: '/color-tools',
        color: 'bg-pink-600'
      }
    ]
  },
  {
    name: 'Text & Data',
    description: 'Text processing and data transformation utilities',
    icon: Type,
    tools: [
      {
        name: 'JSON Formatter',
        description: 'Format, validate, and beautify JSON data',
        icon: Code,
        path: '/json-formatter',
        color: 'bg-yellow-600'
      },
      {
        name: 'JWT Decoder',
        description: 'Decode and analyze JWT tokens safely',
        icon: Key,
        path: '/jwt-decoder',
        color: 'bg-red-600'
      },
      {
        name: 'URL Encoder',
        description: 'Encode and decode URLs and query parameters',
        icon: Link,
        path: '/url-encoder',
        color: 'bg-indigo-600'
      },
      {
        name: 'Text Case Converter',
        description: 'Convert text between different cases (UPPER, lower, Title)',
        icon: Type,
        path: '/text-case',
        color: 'bg-teal-600'
      },
      {
        name: 'Hash Generator',
        description: 'Generate MD5, SHA1, SHA256 hashes from text',
        icon: Hash,
        path: '/hash-generator',
        color: 'bg-orange-600'
      },
      {
        name: 'Base64 Tools',
        description: 'Encode and decode Base64 text and images',
        icon: FileImage,
        path: '/base64-tools',
        color: 'bg-cyan-600'
      }
    ]
  },
  {
    name: 'Developer Utilities',
    description: 'Essential tools for coding and development',
    icon: Code,
    tools: [
      {
        name: 'UUID Generator',
        description: 'Generate UUIDs and GUIDs in various formats',
        icon: Zap,
        path: '/uuid-generator',
        color: 'bg-emerald-600'
      },
      {
        name: 'Regex Tester',
        description: 'Test and validate regular expressions with live matching',
        icon: Search,
        path: '/regex-tester',
        color: 'bg-violet-600'
      }
    ]
  },
  {
    name: 'Security & Generation',
    description: 'Password generators and security utilities',
    icon: Shield,
    tools: [
      {
        name: 'Password Generator',
        description: 'Generate secure passwords with custom options',
        icon: Shield,
        path: '/password-generator',
        color: 'bg-red-600'
      },
      {
        name: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for designs and mockups',
        icon: FileText,
        path: '/lorem-generator',
        color: 'bg-gray-600'
      }
    ]
  },
  {
    name: 'CSS & Design',
    description: 'CSS generators and design utilities',
    icon: Paintbrush,
    tools: [
      {
        name: 'CSS Generator',
        description: 'Generate CSS for gradients, shadows, and animations',
        icon: Paintbrush,
        path: '/css-generator',
        color: 'bg-purple-600'
      },
      {
        name: 'Image Optimizer',
        description: 'Compress and optimize images for web',
        icon: Image,
        path: '/image-optimizer',
        color: 'bg-green-600'
      }
    ]
  },
  {
    name: 'Code & Documentation',
    description: 'Code formatting and documentation tools',
    icon: Code,
    tools: [
      {
        name: 'Markdown Preview',
        description: 'Live markdown editor with real-time preview',
        icon: Eye,
        path: '/markdown-preview',
        color: 'bg-blue-600'
      },
      {
        name: 'Diff Checker',
        description: 'Compare two text files and highlight differences',
        icon: GitCompare,
        path: '/diff-checker',
        color: 'bg-orange-600'
      },
      {
        name: 'Code Beautifier',
        description: 'Format and beautify HTML, CSS, and JavaScript',
        icon: Wand2,
        path: '/code-beautifier',
        color: 'bg-indigo-600'
      }
    ]
  },
  {
    name: 'Calculators',
    description: 'Mathematical and financial calculators for everyday use',
    icon: Calculator,
    tools: [
      {
        name: 'Basic Calculator',
        description: 'Standard calculator with basic arithmetic operations',
        icon: Calculator,
        path: '/calculator/basic',
        color: 'bg-blue-600'
      },
      {
        name: 'Scientific Calculator',
        description: 'Advanced calculator with scientific functions and operations',
        icon: Calculator,
        path: '/calculator/scientific',
        color: 'bg-purple-600'
      },
      {
        name: 'Loan Calculator',
        description: 'Calculate loan payments, interest, and amortization schedules',
        icon: DollarSign,
        path: '/calculator/loan',
        color: 'bg-green-600'
      },
      {
        name: 'SIP Calculator',
        description: 'Calculate returns on Systematic Investment Plans (SIP)',
        icon: TrendingUp,
        path: '/calculator/sip',
        color: 'bg-orange-600'
      },
      {
        name: 'Mutual Fund Calculator',
        description: 'Calculate mutual fund returns and investment growth',
        icon: PiggyBank,
        path: '/calculator/mutual-fund',
        color: 'bg-indigo-600'
      }
    ]
  },
  {
    name: 'Generators & Converters',
    description: 'Code generators and format converters',
    icon: Calculator,
    tools: [
      {
        name: 'QR Code Generator',
        description: 'Generate QR codes for text, URLs, and data',
        icon: QrCode,
        path: '/qr-generator',
        color: 'bg-rose-600'
      },
      {
        name: 'Time Tools',
        description: 'Unix timestamp converter and timezone utilities',
        icon: Clock,
        path: '/time-tools',
        color: 'bg-amber-600'
      },
      {
        name: 'Unit Converter',
        description: 'Convert between different units of measurement',
        icon: Ruler,
        path: '/unit-converter',
        color: 'bg-teal-600'
      }
    ]
  }
];