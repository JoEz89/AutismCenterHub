import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

interface AppointmentFormProps {
  onBookAppointment: (date: Date, timeSlot: TimeSlot, type: string) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onBookAppointment }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [appointmentType, setAppointmentType] = useState('initialConsultation');

  // Mock available time slots
  const timeSlots: TimeSlot[] = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:30 AM', available: true },
    { id: 3, time: '12:00 PM', available: false },
    { id: 4, time: '01:30 PM', available: true },
    { id: 5, time: '03:00 PM', available: true },
    { id: 6, time: '04:30 PM', available: false },
    { id: 7, time: '06:00 PM', available: true }
  ];

  const availableTimeSlots = timeSlots.filter(slot => slot.available);

  const handleSubmit = () => {
    if (selectedDate && selectedTimeSlot) {
      onBookAppointment(selectedDate, selectedTimeSlot, appointmentType);
    }
  };

  const formatDate = (date: Date) => {
    return format(date, 'PPP', { locale: language === 'ar' ? ar : enUS });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('scheduleAppointment')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">{t('selectDate')}</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
            locale={language === 'ar' ? ar : enUS}
            disabled={(date) => date < new Date()}
          />
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">{t('availableTimes')}</h3>
          <div className="grid grid-cols-3 gap-3">
            {availableTimeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={selectedTimeSlot?.id === slot.id ? 'default' : 'outline'}
                onClick={() => setSelectedTimeSlot(slot)}
                disabled={!slot.available}
              >
                {slot.time}
              </Button>
            ))}
          </div>
        </div>

        {/* Appointment Type */}
        <div>
          <h3 className="text-lg font-medium mb-4">{t('appointmentType')}</h3>
          <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="initialConsultation" id="initialConsultation" />
              <Label htmlFor="initialConsultation">{t('initialConsultation')}</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="therapySession" id="therapySession" />
              <Label htmlFor="therapySession">{t('therapySession')}</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="followUp" id="followUp" />
              <Label htmlFor="followUp">{t('followUp')}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Appointment Summary */}
        {selectedDate && selectedTimeSlot && (
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">{t('appointmentDetails')}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">{t('date')}:</span>
              <span className="font-medium">{formatDate(selectedDate)}</span>
              <span className="text-muted-foreground">{t('time')}:</span>
              <span className="font-medium">{selectedTimeSlot.time}</span>
              <span className="text-muted-foreground">{t('type')}:</span>
              <span className="font-medium">{t(`${appointmentType}`)}</span>
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          disabled={!selectedDate || !selectedTimeSlot}
          onClick={handleSubmit}
        >
          {t('bookAppointment')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
