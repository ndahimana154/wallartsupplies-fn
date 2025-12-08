import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
const InquiryDetails = ({
  selectedInquiry,
  onClose,
  openGalleryFromDetail,
}: any) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-3xl w-full mx-4 bg-white rounded-xl shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedInquiry.fullNames}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: {selectedInquiry.id} •{' '}
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <button
                  onClick={onClose}
                  className="p-2 rounded bg-gray-50 hover:bg-gray-100"
                >
                  <XIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                  {selectedInquiry.projectDescription ||
                    'No description provided.'}
                </p>

                {selectedInquiry.images &&
                  selectedInquiry.images.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Images
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedInquiry.images.map((img: any, i: number) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              openGalleryFromDetail &&
                              openGalleryFromDetail(selectedInquiry.images, i)
                            }
                            className="w-24 h-24 rounded overflow-hidden border"
                          >
                            <img
                              src={img}
                              alt={`img-${i}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <div className="md:col-span-1">
                <h5 className="text-sm font-medium text-gray-700">Contact</h5>
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    {selectedInquiry.email}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium">Phone:</span>{' '}
                    {selectedInquiry.phone}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Status:</span>{' '}
                    {selectedInquiry.status}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default InquiryDetails;
