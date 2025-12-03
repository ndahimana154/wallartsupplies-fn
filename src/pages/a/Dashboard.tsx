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

      console.log('Dashboard Response:', response);

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
      2
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
    fetchData();
    fetchCategories();
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e67e22]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn p-6">
      <Toaster position="top-right" />
      <SeoSetup mainData={{ title: 'Dashboard' }} />

      <div className="bg-gradient-to-r from-[#e67e22] to-[#d35400] rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome Back! 👋</h2>
            <p className="text-orange-100 text-sm sm:text-base">
              Manage your {stats.totalProducts} products and{' '}
              {stats.totalCategories} categories — all in one beautiful
              dashboard.
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              <FiRefreshCw
                className={`${isRefreshing ? 'animate-spin' : ''}`}
              />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
            >
              <FiDownload />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.name}
            className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <h3 className="text-4xl font-bold text-gray-800 mt-2">
                  {typeof stat.value === 'number'
                    ? stat.value.toLocaleString()
                    : stat.value}
                </h3>
              </div>
              <div
                className={`p-4 rounded-full ${stat.bgColor} ${stat.textColor} text-3xl group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
            </div>
            <div
              className={`mt-4 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
            ></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyViewsChart
            data={stats.last12MonthsAnalytics || []}
            type={chartType}
            title="Monthly Views Analytics"
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded-lg transition-all ${
                chartType === 'line'
                  ? 'bg-orange-100  text-[#e67e22] border border-purple-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded-lg transition-all ${
                chartType === 'bar'
                  ? 'bg-orange-100  text-[#e67e22] border border-purple-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100  rounded-lg">
                  <FaEye className=" text-[#e67e22]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Daily Views</p>
                  <p className="font-semibold text-gray-800">
                    {avgDailyViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaBox className=" text-[#e67e22]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Products/Category</p>
                  <p className="font-semibold  text-[#e67e22]">
                    {productsPerCategory}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiTrendingUp className=" text-[#e67e22]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Growth</p>
                  <p
                    className={`font-semibold ${
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
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaEye className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Views per Product</p>
                  <p className="font-semibold text-gray-800">
                    {viewsPerProduct.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Products
              </h3>
              <Link
                to="/a/products"
                className="text-[#e67e22] hover:text-[#d35400] font-medium text-sm flex items-center gap-1"
              >
                View All
                <FaEye className="text-xs" />
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              Latest {recentProducts.length} products in your inventory
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {recentProducts.length > 0 ? (
                  recentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                            {product.images && product.images[0] ? (
                              <img
                                className="h-10 w-10 object-cover"
                                src={product.images[0]}
                                alt={product.name}
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-300 flex items-center justify-center">
                                <FaBox className="text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {product.category?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <FaBox className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">No products found</p>
                        <p className="text-sm mt-1">
                          Get started by adding your first product
                        </p>
                        <button
                          onClick={() => setIsNewModalOpen(true)}
                          className="bg-[#e67e22] mt-3 cursor-pointer hover:bg-[#d35400] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          <span>Add Product</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">
              Top Products (Last 30 Days)
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Most viewed products by customer engagement
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {topProductsByViews.length > 0 ? (
                  topProductsByViews.map((item) => (
                    <tr
                      key={item.productId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                            {item.product?.images && item.product.images[0] ? (
                              <img
                                className="h-10 w-10 object-cover"
                                src={item.product.images[0]}
                                alt={item.product.name}
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-300 flex items-center justify-center">
                                <FaBox className="text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product?.name || 'Unknown Product'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.product?.price?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800">
                          <FaEye className="text-xs" />
                          {item.views.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <FaEye className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">No views data yet</p>
                        <p className="text-sm mt-1">
                          Views will appear as customers browse products
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/a/products"
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-full text-orange-600 text-2xl group-hover:bg-blue-500/20 transition">
              <FaBox />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Products</h3>
              <p className="text-sm text-gray-600">
                View and edit all products
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/a/categories"
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-full text-orange-600 text-2xl group-hover:bg-green-500/20 transition">
              <FaTags />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Categories</h3>
              <p className="text-sm text-gray-600">Manage product categories</p>
            </div>
          </div>
        </Link>

        <Link
          to="/a/hero-ads"
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-full text-orange-600 text-2xl group-hover:bg-purple-500/20 transition">
              <MdAdsClick />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Hero ads</h3>
              <p className="text-sm text-gray-600">
                View ads and home customizations
              </p>
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
