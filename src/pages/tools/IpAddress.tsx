import React, { useState, useEffect } from 'react';
import { Globe, Loader } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  timezone: string;
  isp: string;
}

export default function IpAddress() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setIpInfo({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          timezone: data.timezone,
          isp: data.org
        });
      } catch (err) {
        setError('Failed to fetch IP information');
        console.error('Error fetching IP info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  if (loading) {
    return (
      <ToolLayout
        title="IP Address Info"
        description="Get your public IP address and location information"
        icon={Globe}
      >
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading your IP information...</span>
        </div>
      </ToolLayout>
    );
  }

  if (error) {
    return (
      <ToolLayout
        title="IP Address Info"
        description="Get your public IP address and location information"
        icon={Globe}
      >
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      title="IP Address Info"
      description="Get your public IP address and location information"
      icon={Globe}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">IP Address</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {ipInfo?.ip}
                </p>
              </div>
              <CopyButton text={ipInfo?.ip || ''} />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Location</h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                  {ipInfo?.city}, {ipInfo?.region}
                </p>
              </div>
              <CopyButton text={`${ipInfo?.city}, ${ipInfo?.region}, ${ipInfo?.country}` || ''} />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Country</h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                  {ipInfo?.country}
                </p>
              </div>
              <CopyButton text={ipInfo?.country || ''} />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Timezone</h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                  {ipInfo?.timezone}
                </p>
              </div>
              <CopyButton text={ipInfo?.timezone || ''} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Internet Service Provider</h3>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                {ipInfo?.isp}
              </p>
            </div>
            <CopyButton text={ipInfo?.isp || ''} />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}