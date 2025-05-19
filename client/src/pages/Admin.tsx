import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import Sidebar from '@/components/admin/Sidebar';
import InventoryManagement from '@/components/admin/InventoryManagement';
import AppointmentManagement from '@/components/admin/AppointmentManagement';
import CourseManagement from '@/components/admin/CourseManagement';
import UserManagement from '@/components/admin/UserManagement';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Users, DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet';

type AdminSection = 'inventory' | 'appointments' | 'courses' | 'users' | 'dashboard';

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const renderAdminContent = () => {
    switch (activeSection) {
      case 'inventory':
        return <InventoryManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('siteName')} - {t('admin')}</title>
        <meta name="description" content="Admin dashboard to manage inventory, appointments, courses, and users." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 fade-in">
        <h1 className="text-3xl font-bold mb-8">{t('adminDashboard')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-4">
            {renderAdminContent()}
          </div>
        </div>
      </div>
    </>
  );
};

// Admin Dashboard Component
const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4 rtl:ml-4 rtl:mr-0">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{t('revenue')}</p>
                <h3 className="text-2xl font-bold">
                  {language === 'ar' ? '46,687 ر.س' : '$12,450'}
                </h3>
                <p className="text-green-600 dark:text-green-400 text-sm flex items-center">
                  <span className="material-icons text-sm">arrow_upward</span>
                  <span>8% {t('thisMonth')}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Clients Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary mr-4 rtl:ml-4 rtl:mr-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{t('clients')}</p>
                <h3 className="text-2xl font-bold">78</h3>
                <p className="text-green-600 dark:text-green-400 text-sm flex items-center">
                  <span className="material-icons text-sm">arrow_upward</span>
                  <span>12% {t('thisMonth')}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Appointments Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent/10 text-accent mr-4 rtl:ml-4 rtl:mr-0">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{t('appointments')}</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-green-600 dark:text-green-400 text-sm flex items-center">
                  <span className="material-icons text-sm">arrow_upward</span>
                  <span>5% {t('thisWeek')}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
          <p className="text-muted-foreground mb-4">
            Use the sidebar to manage various aspects of the Autism Center:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Inventory Management:</strong> Add, edit, and remove products</li>
            <li><strong>Appointment Management:</strong> View and manage upcoming appointments</li>
            <li><strong>Course Management:</strong> Add and update course content</li>
            <li><strong>User Management:</strong> Manage user accounts and roles</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
