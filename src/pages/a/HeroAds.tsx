import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Link as LinkIcon,
  EyeOff,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import SeoSetup from '../../components/SeoSetup';
import NewHeroAdsModal from '../../components/a/NewHeroAdsModal';
import heroAdsRequests from '../../utils/requests/heroAdsRequests';
import type { iHeroAds, HeroAdFilters, QueryOptions } from '../../types/heroAd';
import EditHeroAdsModal from '../../components/a/EditHeroAdsModal';

const HeroAds = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [adToEdit, setAdToEdit] = useState<iHeroAds>();
  const [heroAds, setHeroAds] = useState<iHeroAds[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const fetchHeroAds = async (page: number = 1, search: string = '') => {
    try {
      setLoading(true);

      const filters: HeroAdFilters = {};
      if (search) {
        filters.title = search;
      }

      const queries: QueryOptions = {
        page,
        limit,
        sortBy: 'createdAt',
        order: 'DESC',
      };

      const response = await heroAdsRequests.getAllHeroAdsRequest(
        filters,
        queries
      );

      if (response.success === true) {
        setHeroAds(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalCount(response.data.pagination?.total || 0);
        return;
      }
      throw new Error(response.message || 'An unknown error occurred.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch hero ads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroAds(1, '');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchHeroAds(1, searchTerm);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchHeroAds(newPage, searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchHeroAds(1, '');
  };

  const getStatusBadge = (status: boolean) => {
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          status
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full mr-2 ${
            status ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        {status ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const handleDeleteAd = async (adId: number) => {
    if (window.confirm('Are you sure you want to delete this hero ad?')) {
      try {
        const response = await heroAdsRequests.deleteHeroAdRequest(adId);
        if (response.success) {
          toast.success('Hero ad deleted successfully');
          fetchHeroAds(currentPage, searchTerm);
        } else {
          throw new Error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete hero ad');
      }
    }
  };

  const handleToggleStatus = async (ad: iHeroAds) => {
    try {
      const response = await heroAdsRequests.updateHeroAdRequest(ad.id, {
        ...ad,
        isActive: !ad.isActive,
      });
      if (response.success) {
        toast.success(
          `Hero ad ${!ad.isActive ? 'activated' : 'deactivated'} successfully`
        );
        fetchHeroAds(currentPage, searchTerm);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update hero ad status');
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      <SeoSetup mainData={{ title: 'Hero Ads Management' }} />
      <Toaster
        position="top-right"
        containerStyle={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Hero Ads Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your hero banner advertisements and promotions
              </p>
            </div>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex cursor-pointer  items-center gap-2 bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              New Hero Ad
            </button>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hero ads by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-[#e67e22] cursor-pointer text-white px-6 py-3 rounded-xl font-medium hover:bg-[#d35400] transition-colors"
              >
                Search
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="bg-gray-500 cursor-pointer text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    Total Hero Ads
                  </p>
                  <p className="text-2xl font-bold text-orange-900 mt-1">
                    {totalCount}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Active Ads
                  </p>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    {heroAds.filter((ad) => ad.isActive).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Inactive Ads
                  </p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {heroAds.filter((ad) => !ad.isActive).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <EyeOff className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e67e22]"></div>
            </div>
          ) : heroAds.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No hero ads found' : 'No hero ads found'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? 'Try adjusting your search terms or clear the search to see all ads.'
                  : 'Get started by creating your first hero advertisement.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setIsNewModalOpen(true)}
                  className="bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Hero Ad
                </button>
              )}
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Ad Content
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Button & Link
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-right p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {heroAds.map((ad: iHeroAds, index) => (
                      <tr
                        key={ad.id || index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={ad.image}
                              alt={ad.title}
                              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNE0zMiA0MCIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                {ad.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {ad.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium text-gray-700">
                                Button:
                              </span>
                              <div className="inline-flex items-center px-3 py-1 bg-[#e67e22] text-white text-sm rounded-full ml-2">
                                {ad.buttonText}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700">
                                Link:
                              </span>
                              <a
                                href={ad.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm ml-2 truncate block max-w-xs"
                                title={ad.link}
                              >
                                {ad.link}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            {getStatusBadge(ad.isActive || false)}
                            <button
                              onClick={() => handleToggleStatus(ad)}
                              className={`text-xs font-medium px-2 py-1 rounded border transition-colors ${
                                ad.isActive
                                  ? 'text-red-600 border-red-200 hover:bg-red-50'
                                  : 'text-green-600 border-green-200 hover:bg-green-50'
                              }`}
                            >
                              {ad.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button
                              title="Edit"
                              className="p-2 cursor-pointer text-gray-400 hover:text-[#e67e22] hover:bg-orange-50 rounded-lg transition-colors"
                              onClick={() => {
                                setIsEditOpen(true);
                                setAdToEdit(ad);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              title="Delete"
                              className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              onClick={() => handleDeleteAd(ad.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-semibold">
                      {(currentPage - 1) * limit + 1} -{' '}
                      {Math.min(currentPage * limit, totalCount)}
                    </span>{' '}
                    of <span className="font-semibold">{totalCount}</span> hero
                    ads
                    {searchTerm && (
                      <span className="ml-2 text-gray-500">
                        (filtered by "{searchTerm}")
                      </span>
                    )}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg border ${
                        currentPage === 1
                          ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 text-sm rounded-lg border ${
                          currentPage === page
                            ? 'bg-[#e67e22] text-white border-[#e67e22]'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg border ${
                        currentPage === totalPages
                          ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isNewModalOpen && (
        <NewHeroAdsModal
          onClose={() => {
            setIsNewModalOpen(false);
            fetchHeroAds(currentPage, searchTerm);
          }}
        />
      )}
      {isEditOpen && (
        <EditHeroAdsModal
          onClose={() => {
            setIsEditOpen(false);
            fetchHeroAds(currentPage, searchTerm);
          }}
          ad={adToEdit}
        />
      )}
    </div>
  );
};

export default HeroAds;
