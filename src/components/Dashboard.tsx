import { useGetDashboardStatsQuery } from "../features/api/eshopApi";
import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const { data: stats, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // if (isError || !stats) {
  //   return (
  //     <div className="text-center py-8 text-red-600">
  //       Failed to load dashboard data
  //     </div>
  //   );
  // }

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
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Orders",
      value: dummyStats.totalOrders,
      icon: ShoppingBagIcon,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Customers",
      value: dummyStats.totalCustomers,
      icon: UserGroupIcon,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Monthly Growth",
      value: `${dummyStats.monthlyGrowth}%`,
      icon: ArrowTrendingUpIcon,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className=" w-full flex overflow-hidden p-4 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {statsCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className={`${card.bgColor} text-black p-4 shadow-md hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${card.iconColor} flex-shrink-0`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                    {card.title}
                  </h2>
                  <p className="text-xl font-bold">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
