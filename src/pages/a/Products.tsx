import { useEffect, useState } from 'react';
import NewProductModal from '../../components/a/NewProductModal';
import productRequests from '../../utils/requests/productRequests';
import toast, { Toaster } from 'react-hot-toast';
import type { ProductData } from '../../types/product';
import type { QueryOptions } from '../../types/heroAd';
import { Edit, Plus } from 'lucide-react';
import EditProductModal from '../../components/a/EditProductModal';
import { FaEye } from 'react-icons/fa';

interface Category {
  id: number;
  name: string;
}

interface ProductStatusData extends ProductData {
  status: boolean;
}

const Products = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductData>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleStatusToggle = async (product: any, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, status: newStatus } : p,
      ),
    );

    try {
      const response = await productRequests.updateProductStatusRequest(
        product.id,
        newStatus,
      );

      if (response.success) {
        toast.success(
          `Product "${product.name}" status changed to ${
            newStatus ? 'Active' : 'Inactive'
          }.`,
        );
      } else {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, status: currentStatus } : p,
          ),
        );
        throw new Error('Failed to update status on server.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product status');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = (p.name || '').toLowerCase();
    const cat = (p.category?.name || '').toLowerCase();
    return name.includes(q) || cat.includes(q);
  });

  const getStatusBadge = (product: ProductStatusData, status: boolean) => {
    return (
      <button
        type="button"
        onClick={() => {
          handleStatusToggle(product, status);
        }}
        className={`${
          status ? 'bg-[#e67e22]' : 'bg-gray-400'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e67e22] focus:ring-offset-2`}
        role="switch"
        aria-checked={status}
      >
        <span className="sr-only">Toggle Status</span>
        <span
          aria-hidden="true"
          className={`${
            status ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-5">
      <Toaster
        position="top-right"
        containerStyle={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
        }}
      />{' '}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <div className="flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                Products
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Manage your products catalog and inventory
              </p>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or categories..."
                className="flex-1 lg:flex-none w-full lg:w-64 px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e67e22]/30"
              />
            </div>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 bg-[#e67e22] hover:bg-[#d35400] text-white px-3 py-1.5 rounded-md font-semibold text-sm transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e67e22]"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
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
                      <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Product
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Category
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Price
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Views
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Attributes
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-right p-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((product, index) => {
                      const currentImageIndex = getProductImageIndex(
                        String(product.id) || index.toString(),
                      );
                      const productImages = product.images || [];

                      return (
                        <tr
                          key={product.id || index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-3">
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
                                        className="w-8 h-8 rounded-lg border-2 border-white object-cover"
                                        onError={(e) => {
                                          e.currentTarget.src =
                                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxMk0xNiAyMCIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                                        }}
                                        loading="lazy"
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
                                          newIndex,
                                        );
                                      }}
                                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-[#e67e22] z-10"
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
                                          newIndex,
                                        );
                                      }}
                                      className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-[#e67e22] z-10"
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
                                            idx,
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
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category?.name || 'Uncategorized'}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-gray-900">
                              ${product.price}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <FaEye className="text-gray-400 w-4 h-4" />
                              <span className="text-gray-900 font-medium">
                                {(product as any).views || 0}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
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
                          <td className="p-3">
                            {getStatusBadge(
                              product as ProductStatusData,
                              product.status || false,
                            )}{' '}
                          </td>
                          <td className="p-3">
                            <div className="flex justify-end gap-2">
                              <button
                                title="Edit"
                                className="p-2 cursor-pointer text-gray-400 hover:text-[#e67e22] hover:bg-orange-50 rounded-lg transition-colors"
                                onClick={() => {
                                  setProductToEdit(product);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

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
      {isEditModalOpen && (
        <EditProductModal
          onClose={() => {
            setIsEditModalOpen(false);
            fetchProducts();
          }}
          product={productToEdit}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Products;
