import { useEffect, useState } from 'react';
import NewCategoryModal from '../../components/a/NewCategoryModal';
import productRequests from '../../utils/requests/productRequests';
import toast, { Toaster } from 'react-hot-toast';
import type { CategoriesFilters, CategoryData } from '../../types/product';
import { Edit, Image as ImageIcon, Plus, Search } from 'lucide-react';
import SeoSetup from '../../components/SeoSetup';
import EditCategoryModal from '../../components/a/EditCategoryModal';
import type { QueryOptions } from '../../types/heroAd';

const Categories = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [catToEdit, setCatToEdit] = useState<CategoryData>();
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategories = async (search: string = '') => {
    try {
      setLoading(true);

      const filters: CategoriesFilters = {};
      if (search) {
        filters.name = search;
      }

      const queries: QueryOptions = {
        sortBy: 'updatedAt',
        order: 'DESC',
      };

      const response = await productRequests.getCategories(filters, queries);

      if (response.success === true) {
        setCategories(response.data.data || []);
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
    fetchCategories('');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCategories(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchCategories('');
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-5">
      <SeoSetup mainData={{ title: 'Admin Categories list' }} />
      <Toaster position="top-right" />

      <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
              Categories
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage your product categories and organization
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="w-full lg:w-auto lg:flex lg:items-center lg:gap-2"
          >
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-2 mt-2 lg:mt-0">
              <button
                type="submit"
                className="bg-[#e67e22] cursor-pointer text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#d35400] transition-colors whitespace-nowrap"
              >
                Search
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="bg-gray-500 cursor-pointer text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-2 bg-[#e67e22] hover:bg-[#d35400] text-white px-3 py-1.5 rounded-md font-semibold transition-all duration-200 active:scale-95 text-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
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
                    <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider w-16">
                      #
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                      Category Details
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
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
                      <td className="p-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg font-semibold text-gray-600 text-sm">
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAxNk0yNCAzMiIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                              }}
                              loading="lazy"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {category.name}
                            </h3>
                            <p className="text-gray-500 text-xs mt-1">
                              ID: {category.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          /{category.slug}
                        </span>
                      </td>
                      <td className="p-3">
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
          </>
        )}
      </div>

      {isNewModalOpen && (
        <NewCategoryModal
          onClose={() => {
            fetchCategories(searchTerm);
            setIsNewModalOpen(false);
          }}
        />
      )}

      {isEditOpen && catToEdit && (
        <EditCategoryModal
          category={catToEdit}
          onClose={() => {
            fetchCategories(searchTerm);
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Categories;
