import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Route, Switch, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  Calendar, 
  BookOpen, 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  UserPlus
} from "lucide-react";
import InventoryManagement from "./inventory";
import AppointmentManagement from "./appointment-management";
import CourseManagement from "./course-management";
import UserManagement from "./user-management";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  
  // Set default path if we're at the root admin page
  if (location === '/admin') {
    setLocation('/admin/dashboard');
    return null;
  }
  
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main content */}
        <div className="flex-1">
          <Switch>
            <Route path="/admin/dashboard" component={DashboardOverview} />
            <Route path="/admin/inventory" component={InventoryManagement} />
            <Route path="/admin/appointments" component={AppointmentManagement} />
            <Route path="/admin/courses" component={CourseManagement} />
            <Route path="/admin/users" component={UserManagement} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

function AdminSidebar() {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  const menuItems = [
    { 
      path: '/admin/dashboard', 
      label: t('admin.dashboard'), 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: '/admin/inventory', 
      label: t('admin.inventory'), 
      icon: <Package className="h-5 w-5" /> 
    },
    { 
      path: '/admin/appointments', 
      label: t('admin.appointments'), 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      path: '/admin/courses', 
      label: t('admin.courses'), 
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      path: '/admin/users', 
      label: t('admin.users'), 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      path: '/admin/settings', 
      label: t('admin.settings'), 
      icon: <Settings className="h-5 w-5" /> 
    }
  ];
  
  return (
    <div className="w-full lg:w-64 shrink-0">
      <Card>
        <CardContent className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}>
                  {item.icon}
                  <span className="ml-3 rtl:mr-3 rtl:ml-0">{item.label}</span>
                </a>
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardOverview() {
  const { t, i18n } = useTranslation();
  
  const stats = [
    {
      title: t('admin.revenue'),
      value: i18n.language === 'en' ? '$12,450' : '46,687 ر.س',
      change: '+8%',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: t('admin.clients'),
      value: '78',
      change: '+12%',
      icon: <UserPlus className="h-4 w-4" />
    },
    {
      title: t('admin.orders'),
      value: '23',
      change: '+5%',
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      title: t('admin.appointments'),
      value: '24',
      change: '+3%',
      icon: <Calendar className="h-4 w-4" />
    }
  ];
  
  // Mock chart data
  const revenueData = [
    { 
      name: t('january'), 
      revenue: 4000,
    },
    { 
      name: t('february'), 
      revenue: 5000,
    },
    { 
      name: t('march'), 
      revenue: 3000,
    },
    { 
      name: t('april'), 
      revenue: 7000,
    },
    { 
      name: t('may'), 
      revenue: 5000,
    },
    { 
      name: t('june'), 
      revenue: 8000,
    }
  ];
  
  const salesByCategory = [
    { 
      name: t('ecommerce.sensory'), 
      value: 45,
    },
    { 
      name: t('ecommerce.educational'), 
      value: 30,
    },
    { 
      name: t('ecommerce.communication'), 
      value: 25,
    }
  ];
  
  const appointmentsByType = [
    { 
      name: t('appointments.initialConsultation'), 
      count: 20,
    },
    { 
      name: t('appointments.therapySession'), 
      count: 35,
    },
    { 
      name: t('appointments.followUp'), 
      count: 15,
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" /> 
                  {stat.change} {t('admin.thisMonth')}
                </p>
              </div>
              <div className="rounded-full p-3 bg-primary/10 text-primary">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.revenueChart')}</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={revenueData}
              index="name"
              categories={["revenue"]}
              colors={["primary"]}
              yAxisWidth={40}
              showLegend={false}
              showXAxis={true}
              showYAxis={true}
              showGridLines={true}
              valueFormatter={(value) => 
                `${i18n.language === 'en' ? '$' : ''}${value}${i18n.language === 'ar' ? ' ر.س' : ''}`
              }
            />
          </CardContent>
        </Card>
        
        {/* Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.salesByCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={salesByCategory}
              index="name"
              category="value"
              valueFormatter={(value) => `${value}%`}
              colors={["primary", "accent", "muted"]}
              className="h-80"
            />
          </CardContent>
        </Card>
        
        {/* Appointments Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('admin.appointmentsByType')}</CardTitle>
            <Link href="/admin/appointments">
              <Button variant="outline" size="sm">
                {t('admin.viewAll')}
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <BarChart
              data={appointmentsByType}
              index="name"
              categories={["count"]}
              colors={["primary"]}
              valueFormatter={(value) => `${value}`}
              showLegend={false}
              showXAxis={true}
              showYAxis={true}
              showGridLines={true}
              yAxisWidth={30}
            />
          </CardContent>
        </Card>
        
        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('admin.recentActivities')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start pb-4 last:pb-0 last:border-0 border-b border-gray-200 dark:border-gray-700">
                  <div className={`rounded-full p-2 mr-3 rtl:mr-0 rtl:ml-3 ${
                    i % 3 === 0 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : i % 3 === 1
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  }`}>
                    {i % 3 === 0 ? (
                      <ShoppingCart className="h-4 w-4" />
                    ) : i % 3 === 1 ? (
                      <Calendar className="h-4 w-4" />
                    ) : (
                      <UserPlus className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {i % 3 === 0 
                        ? t('admin.newOrder', { id: 100 + i }) 
                        : i % 3 === 1 
                          ? t('admin.newAppointment') 
                          : t('admin.newClient')
                      }
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {i === 1 
                        ? t('admin.justNow') 
                        : i === 2 
                          ? t('admin.minutesAgo', { minutes: 5 }) 
                          : t('admin.hoursAgo', { hours: i - 2 })
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
