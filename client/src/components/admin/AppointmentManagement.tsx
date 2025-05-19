import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { CalendarCheck, Edit, XCircle } from 'lucide-react';

// Mock appointments data
const appointments = [
  { 
    id: 1, 
    patient: "Alex Morgan", 
    patientAr: "أليكس مورغان", 
    date: "2023-08-10", 
    time: "10:00 AM", 
    type: "Initial Consultation", 
    typeAr: "استشارة أولية", 
    status: "Confirmed", 
    statusAr: "مؤكد",
    zoomLink: "https://zoom.us/j/123456789"
  },
  { 
    id: 2, 
    patient: "Jamie Smith", 
    patientAr: "جيمي سميث", 
    date: "2023-08-12", 
    time: "2:30 PM", 
    type: "Therapy Session", 
    typeAr: "جلسة علاجية", 
    status: "Confirmed", 
    statusAr: "مؤكد",
    zoomLink: "https://zoom.us/j/987654321"
  },
  { 
    id: 3, 
    patient: "Robin Lee", 
    patientAr: "روبن لي", 
    date: "2023-08-15", 
    time: "9:15 AM", 
    type: "Follow-up", 
    typeAr: "متابعة", 
    status: "Pending", 
    statusAr: "قيد الانتظار",
    zoomLink: ""
  },
  { 
    id: 4, 
    patient: "Taylor Kim", 
    patientAr: "تايلور كيم", 
    date: "2023-08-17", 
    time: "11:45 AM", 
    type: "Initial Consultation", 
    typeAr: "استشارة أولية", 
    status: "Pending", 
    statusAr: "قيد الانتظار",
    zoomLink: ""
  }
];

const AppointmentManagement: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{t('appointmentManagement')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarCheck className="mr-2 h-5 w-5" />
              {language === 'ar' ? 'التقويم' : 'Calendar'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        {/* Appointments List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'المواعيد القادمة' : 'Upcoming Appointments'}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('patients')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('time')}</TableHead>
                  <TableHead>{t('type')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      {language === 'ar' ? appointment.patientAr : appointment.patient}
                    </TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      {language === 'ar' ? appointment.typeAr : appointment.type}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={appointment.status === 'Confirmed' ? 'default' : 'outline'}
                      >
                        {language === 'ar' ? appointment.statusAr : appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentManagement;
