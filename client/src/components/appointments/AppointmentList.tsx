import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video } from 'lucide-react';

interface Appointment {
  id: number;
  patient: string;
  patientAr: string;
  date: string;
  time: string;
  type: string;
  typeAr: string;
  status: string;
  statusAr: string;
  zoomLink: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  onReschedule: (id: number) => void;
  onCancel: (id: number) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onReschedule,
  onCancel
}) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('upcomingAppointments')}</CardTitle>
        <CardDescription>
          {appointments.length === 0 
            ? t('noAppointments') 
            : appointments.length === 1 
              ? '1 upcoming appointment' 
              : `${appointments.length} upcoming appointments`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">{t('noAppointments')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground">
                    {language === 'ar' ? appointment.patientAr : appointment.patient}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {language === 'ar' ? appointment.statusAr : appointment.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  {language === 'ar' ? appointment.typeAr : appointment.type}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  <span>{appointment.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  <span>{appointment.time}</span>
                </div>
                {appointment.zoomLink && (
                  <div className="flex items-center text-sm text-primary mb-4">
                    <Video className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    <a 
                      href={appointment.zoomLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {language === 'ar' ? 'انضم إلى مكالمة زوم' : 'Join Zoom Meeting'}
                    </a>
                  </div>
                )}
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onReschedule(appointment.id)}
                  >
                    {t('reschedule')}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onCancel(appointment.id)}
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
