import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import type { CategoryData } from '../../types/product';
import {
  Edit,
  Image as ImageIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import SeoSetup from '../../components/SeoSetup';
import type { QueryOptions } from '../../types/heroAd';
import inquiriesRequests from '../../utils/requests/inquiriesRequests';
import type {
  CustomInquiriesData,
  InquiriesFilters,
} from '../../types/customInquiries';
import InquiryDetails from '../../components/a/InquiryDetails';
import GalleryOpenModal from '../../components/a/GalleryOpenModal';

const Inquiries = () => {
  const [data, setData] = useState<CustomInquiriesData[]>([]);
  const [_isEditOpen, _setIsEditOpen] = useState(false);
  const [_catToEdit, _setCatToEdit] = useState<CategoryData>();
  const [loading, setLoading] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] =
    useState<CustomInquiriesData | null>(null);

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpenedFromDetail, setGalleryOpenedFromDetail] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'UNRESOLVED' | 'RESOLVED'
  >('ALL');
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const limit = 15;

  const fetchData = async (
    page: number = 1,
    search: string = '',
    statusOverride?: 'ALL' | 'UNRESOLVED' | 'RESOLVED'
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const filters: InquiriesFilters = {};

      if (search) {
        filters.fullNames = search;
        filters.email = search;
        filters.phone = search;
      }

      const effectiveStatus = statusOverride ?? statusFilter;
      if (effectiveStatus && effectiveStatus !== 'ALL') {
        filters.status = effectiveStatus;
      }

      const queries: QueryOptions = {
        page,
        limit,
        sortBy: 'updatedAt',
        order: 'DESC',
      };

      const response = await inquiriesRequests.getAllInquiries(
        filters,
        queries
      );

      if (response.success === true) {
        setData(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalCount(response.data.pagination?.total || 0);
      } else {
        throw new Error('Failed to fetch inquiries');
      }
      // Fetch unresolved total for badge (only when backend supports pagination.total)
      try {
        const unresolvedFilters: InquiriesFilters = {
          ...(filters || {}),
        } as InquiriesFilters;
        // if caller already filtered by UNRESOLVED, reuse the main response's total
        if (filters.status === 'UNRESOLVED') {
          setUnresolvedCount(response.data.pagination?.total || 0);
        } else {
          unresolvedFilters.status = 'UNRESOLVED';
          const unresolvedResp = await inquiriesRequests.getAllInquiries(
            unresolvedFilters,
            { page: 1, limit: 1, sortBy: 'updatedAt', order: 'DESC' }
          );
          if (unresolvedResp && unresolvedResp.success === true) {
            setUnresolvedCount(unresolvedResp.data.pagination?.total || 0);
          }
        }
      } catch (e) {
        // don't block main flow for badge failures
        console.warn('Failed to fetch unresolved count', e);
      }
    } catch (error: any) {
      toast.error(error.message || 'An unknown error occurred.');
      return false;
    } finally {
      setLoading(false);
    }

    return true;
  };

  const toggleResolvedStatus = async (
    inquiryId: number,
    newStatus: 'RESOLVED' | 'UNRESOLVED'
  ) => {
    try {
      const promise = inquiriesRequests.toggleResolvedStatus(
        inquiryId,
        newStatus
      );
      await toast.promise(promise, {
        loading: `Updating status to ${newStatus}...`,
        success: `Inquiry marked ${newStatus}`,
        error: `Failed to update status`,
      });
      await fetchData(currentPage, searchTerm);
    } catch (error: any) {
      toast.error(error.message || 'Failed to toggle status');
    }
  };

  useEffect(() => {
    fetchData(1, '');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    toast.success('Filters applied');
    fetchData(1, searchTerm);
  };

  const clearSearch = async () => {
    setSearchTerm('');
    setCurrentPage(1);
    const ok = await fetchData(1, '', 'ALL');
    if (ok) {
      setStatusFilter('ALL');
    } else {
      toast.error('Failed to clear filters');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchData(newPage, searchTerm);
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

  const closeGallery = () => {
    setGalleryOpen(false);
    if (galleryOpenedFromDetail) {
      setDetailOpen(true);
      setGalleryOpenedFromDetail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      <SeoSetup mainData={{ title: 'Admin Inquiries list' }} />
      <Toaster position="top-right" />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Inquiries Management
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-gray-600 mt-2">
                Manage your customers inquiries and custom orders
              </p>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-100 text-sm font-medium">
                Unresolved:{' '}
                <span className="ml-2 font-semibold">{unresolvedCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 items-stretch"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all"
              />
            </div>

            <div className="w-full sm:w-56">
              <label className="sr-only">Status</label>
              <select
                value={statusFilter}
                onChange={async (e) => {
                  const newStatus = e.target.value as
                    | 'ALL'
                    | 'UNRESOLVED'
                    | 'RESOLVED';
                  setCurrentPage(1);
                  // try fetching with the desired status first; only update UI if backend responds
                  const ok = await fetchData(1, searchTerm, newStatus);
                  if (ok) {
                    setStatusFilter(newStatus);
                    toast.success(`Status filter: ${newStatus}`);
                  } else {
                    toast.error('Failed to apply status filter');
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all"
              >
                <option value="ALL">All Statuses</option>
                <option value="UNRESOLVED">UNRESOLVED</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#e67e22] cursor-pointer text-white px-6 py-3 rounded-xl font-medium hover:bg-[#d35400] transition-colors"
              >
                Search
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    clearSearch();
                  }}
                  className="bg-gray-500 cursor-pointer text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">
                  Total Inquiries
                </p>
                <p className="text-2xl font-bold text-orange-900 mt-1">
                  {totalCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Results On This Page
                </p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {data.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Current Page
                </p>
                <p className="text-sm font-bold text-green-900 mt-1">
                  {currentPage} of {totalPages}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
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
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No inquiries found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? 'No results match your search. Try different keywords or clear the search to view all inquiries.'
                : 'There are no inquiries to show right now.'}
            </p>
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
                    <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider w-16">
                      #
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Inquiry Details
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Contact
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
                  {data.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg font-semibold text-gray-600 text-sm">
                          {(currentPage - 1) * limit + index + 1}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="flex items-center gap-2">
                              {item.images && item.images.length > 0 ? (
                                item.images.slice(0, 2).map((image, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setGalleryOpenedFromDetail(false);
                                      setGalleryImages(item.images);
                                      setGalleryIndex(idx);
                                      setGalleryOpen(true);
                                    }}
                                    className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm focus:outline-none"
                                    aria-label={`Open image ${idx + 1}`}
                                  >
                                    <img
                                      src={image}
                                      alt={`Inquiry Image ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAxNk0yNCAzMiIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                                      }}
                                    />
                                  </button>
                                ))
                              ) : (
                                <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
                                  <ImageIcon className="w-5 h-5" />
                                </div>
                              )}
                              {item.images && item.images.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setGalleryOpenedFromDetail(false);
                                    setGalleryImages(item.images);
                                    setGalleryIndex(2);
                                    setGalleryOpen(true);
                                  }}
                                  className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm bg-black bg-opacity-40 text-white flex items-center justify-center text-sm font-semibold"
                                >
                                  +{item.images.length - 2}
                                </button>
                              )}
                            </div>

                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {item.fullNames}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800 border border-blue-100">
                            {item.email}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800 border border-blue-100">
                            {item.phone}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                            item.status === 'UNRESOLVED'
                              ? 'bg-yellow-50 text-yellow-800 border-yellow-100'
                              : 'bg-green-50 text-green-800 border-green-100'
                          }`}
                        >
                          {item.status === 'UNRESOLVED'
                            ? 'UNRESOLVED'
                            : 'RESOLVED'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            title={
                              item.status === 'UNRESOLVED'
                                ? 'Mark as resolved'
                                : 'Mark as unresolved'
                            }
                            onClick={async () => {
                              const newStatus =
                                item.status === 'UNRESOLVED'
                                  ? 'RESOLVED'
                                  : 'UNRESOLVED';
                              const confirmMessage =
                                newStatus === 'RESOLVED'
                                  ? 'Are you sure you want to mark this inquiry as RESOLVED?'
                                  : 'Are you sure you want to mark this inquiry as UNRESOLVED?';
                              if (!window.confirm(confirmMessage)) return;
                              await toggleResolvedStatus(
                                item.id,
                                newStatus as 'RESOLVED' | 'UNRESOLVED'
                              );
                            }}
                            className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                          >
                            {item.status === 'UNRESOLVED'
                              ? 'Resolve'
                              : 'Unresolve'}
                          </button>
                          <button
                            title="More details"
                            className="px-3 py-1 cursor-pointer bg-gray-50 text-gray-700 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                            onClick={() => {
                              console.log('Selected Inquiry:', item);
                              setSelectedInquiry(item);
                              setDetailOpen(true);
                              console.log('Detail Opened:', detailOpen);
                            }}
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                            <span>More</span>
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
                  of <span className="font-semibold">{totalCount}</span>{' '}
                  inquiries
                  {searchTerm && (
                    <span className="ml-2 text-gray-500">
                      (filtered by "{searchTerm}")
                    </span>
                  )}
                  {statusFilter !== 'ALL' && (
                    <span className="ml-2 text-gray-500">
                      (status: {statusFilter})
                    </span>
                  )}
                </p>

                {totalPages > 1 && (
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
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {galleryOpen && (
          <GalleryOpenModal
            galleryImages={galleryImages}
            onClose={closeGallery}
            galleryOpen={galleryOpen}
            gidx={galleryIndex}
          />
        )}
        {detailOpen && selectedInquiry && (
          <InquiryDetails
            selectedInquiry={selectedInquiry}
            onClose={() => setDetailOpen(false)}
            openGalleryFromDetail={(images: string[], idx: number) => {
              setGalleryOpenedFromDetail(true);
              setDetailOpen(false);
              setGalleryImages(images);
              setGalleryIndex(idx);
              setGalleryOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inquiries;
