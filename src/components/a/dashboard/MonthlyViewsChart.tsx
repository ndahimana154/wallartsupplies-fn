import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface MonthlyViewsChartProps {
  data: { month: string; views: number }[];
  type?: 'line' | 'area' | 'bar';
  title?: string;
}

const MonthlyViewsChart = ({
  data,
  type = 'area',
  title = 'Monthly Views Analytics',
}: MonthlyViewsChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-2">No data available</div>
          <div className="text-sm text-gray-500">
            View data will appear here
          </div>
        </div>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    monthShort: new Date(item.month + '-01').toLocaleDateString('en-US', {
      month: 'short',
    }),
    monthYear: new Date(item.month + '-01').toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    fullMonth: new Date(item.month + '-01').toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  }));

  const totalViews = data.reduce((sum, item) => sum + item.views, 0);
  const averageViews = Math.round(totalViews / data.length);
  const maxViews = Math.max(...data.map((item) => item.views));
  const minViews = Math.min(...data.map((item) => item.views));

  const latestChange =
    data.length > 1
      ? data[data.length - 1].views - data[data.length - 2].views
      : 0;
  const changePercentage =
    data.length > 1 && data[data.length - 2].views > 0
      ? ((latestChange / data[data.length - 2].views) * 100).toFixed(1)
      : data.length === 1
        ? '100'
        : '0';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">
            {payload[0].payload.fullMonth}
          </p>
          <p className="text-purple-600 font-bold mt-1">
            {payload[0].value.toLocaleString()} views
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: formattedData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    const commonElements = (
      <>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          dataKey="monthShort"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#666', fontSize: 12 }}
          interval={0}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#666', fontSize: 12 }}
          domain={[0, 'dataMax + 5']}
          tickFormatter={(value) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </>
    );

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonElements}
            <Bar
              dataKey="views"
              fill="#d35400"
              radius={[4, 4, 0, 0]}
              name="Views"
            />
          </BarChart>
        );

      case 'area':
        return (
          <LineChart {...commonProps}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d35400" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#d35400" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {commonElements}
            <Area
              type="monotone"
              dataKey="views"
              stroke="#d35400"
              fill="url(#colorViews)"
              strokeWidth={3}
              name="Views"
              dot={{ r: 6, fill: '#d35400', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{
                r: 8,
                fill: '#e67e22',
                strokeWidth: 2,
                stroke: '#fff',
              }}
            />
          </LineChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            {commonElements}
            <Line
              type="monotone"
              dataKey="views"
              stroke="#d35400"
              strokeWidth={3}
              dot={{ r: 6, fill: '#d35400', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{
                r: 8,
                fill: '#e67e22',
                strokeWidth: 2,
                stroke: '#fff',
              }}
              name="Views"
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {data.length} months of data
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
          <div className="text-center px-4 py-2 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-[#e67e22]">
              {totalViews.toLocaleString()}
            </div>
          </div>

          <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Average</div>
            <div className="text-2xl font-bold text-gray-800">
              {averageViews.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
            {latestChange >= 0 ? (
              <FiTrendingUp className="text-green-500" />
            ) : (
              <FiTrendingDown className="text-red-500" />
            )}
            <span
              className={`font-semibold ${
                latestChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {latestChange >= 0 ? '+' : ''}
              {changePercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-72 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">Peak Month</div>
            <div className="font-semibold text-gray-800">
              {formattedData.find((item) => item.views === maxViews)
                ?.monthShort || '-'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Peak Views</div>
            <div className="font-semibold text-gray-800">
              {maxViews.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Lowest Views</div>
            <div className="font-semibold text-gray-800">
              {minViews.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Data Points</div>
            <div className="font-semibold text-gray-800">{data.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyViewsChart;
