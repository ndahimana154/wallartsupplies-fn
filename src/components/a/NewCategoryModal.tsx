import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import type { NewCategoryValues } from '../../types/product';
import productRequests from '../../utils/requests/productRequests';

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Category name is required'),
});

interface Props {
  onClose: () => void;
}

const NewCategoryModal = ({ onClose }: Props) => {
  const handleSubmit = async (
    values: NewCategoryValues,
    { resetForm }: any
  ) => {
    try {
      const response = await productRequests.newCategoryRequest(values);

      if (response?.success) {
        toast.success('Category added successfully!');
        resetForm();
        setTimeout(onClose, 1000);
      } else {
        toast.error(response?.message || 'Failed to create category.');
      }
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Toaster position="top-right" />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh] animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-[#e67e22]">
            Add New Category
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <Formik<NewCategoryValues>
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium mb-1 text-gray-700"
                >
                  Category Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter category name"
                  className={`w-full border ${
                    errors.name && touched.name
                      ? 'border-red-400'
                      : 'border-gray-300'
                  } rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 cursor-pointer rounded-lg bg-[#e67e22] text-white font-medium hover:bg-[#cf711f] transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewCategoryModal;
