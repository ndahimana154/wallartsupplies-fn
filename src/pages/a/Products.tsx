import { useEffect, useState } from 'react';
import NewProductModal from '../../components/a/NewProductModal';
import productRequests from '../../utils/requests/productRequests';
import toast, { Toaster } from 'react-hot-toast';
import type { ProductData } from '../../types/product';
import type { QueryOptions } from '../../types/heroAd';
import { Plus } from 'lucide-react';

interface Category {
  id: number;
  name: string;
}

const Products = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndices, setCurrentImageIndices] = useState<{
    [key: string]: number;
  }>({});

  const setProductImageIndex = (productId: string, index: number) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  const getProductImageIndex = (productId: string) => {
    return currentImageIndices[productId] || 0;
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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productRequests.getProducts();

      if (response.success === true) {
        setProducts(response.data || []);
        return;
      }
      throw new Error('An unknown error occurred.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const getStatusBadge = (status: boolean) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {status ? (
          <>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
            Active
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></span>
            Inactive
          </>
        )}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Products
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your product catalog and inventory
              </p>
            </div>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <Plus />
              Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-orange-900 mt-1">
                    {products.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Active Products
                  </p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {products.filter((p) => p.status).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    {categories.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-800">
                    Avg. Price
                  </p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">
                    $
                    {(
                      products.reduce((acc, p) => acc + p.price, 0) /
                      (products.length || 1)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
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
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first product.
              </p>
              <button
                onClick={() => setIsNewModalOpen(true)}
                className="bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Add Product
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Product
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Category
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Price
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Attributes
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
                    {products.map((product, index) => {
                      const currentImageIndex = getProductImageIndex(
                        String(product.id) || index.toString()
                      );
                      const productImages = product.images || [];

                      return (
                        <tr
                          key={product.id || index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-20 h-8 group">
                                <div className="flex space-x-0 overflow-hidden">
                                  {productImages.map((img, idx) => (
                                    <div
                                      key={idx}
                                      className="flex-shrink-0 transition-transform duration-300 ease-in-out"
                                      style={{
                                        transform: `translateX(-${
                                          currentImageIndex * 32
                                        }px)`,
                                        width: '32px',
                                      }}
                                    >
                                      <img
                                        src={
                                          typeof img === 'string'
                                            ? img
                                            : URL.createObjectURL(img)
                                        }
                                        alt={`Product image ${idx + 1}`}
                                        className="w-8 h-8 rounded-lg border-2 border-white object-cover shadow-sm"
                                        onError={(e) => {
                                          // Fallback for broken images
                                          e.currentTarget.src =
                                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxMk0xNiAyMCIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>

                                {productImages.length > 1 && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const newIndex =
                                          currentImageIndex === 0
                                            ? productImages.length - 1
                                            : currentImageIndex - 1;
                                        setProductImageIndex(
                                          String(product.id) ||
                                            index.toString(),
                                          newIndex
                                        );
                                      }}
                                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-[#e67e22] z-10"
                                    >
                                      ‹
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const newIndex =
                                          currentImageIndex ===
                                          productImages.length - 1
                                            ? 0
                                            : currentImageIndex + 1;
                                        setProductImageIndex(
                                          String(product.id) ||
                                            index.toString(),
                                          newIndex
                                        );
                                      }}
                                      className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-[#e67e22] z-10"
                                    >
                                      ›
                                    </button>
                                  </>
                                )}

                                {productImages.length > 1 && (
                                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                                    {productImages.map((_, idx) => (
                                      <button
                                        key={idx}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setProductImageIndex(
                                            String(product.id) ||
                                              index.toString(),
                                            idx
                                          );
                                        }}
                                        className={`w-1 h-1 rounded-full transition-all ${
                                          idx === currentImageIndex
                                            ? 'bg-[#e67e22]'
                                            : 'bg-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category?.name || 'Uncategorized'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-gray-900">
                              ${product.price}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {(product.customAttr || [])
                                ?.slice(0, 2)
                                .map((attr, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                                  >
                                    {attr.key}: {attr.value}
                                  </span>
                                ))}
                              {product.customAttr &&
                                product.customAttr.length > 2 && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-500">
                                    +{product.customAttr.length - 2} more
                                  </span>
                                )}
                            </div>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(product.status || false)}
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <button
                                title="Edit"
                                className="p-2 text-gray-400 hover:text-[#e67e22] hover:bg-orange-50 rounded-lg transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                title="Delete"
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-semibold">{products.length}</span>{' '}
                    products
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Previous
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isNewModalOpen && (
        <NewProductModal
          onClose={() => {
            setIsNewModalOpen(false);
            fetchProducts();
          }}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Products;
