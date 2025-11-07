import { FaBox, FaChartBar, FaTags, FaShoppingBag } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-[#e67e22] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage your products, categories, and orders — all in one beautiful
          dashboard.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Products', value: 128, icon: <FaBox /> },
          { label: 'Orders', value: 54, icon: <FaShoppingBag /> },
          { label: 'Categories', value: 6, icon: <FaTags /> },
          { label: 'Visitors', value: '2.1K', icon: <FaChartBar /> },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="group bg-gradient-to-br from-[#e67e22]/10 to-[#e67e22]/5 p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center gap-4 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-3 bg-[#e67e22]/20 rounded-full text-[#e67e22] text-2xl group-hover:bg-[#e67e22]/30 transition">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#e67e22]">
            Recent Products
          </h3>
          <button className="text-sm text-white bg-[#e67e22] px-4 py-2 rounded-lg hover:bg-[#cf711f] transition">
            + Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-left border-b">
                <th className="p-3 font-medium">Product</th>
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium">Stock</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'Abstract Wall Painting',
                  category: 'Art',
                  stock: 20,
                  price: '$45.00',
                  status: 'Active',
                },
                {
                  name: 'Canvas Landscape',
                  category: 'Decor',
                  stock: 10,
                  price: '$80.00',
                  status: 'Active',
                },
                {
                  name: 'Modern Frame',
                  category: 'Frames',
                  stock: 0,
                  price: '$25.00',
                  status: 'Out of Stock',
                },
              ].map((product, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-[#e67e22]/5 transition-all duration-200"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.price}</td>
                  <td
                    className={`p-3 font-medium ${
                      product.status === 'Active'
                        ? 'text-[#e67e22]'
                        : 'text-red-500'
                    }`}
                  >
                    {product.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
