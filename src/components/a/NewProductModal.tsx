import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../../helpers/cloudinay';
import productRequests from '../../utils/requests/productRequests';
import type { NewProductValues } from '../../types/product';

interface Category {
  id: number;
  name: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required'),
  moq: Yup.number()
    .typeError('MOQ must be a number')
    .required('MOQ is required'),
  description: Yup.string().required('Description is required'),
  categoryId: Yup.number()
    .typeError('Please select a category')
    .min(1, 'Please select a category')
    .required('Category is required'),
  images: Yup.array()
    .of(Yup.mixed())
    .min(1, 'Upload at least one image')
    .required('Upload at least one image'),
  imagesTouched: Yup.boolean(),
});

const NewProductModal = ({
  onClose,
  categories,
}: {
  onClose: () => void;
  categories: Category[];
}) => {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (values: NewProductValues) => {
    delete values.imagesTouched;
    try {
      setUploading(true);
      toast.loading('Uploading images...');

      const uploadedUrls = await Promise.all(
        values.images.map(async (img: File) => {
          const { url } = await uploadImageToCloudinary(img);
          return url;
        })
      );

      toast.dismiss();
      toast.loading('Saving product...');

      const finalData = { ...values, images: uploadedUrls };
      console.log('A', finalData);

      const response = await productRequests.newProductRequest(finalData);
      console.log(response);
      toast.dismiss();
      if (response.success) {
        toast.success('✅ Product added successfully!');
        onClose();
      } else {
        toast.error(response.message || 'Failed to add product');
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-[#e67e22]">
            Add New Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <Formik<NewProductValues>
          initialValues={{
            name: '',
            price: 0,
            moq: 1,
            description: '',
            images: [],
            categoryId: 0,
            customAttr: [{ key: '', value: '' }],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
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
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22]"
                  />
                  {errors.moq && touched.moq && (
                    <p className="text-red-500 text-sm mt-1">{errors.moq}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                  name="categoryId"
                  value={values.categoryId}
                  onChange={(e) =>
                    setFieldValue('categoryId', Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                >
                  <option value={0}>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

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
                <Field
                  as="textarea"
                  name="description"
                  rows={5}
                  placeholder="Enter detailed description..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#e67e22] focus:outline-none resize-y text-gray-800"
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
                      const updatedImages = values.images
                        ? [...values.images, ...newFiles]
                        : newFiles;

                      setFieldValue('images', updatedImages);

                      setFieldValue('imagesTouched', true);

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

                {values.images && values.images.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">
                      {values.images.length} image(s) selected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {values.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={
                              typeof img === 'string'
                                ? img
                                : URL.createObjectURL(img)
                            }
                            alt={`preview-${idx}`}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const filteredImages = values.images.filter(
                                (_, i) => i !== idx
                              );
                              setFieldValue('images', filteredImages);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
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
                      {values.customAttr.map((attr, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                        >
                          <Field
                            name={`customAttr.${index}.key`}
                            placeholder="e.g. Size"
                            className="border border-gray-300 rounded-lg p-2"
                          />
                          <Field
                            name={`customAttr.${index}.value`}
                            placeholder="e.g. 10x20"
                            className="border border-gray-300 rounded-lg p-2"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ key: '', value: '' })}
                        className="text-sm text-[#e67e22] hover:underline"
                      >
                        + Add Attribute
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                    uploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#e67e22] hover:bg-[#cf711f]'
                  }`}
                >
                  {uploading ? 'Uploading...' : 'Save Product'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewProductModal;
