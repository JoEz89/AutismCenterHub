import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, FileSymlink } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    date: Date;
    timeSlot: TimeSlot;
    type: string;
  } | null;
  isConfirmed: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  appointment, 
  isConfirmed 
}) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  if (!appointment) return null;

  const formatDate = (date: Date) => {
    return format(date, 'PPP', { locale: language === 'ar' ? ar : enUS });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {isConfirmed ? (
          <>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-xl mb-2">
                {t('appointmentConfirmed')}
              </DialogTitle>
              <p className="text-center text-muted-foreground mb-6">
                {t('zoomLinkMessage')}
              </p>
              
              <div className="bg-muted w-full p-4 rounded-lg mb-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3 rtl:ml-3 rtl:mr-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('date')}</p>
                      <p className="font-medium">{formatDate(appointment.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3 rtl:ml-3 rtl:mr-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('time')}</p>
                      <p className="font-medium">{appointment.timeSlot.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FileSymlink className="h-5 w-5 text-primary mr-3 rtl:ml-3 rtl:mr-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('type')}</p>
                      <p className="font-medium">{t(`${appointment.type}`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={onClose} className="w-full">
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t('confirmAppointment')}</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-muted-foreground mb-4">
                {language === 'ar'
                  ? 'هل أنت متأكد من رغبتك في تأكيد موعدك في التاريخ والوقت التاليين؟'
                  : 'Are you sure you want to confirm your appointment at the following date and time?'}
              </p>
              
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('date')}:</span>
                  <span className="font-medium">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('time')}:</span>
                  <span className="font-medium">{appointment.timeSlot.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('type')}:</span>
                  <span className="font-medium">{t(`${appointment.type}`)}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row sm:space-x-2 rtl:space-x-reverse">
              <DialogClose asChild>
                <Button variant="outline" className="mb-2 sm:mb-0">
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </DialogClose>
              <Button type="submit">
                {t('confirmAppointment')}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
