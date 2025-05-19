import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  CalendarClock,
  GraduationCap,
  Users,
  LayoutDashboard
} from 'lucide-react';

type AdminSection = 'inventory' | 'appointments' | 'courses' | 'users' | 'dashboard';

interface SidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const { t } = useTranslation();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0" /> 
    },
    { 
      id: 'inventory', 
      label: 'inventoryManagement', 
      icon: <Package className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0" /> 
    },
    { 
      id: 'appointments', 
      label: 'appointmentManagement', 
      icon: <CalendarClock className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0" /> 
    },
    { 
      id: 'courses', 
      label: 'courseManagement', 
      icon: <GraduationCap className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0" /> 
    },
    { 
      id: 'users', 
      label: 'userManagement', 
      icon: <Users className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0" /> 
    }
  ];

  return (
    <Card className="bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-medium">{t('adminMenu')}</h3>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex items-center w-full justify-start px-4 py-2 mb-1 ${
              activeSection === item.id
                ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                : ''
            }`}
            onClick={() => onSectionChange(item.id as AdminSection)}
          >
            {item.icon}
            <span>{t(item.label)}</span>
          </Button>
        ))}
      </nav>
    </Card>
  );
};

export default Sidebar;
