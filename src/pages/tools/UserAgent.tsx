import React from 'react';
import { Smartphone } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function UserAgent() {
  const userAgent = navigator.userAgent;
  
  const getBrowser = () => {
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('SamsungBrowser')) return 'Samsung Browser';
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
    if (userAgent.includes('Trident')) return 'Internet Explorer';
    if (userAgent.includes('Edge')) return 'Microsoft Edge';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    return 'Unknown';
  };

  const getOS = () => {
    if (userAgent.includes('Windows NT 10.0')) return 'Windows 10/11';
    if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (userAgent.includes('Windows NT 6.2')) return 'Windows 8';
    if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
    if (userAgent.includes('Windows NT 6.0')) return 'Windows Vista';
    if (userAgent.includes('Windows NT 5.1')) return 'Windows XP';
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS X 10_15_7')) return 'macOS Big Sur/Monterey';
    if (userAgent.includes('Mac OS X 10_14')) return 'macOS Mojave';
    if (userAgent.includes('Mac OS X 10_13')) return 'macOS High Sierra';
    if (userAgent.includes('Mac OS X')) return 'macOS';
    if (userAgent.includes('iPhone OS')) return 'iOS (iPhone)';
    if (userAgent.includes('iPad')) return 'iPadOS';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('Linux')) return 'Linux';
    return 'Unknown';
  };

  const getDevice = () => {
    if (userAgent.includes('iPhone')) return 'iPhone';
    if (userAgent.includes('iPad')) return 'iPad';
    if (userAgent.includes('Android')) return 'Android Device';
    if (userAgent.includes('Mobile')) return 'Mobile Device';
    return 'Desktop';
  };

  const browserInfo = {
    browser: getBrowser(),
    os: getOS(),
    device: getDevice(),
    userAgent: userAgent
  };

  return (
    <ToolLayout
      title="User Agent Info"
      description="Analyze your browser, operating system, and device information"
      icon={Smartphone}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Browser</h3>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {browserInfo.browser}
                </p>
              </div>
              <CopyButton text={browserInfo.browser} />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Operating System</h3>
                <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {browserInfo.os}
                </p>
              </div>
              <CopyButton text={browserInfo.os} />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Device Type</h3>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {browserInfo.device}
                </p>
              </div>
              <CopyButton text={browserInfo.device} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Complete User Agent String
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <code className="text-sm text-gray-800 dark:text-gray-200 break-all">
                  {browserInfo.userAgent}
                </code>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <CopyButton text={browserInfo.userAgent} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            About User Agent Strings
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            User agent strings help websites identify your browser and device to provide the best experience. 
            This information is automatically sent with every web request.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}