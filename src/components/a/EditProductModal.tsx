import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../../helpers/cloudinay';
import productRequests from '../../utils/requests/productRequests';
import type { NewProductApiValues, ProductData } from '../../types/product';
import RichTextEditor from '../RichTextEditor';

interface Category {
  id: number;
  name: string;
}

interface CustomAttribute {
  key: string;
  value: string;
}

interface FormValues {
  name: string;
  price: number;
  moq: number;
  description: string;
  images: (File | string)[];
  categoryId: number;
  customAttr: CustomAttribute[];
}

const validationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  moq: Yup.number()
    .typeError('MOQ must be a number')
    .positive('MOQ must be positive')
    .integer('MOQ must be a whole number')
    .required('MOQ is required'),
  description: Yup.string().required('Description is required'),
  categoryId: Yup.number()
    .typeError('Please select a category')
    .min(1, 'Please select a category')
    .required('Category is required'),
  images: Yup.array()
    .of(
      Yup.mixed().test('is-valid-image', 'Invalid image', (value) => {
        if (!value) return false;

        if (typeof value === 'string') return true;

        if (value instanceof File) {
          return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
        }
        return false;
      })
    )
    .min(1, 'Upload at least one image')
    .required('Upload at least one image'),
});

const EditProductModal = ({
  onClose,
  categories,
  product,
}: {
  onClose: () => void;
  categories: Category[];
  product: ProductData;
}) => {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setUploading(true);
      toast.loading('Processing images...');

      const existingImageUrls: string[] = [];
      const newImageFiles: File[] = [];

      values.images.forEach((img) => {
        if (typeof img === 'string') {
          existingImageUrls.push(img);
        } else if (img instanceof File) {
          newImageFiles.push(img);
        }
      });

      let uploadedUrls: string[] = [];
      if (newImageFiles.length > 0) {
        toast.loading(`Uploading ${newImageFiles.length} new image(s)...`);
        uploadedUrls = await Promise.all(
          newImageFiles.map(async (img: File) => {
            const { url } = await uploadImageToCloudinary(img);
            return url;
          })
        );
      }

      const allImageUrls = [...existingImageUrls, ...uploadedUrls];

      toast.dismiss();
      toast.loading('Updating product...');

      const cleanedCustomAttr = values.customAttr
        .filter(
          (attr: CustomAttribute) =>
            attr.key.trim() !== '' && attr.value.trim() !== ''
        )
        .map((attr: CustomAttribute) => ({
          key: attr.key.trim(),
          value: attr.value.trim(),
        }));

      const finalData: NewProductApiValues = {
        name: values.name.trim(),
        price: Number(values.price),
        moq: Number(values.moq),
        description: values.description.trim(),
        categoryId: Number(values.categoryId),
        images: allImageUrls,
        customAttr: cleanedCustomAttr,
      };

      const response = await productRequests.updateProductRequest(
        product.id,
        finalData
      );

      toast.dismiss();
      if (response.success) {
        toast.success('✅ Product updated successfully!');
        onClose();
      } else {
        toast.error(response.message || 'Failed to update product');
      }
    } catch (error: any) {
      toast.dismiss();
      console.error('Error updating product:', error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
      );
    } finally {
      setUploading(false);
    }
  };

  const getImageSrc = (img: File | string): string => {
    if (typeof img === 'string') {
      return img;
    }
    return URL.createObjectURL(img);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Toaster
        position="top-right"
        containerStyle={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
        }}
      />{' '}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-[#e67e22]">
            Edit Product: {product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <Formik<FormValues>
          initialValues={{
            name: product.name,
            price: product.price,
            moq: product.moq,
            description: product.description,
            images: product.images as (File | string)[], // Cast to accept both types
            categoryId: Number(product.categoryId),
            customAttr: product.customAttr,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched, isValid, dirty }) => (
            <Form className="space-y-5">
              <div>
                <label className="block font-medium mb-1">Product Name</label>
                <Field
                  name="name"
                  placeholder="Enter product name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Price (Min)</label>
                  <Field
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22]"
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">MOQ</label>
                  <Field
                    type="number"
                    name="moq"
                    min="1"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22]"
                  />
                  {errors.moq && touched.moq && (
                    <p className="text-red-500 text-sm mt-1">{errors.moq}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Category</label>
                <Field
                  as="select"
                  name="categoryId"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                >
                  <option value={0}>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                {errors.categoryId && touched.categoryId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categoryId}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Description
                </label>
                <RichTextEditor
                  value={values.description}
                  onChange={(description: string) =>
                    setFieldValue('description', description)
                  }
                  placeholder="Enter product description"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Product Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const newFiles = Array.from(e.target.files);
                      const updatedImages = [...values.images, ...newFiles];
                      setFieldValue('images', updatedImages);
                      e.target.value = '';
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22]"
                />

                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.images)}
                  </p>
                )}

                {values.images.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">
                      {values.images.length} image(s) selected
                      <span className="text-xs text-gray-400 ml-2">
                        (Existing images + new uploads)
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {values.images.map(
                        (img: File | string, index: number) => (
                          <div key={index} className="relative group">
                            <img
                              src={getImageSrc(img)}
                              alt={`preview-${index}`}
                              className="w-20 h-20 object-cover rounded-lg border"
                              onError={(e) => {
                                // Fallback for image preview errors
                                e.currentTarget.src =
                                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyOE00MCA1MiIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                              {typeof img === 'string' ? 'Existing' : 'New'}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const filteredImages = values.images.filter(
                                  (_, i) => i !== index
                                );
                                setFieldValue('images', filteredImages);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Custom Attributes
                </label>
                <FieldArray name="customAttr">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      {values.customAttr.map((_, index: number) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                        >
                          <Field
                            name={`customAttr.${index}.key`}
                            placeholder="e.g. Size"
                            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                          />
                          <Field
                            name={`customAttr.${index}.value`}
                            placeholder="e.g. 10x20"
                            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                          />
                          {values.customAttr.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ key: '', value: '' })}
                        className="text-sm text-[#e67e22] hover:text-[#cf711f] font-medium flex items-center gap-1"
                      >
                        <span>+</span> Add Attribute
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !isValid || !dirty}
                  className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                    uploading || !isValid || !dirty
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#e67e22] hover:bg-[#cf711f]'
                  }`}
                >
                  {uploading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProductModal;
