import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../../helpers/cloudinay';
import type { NewHeroAdApiValues, iHeroAds } from '../../types/heroAd';
import heroAdsRequests from '../../utils/requests/heroAdsRequests';
import SeoSetup from '../SeoSetup';
import { Image } from 'lucide-react';

interface FormValues {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  image: File | string | null;
}

// Fix the validation schema for image
const validationSchema = Yup.object({
  title: Yup.string()
    .required('Hero ad title is required')
    .min(5, 'Title should be at least 5 characters')
    .max(60, 'Title should not exceed 60 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description should be at least 20 characters')
    .max(200, 'Description should not exceed 200 characters'),
  buttonText: Yup.string()
    .required('Button text is required')
    .max(25, 'Button text should not exceed 25 characters'),
  link: Yup.string()
    .required('Link is required')
    .url('Please enter a valid URL'),
  image: Yup.mixed()
    .required('Upload an image first')
    .test('fileSize', 'File too large', (value) => {
      if (!value) return false; // No image at all
      if (typeof value === 'string') return true; // Existing image URL is fine
      if (value instanceof File) return value.size <= 10 * 1024 * 1024; // 10MB
      return false;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return false;
      if (typeof value === 'string') return true; // Existing image URL is fine
      if (value instanceof File) {
        return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
      }
      return false;
    }),
});

interface EditHeroAdsProps {
  onClose: () => void;
  ad: iHeroAds | undefined;
}

const EditHeroAdsModal = ({ onClose, ad }: EditHeroAdsProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
    setFieldValue('image', null);
    setPreviewImage(null);

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      let imageUrl = values.image;

      // Only upload if it's a new file
      if (values.image instanceof File) {
        setUploading(true);
        toast.loading('Uploading image...');
        const { url } = await uploadImageToCloudinary(values.image);
        imageUrl = url;
        toast.dismiss();
      }

      toast.loading('Saving Ad...');

      const finalData: NewHeroAdApiValues = {
        title: values.title,
        description: values.description,
        buttonText: values.buttonText,
        link: values.link,
        image: imageUrl as string, // Ensure it's string for API
      };

      const response = await heroAdsRequests.updateHeroAdRequest(
        Number(ad?.id),
        finalData
      );

      toast.dismiss();
      if (response.success) {
        toast.success('✅ Hero Ad updated successfully!');
        onClose();
      } else {
        toast.error(response.message || 'Failed to add Hero Ad');
      }
    } catch (error: any) {
      toast.dismiss();
      console.error('Error submitting Ad:', error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
      );
    } finally {
      setUploading(false);
    }
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
      <SeoSetup mainData={{ title: 'New Hero Ad' }} />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-[#e67e22]">
            Edit Ad "{ad?.title}"
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <Formik<FormValues>
          initialValues={{
            title: ad?.title || '',
            description: ad?.description || '',
            buttonText: ad?.buttonText || '',
            link: ad?.link || '',
            image: ad?.image || null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched, isValid, dirty }) => (
            <Form className="space-y-5">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <Field
                  name="title"
                  placeholder="Enter hero ad title"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Description
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    {values.description.length}/200 characters
                  </span>
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={4}
                  placeholder="Enter compelling description for your hero banner..."
                  className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#e67e22] focus:outline-none resize-y text-gray-800 ${
                    values.description.length > 200
                      ? 'border-red-300'
                      : values.description.length > 150
                      ? 'border-yellow-300'
                      : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.description && touched.description ? (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  ) : (
                    <div />
                  )}
                  <span
                    className={`text-sm ${
                      values.description.length > 200
                        ? 'text-red-500 font-medium'
                        : values.description.length > 180
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }`}
                  >
                    {200 - values.description.length} characters remaining
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Hero Ad Image
                </label>

                {previewImage ? (
                  <div className="relative group">
                    <img
                      src={previewImage}
                      alt="Hero Ad preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
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
                        : 'New image selected'}
                    </div>
                  </div>
                ) : values.image && typeof values.image === 'string' ? (
                  <div className="relative group">
                    <img
                      src={values.image}
                      alt={`Current: ${String(ad?.title)}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.currentTarget.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyOE00MCA1MiIgc3Ryb2tlPSIjOEM5M0FBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Current image
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const fileInput = document.getElementById(
                            'image-upload'
                          ) as HTMLInputElement;
                          if (fileInput) {
                            fileInput.click();
                          }
                        }}
                        className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                        title="Replace image"
                      >
                        ↻
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue('image', null);
                          setPreviewImage(null);
                        }}
                        className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ) : (
                  // Show upload area
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
                )}

                {/* Hidden file input for the replace functionality */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="hidden"
                  id="image-upload"
                />

                {errors.image && touched.image && (
                  <p className="text-red-500 text-sm mt-2">
                    {String(errors.image)}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Button text</label>
                <Field
                  name="buttonText"
                  placeholder="Enter hero ad  Button text"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                />
                {errors.buttonText && touched.buttonText && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.buttonText}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Link</label>
                <Field
                  name="link"
                  placeholder="Enter hero ad  Link"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                />
                {errors.link && touched.link && (
                  <p className="text-red-500 text-sm mt-1">{errors.link}</p>
                )}
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
                  className={`px-5 py-2 cursor-pointer rounded-lg text-white font-medium transition ${
                    uploading || !isValid || !dirty
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#e67e22] hover:bg-[#cf711f]'
                  }`}
                >
                  {uploading ? 'Uploading...' : 'Save Hero Ad'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditHeroAdsModal;
