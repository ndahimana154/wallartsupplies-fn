import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { useState } from 'react';
import type { NewCategoryValues } from '../../types/product';
import productRequests from '../../utils/requests/productRequests';
import { uploadImageToCloudinary } from '../../helpers/cloudinay';
import SeoSetup from '../SeoSetup';
import { Image } from 'lucide-react';

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Category name is required'),
  image: Yup.mixed().required('Category image is required'),
});

interface Props {
  onClose: () => void;
}

const NewCategoryModal = ({ onClose }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = async (
    values: NewCategoryValues,
    { resetForm }: any
  ) => {
    try {
      setUploading(true);
      toast.loading('Uploading image...');

      const { url } = await uploadImageToCloudinary(values.image);
      const finalValues = {
        name: values.name,
        image: url,
      };

      toast.dismiss();
      toast.loading('Saving category...');

      const response = await productRequests.newCategoryRequest(finalValues);
      toast.dismiss();

      if (response?.success) {
        toast.success('Category added successfully!');
        resetForm();
        setPreviewImage(null);
        setTimeout(onClose, 1000);
      } else {
        toast.error(response?.message || 'Failed to create category.');
      }
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setFieldValue('image', file);

      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const removeImage = (setFieldValue: any) => {
    setFieldValue('image', '');
    setPreviewImage(null);

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <SeoSetup mainData={{ title: 'New category' }} />
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

        <Formik<NewCategoryValues>
          initialValues={{ name: '', image: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched, isSubmitting, values }) => (
            <Form className="space-y-5">
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

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Category Image
                </label>

                {!previewImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#e67e22] transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer block"
                    >
                      <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium mb-1">
                        Click to upload image
                      </p>
                      <p className="text-gray-400 text-sm">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={previewImage}
                      alt="Category preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.currentTarget.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyOE00MCA1MiIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(setFieldValue)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {values?.image instanceof File
                        ? values.image.name
                        : 'Selected image'}
                    </div>
                  </div>
                )}

                {errors.image && touched.image && (
                  <p className="text-red-500 text-sm mt-2">
                    {String(errors.image)}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                  disabled={isSubmitting || uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploading || !values.image}
                  className="px-5 py-2 cursor-pointer rounded-lg bg-[#e67e22] text-white font-medium hover:bg-[#cf711f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || uploading ? 'Saving...' : 'Save Category'}
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
