import { useEffect, useState } from 'react';
import NewCategoryModal from '../../components/a/NewCategoryModal';
import productRequests from '../../utils/requests/productRequests';
import toast, { Toaster } from 'react-hot-toast';
import type { CategoryData } from '../../types/product';
import { Edit, Trash } from 'lucide-react';

const Categories = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await productRequests.getCategories();

      if (response.success === true) {
        setCategories(response.data.data);
        return;
      }
      throw new Error('An unknown error occured.');
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-[#e67e22] tracking-tight">
            Recent Categories
          </h3>
          <p className="text-gray-500 text-sm">
            Your latest added or updated items appear here.
          </p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="cursor-pointer text-sm sm:text-base text-white bg-[#e67e22] px-5 py-2.5 rounded-lg hover:bg-[#cf711f] active:scale-95 transition-all font-medium shadow-sm"
        >
          + Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead className="bg-gradient-to-r from-[#e67e22]/10 to-[#e67e22]/5 sticky top-0">
            <tr className="text-left border-b border-gray-100">
              <th className="p-3 font-semibold text-gray-700">#</th>
              <th className="p-3 font-semibold text-gray-700">Category</th>
              <th className="p-3 font-semibold text-gray-700 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-[#e67e22]/5 transition-all duration-200"
              >
                <td className="p-3 font-medium text-gray-800">{++idx}</td>
                <td className="p-3 font-medium text-gray-800">
                  {category.name}
                </td>

                <td className="p-3 flex justify-center gap-3 text-gray-500">
                  <button
                    title="Edit"
                    className="hover:text-[#e67e22] transition-colors duration-200"
                  >
                    <Edit />
                  </button>
                  <button
                    title="Delete"
                    className="hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Showing{' '}
        <span className="font-medium text-[#e67e22]">{categories.length}</span>{' '}
        recent products.
      </p>
      {isNewModalOpen && (
        <NewCategoryModal
          onClose={() => {
            fetchCategories();
            setIsNewModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Categories;
