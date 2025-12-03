import { useEffect, useState } from 'react';
import NewCategoryModal from '../../components/a/NewCategoryModal';
import productRequests from '../../utils/requests/productRequests';
import toast, { Toaster } from 'react-hot-toast';
import type { CategoriesFilters, CategoryData } from '../../types/product';
import {
  Edit,
  Image as ImageIcon,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import SeoSetup from '../../components/SeoSetup';
import EditCategoryModal from '../../components/a/EditCategoryModal';
import type { QueryOptions } from '../../types/heroAd';

const Categories = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [catToEdit, setCatToEdit] = useState<CategoryData>();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 10;

  const fetchCategories = async (page: number = 1, search: string = '') => {
    try {
      setLoading(true);

      const filters: CategoriesFilters = {};
      if (search) {
        filters.name = search;
      }

      const queries: QueryOptions = {
        page,
        limit,
        sortBy: 'updatedAt',
        order: 'DESC',
      };

      const response = await productRequests.getCategories(filters, queries);

      if (response.success === true) {
        setCategories(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalCount(response.data.pagination?.total || 0);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error: any) {
      toast.error(error.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(1, '');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCategories(1, searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchCategories(1, '');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchCategories(newPage, searchTerm);
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
      <SeoSetup mainData={{ title: 'Admin Categories list' }} />
      <Toaster position="top-right" />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Categories Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your product categories and organization
            </p>
          </div>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-2 bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Category
          </button>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories by name..."
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
                  Total Categories
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
                  Active Categories
                </p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {categories.length}
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
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No categories found' : 'No categories found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? 'Try adjusting your search terms or clear the search to see all categories.'
                : 'Get started by creating your first product category.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsNewModalOpen(true)}
                className="bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Create Category
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
                    <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider w-16">
                      #
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Category Details
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="text-right p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categories.map((category, index) => (
                    <tr
                      key={category.id || index}
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
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAxNk0yNCAzMiIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {category.name}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                              ID: {category.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          /{category.slug}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            title="Edit Category"
                            className="p-2 text-gray-400 cursor-pointer hover:text-[#e67e22] hover:bg-orange-50 rounded-lg transition-colors group-hover:scale-105"
                            onClick={() => {
                              setIsEditOpen(true);
                              setCatToEdit(category);
                            }}
                          >
                            <Edit className="w-4 h-4" />
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
                  categories
                  {searchTerm && (
                    <span className="ml-2 text-gray-500">
                      (filtered by "{searchTerm}")
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

      {isNewModalOpen && (
        <NewCategoryModal
          onClose={() => {
            fetchCategories(currentPage, searchTerm);
            setIsNewModalOpen(false);
          }}
        />
      )}

      {isEditOpen && catToEdit && (
        <EditCategoryModal
          category={catToEdit}
          onClose={() => {
            fetchCategories(currentPage, searchTerm);
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Categories;
