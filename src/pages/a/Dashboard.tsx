import toast, { Toaster } from 'react-hot-toast';
import { FaBox, FaTags, FaEye } from 'react-icons/fa';
import { FiRefreshCw, FiDownload, FiTrendingUp } from 'react-icons/fi';
import { MdAdsClick } from 'react-icons/md';
import productRequests from '../../utils/requests/productRequests';
import { useEffect, useState } from 'react';
import SeoSetup from '../../components/SeoSetup';
import { Link } from 'react-router-dom';
import NewProductModal from '../../components/a/NewProductModal';
import type { QueryOptions } from '../../types/heroAd';
import MonthlyViewsChart from '../../components/a/dashboard/MonthlyViewsChart';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalViews?: number;
  viewsToday?: number;
  last12MonthsAnalytics?: { month: string; views: number }[];
}

interface RecentProduct {
  id: number;
  name: string;
  category: any;
  price: number;
  images: string[];
  createdAt: string;
}

interface TopProductByViews {
  productId: number;
  views: number;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    images: string[];
  };
}

interface Category {
  id: number;
  name: string;
}

const Dashboard = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalViews: 0,
    viewsToday: 0,
    last12MonthsAnalytics: [],
  });
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [topProductsByViews, setTopProductsByViews] = useState<
    TopProductByViews[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      setLoading(true);
      const response = await productRequests.getDashoardData();

      if (response.success === true) {
        const dashboardData = response.data.dashboard || response.data;

        setStats({
          totalProducts: dashboardData.totalProducts || 0,
          totalCategories: dashboardData.totalCategories || 0,
          totalViews: dashboardData.totalViews || 0,
          viewsToday: dashboardData.viewsToday || 0,
          last12MonthsAnalytics: dashboardData.last12MonthsAnalytics || [],
        });

        const productsData =
          response.data.data?.products || response.data.products || [];
        const topProductsData =
          response.data.data?.topProductsByViews ||
          response.data.topProductsByViews ||
          [];

        setRecentProducts(productsData);
        setTopProductsByViews(topProductsData);
        return;
      }
      throw new Error(response.message || 'An unknown error occurred');
    } catch (error: any) {
      toast.error(error.message || 'Failed to load dashboard data');

      setStats({
        totalProducts: 0,
        totalCategories: 0,
        totalViews: 0,
        viewsToday: 0,
        last12MonthsAnalytics: [],
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchCategories = async (page: number = 1) => {
    try {
      const queries: QueryOptions = {
        page,
        limit: 100,
        sortBy: 'updatedAt',
        order: 'DESC',
      };

      const response = await productRequests.getCategories({}, queries);
      if (response.success === true) {
        setCategories(response.data.data || []);
        return;
      }
      throw new Error('An unknown error occurred.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch categories');
    }
  };

  const handleRefresh = () => {
    fetchData();
    fetchCategories();
    toast.success('Dashboard data refreshed!');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(
      {
        stats,
        recentProducts,
        topProductsByViews,
        categories,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    );

    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `dashboard-export-${
      new Date().toISOString().split('T')[0]
    }.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);

    toast.success('Dashboard data exported!');
  };

  const calculateGrowthRate = () => {
    if (
      !stats.last12MonthsAnalytics ||
      stats.last12MonthsAnalytics.length < 2
    ) {
      return 0;
    }

    const lastMonth =
      stats.last12MonthsAnalytics[stats.last12MonthsAnalytics.length - 1].views;
    const previousMonth =
      stats.last12MonthsAnalytics[stats.last12MonthsAnalytics.length - 2].views;

    if (previousMonth === 0) return lastMonth > 0 ? 100 : 0;

    return ((lastMonth - previousMonth) / previousMonth) * 100;
  };

  useEffect(() => {
    // fetch dashboard data and categories in parallel to reduce wait time
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchData(), fetchCategories()]);
      setLoading(false);
    };
    load();
  }, []);

  const statCards = [
    {
      name: 'totalProducts',
      label: 'Total Products',
      value: stats.totalProducts,
      icon: <FaBox />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: ' text-[#e67e22]',
    },
    {
      name: 'totalCategories',
      label: 'Categories',
      value: stats.totalCategories,
      icon: <FaTags />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: ' text-[#e67e22]',
    },
    {
      name: 'totalViews',
      label: 'Total Views',
      value: stats.totalViews || 0,
      icon: <FaEye />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: ' text-[#e67e22]',
    },
    {
      name: 'viewsToday',
      label: 'Views Today',
      value: stats.viewsToday || 0,
      icon: <FaEye />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: ' text-[#e67e22]',
    },
  ];

  const growthRate = calculateGrowthRate();
  const avgDailyViews = stats.viewsToday || 0;
  const productsPerCategory =
    stats.totalCategories > 0
      ? (stats.totalProducts / stats.totalCategories).toFixed(1)
      : '0.0';
  const viewsPerProduct =
    stats.totalProducts > 0 && stats.totalViews
      ? Math.round(stats.totalViews / stats.totalProducts)
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-[#e67e22] to-[#d35400] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="h-32 w-full">
              <div className="animate-pulse bg-white/20 h-8 w-1/3 rounded mb-2" />
              <div className="animate-pulse bg-white/20 h-4 w-1/2 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="h-12 w-full animate-pulse bg-gray-200 rounded" />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="h-12 w-full animate-pulse bg-gray-200 rounded" />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="h-12 w-full animate-pulse bg-gray-200 rounded" />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="h-12 w-full animate-pulse bg-gray-200 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl">
              <div className="h-48 animate-pulse bg-gray-200 rounded" />
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <div className="h-48 animate-pulse bg-gray-200 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl">
              <div className="h-20 animate-pulse bg-gray-200 rounded" />
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <div className="h-20 animate-pulse bg-gray-200 rounded" />
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <div className="h-20 animate-pulse bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      <Toaster position="top-right" />
      <SeoSetup mainData={{ title: 'Dashboard' }} />

      <div className="bg-gradient-to-r from-[#e67e22] to-[#d35400] rounded-xl p-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-bold mb-1">Welcome Back! 👋</h2>
            <p className="text-orange-100 text-xs sm:text-sm">
              Manage your {stats.totalProducts} products and{' '}
              {stats.totalCategories} categories.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-sm disabled:opacity-50 font-medium"
            >
              <FiRefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">
                {isRefreshing ? 'Refreshing' : 'Refresh'}
              </span>
            </button>
            <button
              onClick={handleExportData}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-sm font-medium"
            >
              <FiDownload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((stat, index) => (
          <div
            key={stat.name}
            className="group bg-white p-4 rounded-lg border border-gray-100 hover:scale-[1.01] transition-all"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  {stat.label}
                </p>
                <h3 className="text-lg font-bold text-gray-800 mt-1">
                  {typeof stat.value === 'number'
                    ? stat.value.toLocaleString()
                    : stat.value}
                </h3>
              </div>
              <div
                className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.textColor} text-lg group-hover:scale-105 transition-transform`}
              >
                {stat.icon}
              </div>
            </div>
            <div
              className={`mt-2 h-0.5 bg-gradient-to-r ${stat.color} rounded-full`}
            ></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MonthlyViewsChart
            data={stats.last12MonthsAnalytics || []}
            type={chartType}
            title="Monthly Views Analytics"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all cursor-pointer ${
                chartType === 'line'
                  ? 'bg-orange-100 text-[#e67e22] border border-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 rounded-md text-sm transition-all cursor-pointer ${
                chartType === 'bar'
                  ? 'bg-orange-100 text-[#e67e22] border border-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <h3 className="text-base font-bold text-gray-800 mb-3">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-100 rounded-lg">
                  <FaEye className="text-[#e67e22] w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Avg. Daily Views</p>
                  <p className="font-semibold text-gray-800 text-sm">
                    {avgDailyViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-100 rounded-lg">
                  <FaBox className="text-[#e67e22] w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Products/Categ</p>
                  <p className="font-semibold text-[#e67e22] text-sm">
                    {productsPerCategory}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-100 rounded-lg">
                  <FiTrendingUp className="text-[#e67e22] w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Growth</p>
                  <p
                    className={`font-semibold text-sm ${
                      growthRate >= 0 ? 'text-[#e67e22]' : 'text-red-600'
                    }`}
                  >
                    {growthRate >= 0 ? '+' : ''}
                    {growthRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-100 rounded-lg">
                  <FaEye className="text-orange-600 w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Per Product</p>
                  <p className="font-semibold text-gray-800 text-sm">
                    {viewsPerProduct.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-800">
                Recent Products
              </h3>
              <Link
                to="/a/products"
                className="text-[#e67e22] hover:text-[#d35400] font-medium text-xs flex items-center gap-1"
              >
                View All
                <FaEye className="text-xs" />
              </Link>
            </div>
            <p className="text-gray-600 text-xs mt-1">
              Latest {recentProducts.length} products
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentProducts.length > 0 ? (
                  recentProducts.slice(0, 5).map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                            {product.images && product.images[0] ? (
                              <img
                                className="h-8 w-8 object-cover"
                                src={product.images[0]}
                                alt={product.name}
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-8 w-8 bg-gray-300 flex items-center justify-center">
                                <FaBox className="text-gray-500 text-xs" />
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {product.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                          {product.category?.name || 'N/A'}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        ${product.price?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-3 py-4 text-center">
                      <div className="text-gray-500">
                        <p className="text-xs">No products yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-800">
              Top Products (30 Days)
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              Most viewed by customers
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topProductsByViews.length > 0 ? (
                  topProductsByViews.slice(0, 5).map((item) => (
                    <tr
                      key={item.productId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                            {item.product?.images && item.product.images[0] ? (
                              <img
                                className="h-8 w-8 object-cover"
                                src={item.product.images[0]}
                                alt={item.product.name}
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-8 w-8 bg-gray-300 flex items-center justify-center">
                                <FaBox className="text-gray-500 text-xs" />
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {item.product?.name || 'Unknown'}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        ${item.product?.price?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-800">
                          <FaEye className="text-xs" />
                          {item.views.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-3 py-4 text-center">
                      <div className="text-gray-500">
                        <p className="text-xs">No views data yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Link
          to="/a/products"
          className="bg-white p-4 rounded-lg border border-gray-100 hover:scale-[1.01] transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-600 text-lg group-hover:bg-blue-500/20 transition">
              <FaBox />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Products</h3>
              <p className="text-xs text-gray-600">View & edit products</p>
            </div>
          </div>
        </Link>

        <Link
          to="/a/categories"
          className="bg-white p-4 rounded-lg border border-gray-100 hover:scale-[1.01] transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-600 text-lg group-hover:bg-green-500/20 transition">
              <FaTags />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Categories
              </h3>
              <p className="text-xs text-gray-600">Manage categories</p>
            </div>
          </div>
        </Link>

        <Link
          to="/a/hero-ads"
          className="bg-white p-4 rounded-lg border border-gray-100 hover:scale-[1.01] transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-600 text-lg group-hover:bg-purple-500/20 transition">
              <MdAdsClick />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Hero Ads</h3>
              <p className="text-xs text-gray-600">Manage ads</p>
            </div>
          </div>
        </Link>
      </div>

      {isNewModalOpen && (
        <NewProductModal
          onClose={() => {
            setIsNewModalOpen(false);
            fetchData();
            fetchCategories();
          }}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Dashboard;
