import { useGetDashboardStatsQuery } from "../app/api/eshopApi";
import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import SalesDiagram from "./ui/SalesDiagram";

const Dashboard: React.FC = () => {
  const { data: stats, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-gray-500 text-lg font-medium animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  // Dummy stats data for display
  const dummyStats = {
    totalSales: 12500,
    totalOrders: 245,
    totalCustomers: 180,
    monthlyGrowth: 12.5,
  };

  const statsCards = [
    {
      title: "Total Sales",
      value: `$${dummyStats.totalSales.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      bgColor: "bg-gradient-to-br from-green-100 to-green-200",
      iconColor: "text-green-700",
    },
    {
      title: "Total Orders",
      value: dummyStats.totalOrders,
      icon: ShoppingBagIcon,
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
      iconColor: "text-blue-700",
    },
    {
      title: "Total Customers",
      value: dummyStats.totalCustomers,
      icon: UserGroupIcon,
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
      iconColor: "text-purple-700",
    },
    {
      title: "Monthly Growth",
      value: `${dummyStats.monthlyGrowth}%`,
      icon: ArrowTrendingUpIcon,
      bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      iconColor: "text-emerald-700",
    },
  ];

  const sampleData = [
    { date: "2025-01-01", amount: 1200 },
    { date: "2025-02-01", amount: 1500 },
    { date: "2025-03-01", amount: 1800 },
    { date: "2025-04-01", amount: 2000 },
    { date: "2025-05-01", amount: 1700 },
  ];

  return (
    <div className="bg-gray-50  pt-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`${card.bgColor} rounded-xl p-6  hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`${card.iconColor} flex-shrink-0 p-3 bg-white rounded-full `}
                  >
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium uppercase tracking-wider text-gray-600">
                      {card.title}
                    </h2>
                    <p className="text-2xl font-extrabold text-gray-900 mt-1">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <SalesDiagram salesData={sampleData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
