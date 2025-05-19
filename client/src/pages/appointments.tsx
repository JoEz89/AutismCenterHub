import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarCheck, Clock, Video, CalendarX, CalendarClock, CheckCircle2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

// Mock appointment slots
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
  const currentDate = new Date(now);
  
  // Generate slots for next 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + day);
    
    // Generate time slots for each day (9AM to 5PM)
    for (let hour = 9; hour <= 17; hour += 1) {
      // Skip lunch break
      if (hour === 13) continue;
      
      // Random availability
      const isAvailable = Math.random() > 0.3;
      
      slots.push({
        id: `${date.toISOString().split('T')[0]}-${hour}`,
        date: date.toISOString().split('T')[0],
        time: `${String(hour).padStart(2, '0')}:00`,
        available: isAvailable,
      });
    }
  }
  
  return slots;
};

// Mock appointment data
const appointmentSlots = generateTimeSlots();

// Mock existing appointments
const existingAppointments = [
  {
    id: 1,
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
    time: "10:00",
    type: "initialConsultation",
    status: "confirmed",
    zoomLink: "https://zoom.us/j/123456789",
    zoomPassword: "123456"
  }
];

export default function Appointments() {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("initialConsultation");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAppointmentConfirmed, setIsAppointmentConfirmed] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState(existingAppointments);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Get available time slots for selected date
  const availableTimeSlots = selectedDate 
    ? appointmentSlots.filter(
        slot => slot.date === format(selectedDate, 'yyyy-MM-dd') && slot.available
      )
    : [];

  // Format date based on locale
  const formatDateForDisplay = (date: Date) => {
    return format(date, 'PPP', { 
      locale: i18n.language === 'ar' ? ar : enUS 
    });
  };

  // Handle booking appointment
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    setShowConfirmation(true);
  };

  // Confirm appointment
  const confirmAppointment = () => {
    setShowConfirmation(false);
    
    // Add the new appointment to the list
    const newAppointment = {
      id: Date.now(),
      date: format(selectedDate!, 'yyyy-MM-dd'),
      time: selectedTimeSlot!,
      type: selectedType,
      status: "confirmed",
      zoomLink: "https://zoom.us/j/987654321",
      zoomPassword: "654321"
    };
    
    setUpcomingAppointments([...upcomingAppointments, newAppointment]);
    setIsAppointmentConfirmed(true);
    
    // Reset selection
    setSelectedTimeSlot(null);
  };

  // Cancel appointment
  const cancelAppointment = (id: number) => {
    setUpcomingAppointments(upcomingAppointments.filter(appointment => appointment.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t('appointments.title')}</h1>
      
      {isAppointmentConfirmed ? (
        <AppointmentConfirmed 
          setIsAppointmentConfirmed={setIsAppointmentConfirmed}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  {t('appointments.bookNew')}
                </h2>
                
                {/* Calendar */}
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
                    {t('appointments.selectDate')}
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={{ before: new Date() }}
                      locale={i18n.language === 'ar' ? ar : enUS}
                      className="mx-auto"
                    />
                  </div>
                </div>
                
                {/* Time Slots */}
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
                    {t('appointments.selectTime')}
                  </h3>
                  
                  {availableTimeSlots.length === 0 ? (
                    <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                      {selectedDate 
                        ? t('appointments.noAvailableTimes') 
                        : t('appointments.selectDateFirst')}
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {availableTimeSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className="justify-center"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Appointment Type */}
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
                    {t('appointments.appointmentType')}
                  </h3>
                  <RadioGroup 
                    value={selectedType} 
                    onValueChange={setSelectedType}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="initialConsultation" id="initialConsultation" />
                      <Label htmlFor="initialConsultation">
                        {t('appointments.initialConsultation')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="therapySession" id="therapySession" />
                      <Label htmlFor="therapySession">
                        {t('appointments.therapySession')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="followUp" id="followUp" />
                      <Label htmlFor="followUp">
                        {t('appointments.followUp')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Appointment Details (if date and time are selected) */}
                {selectedDate && selectedTimeSlot && (
                  <div className="mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
                      {t('appointments.appointmentDetails')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CalendarCheck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('appointments.date')}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {formatDateForDisplay(selectedDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('appointments.time')}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedTimeSlot}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Video className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('appointments.type')}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {t(`appointments.${selectedType}`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="w-full"
                >
                  {t('appointments.book')}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Appointments */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  {t('appointments.upcomingAppointments')}
                </h2>
                
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('appointments.noAppointments')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900">
                            {t(`appointments.${appointment.status}`)}
                          </Badge>
                          <Badge variant="outline">
                            {t(`appointments.${appointment.type}`)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center">
                            <CalendarCheck className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {format(new Date(appointment.date), 'PPP', { 
                                locale: i18n.language === 'ar' ? ar : enUS 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {appointment.time}
                            </span>
                          </div>
                          {appointment.zoomLink && (
                            <div className="flex items-center">
                              <Video className="h-4 w-4 text-primary mr-2 rtl:mr-0 rtl:ml-2" />
                              <a 
                                href={appointment.zoomLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm text-primary hover:underline"
                              >
                                {t('appointments.joinZoom')}
                              </a>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                          >
                            {t('appointments.reschedule')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            {t('appointments.cancel')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal/Drawer */}
      {isMobile ? (
        <Drawer open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('appointments.confirmAppointment')}</DrawerTitle>
              <DrawerDescription>
                {t('appointments.confirmDescription')}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <AppointmentConfirmationContent 
                selectedDate={selectedDate!} 
                selectedTimeSlot={selectedTimeSlot!} 
                selectedType={selectedType}
              />
            </div>
            <DrawerFooter className="flex flex-row justify-end gap-3">
              <DrawerClose asChild>
                <Button variant="outline">{t('cancel')}</Button>
              </DrawerClose>
              <Button onClick={confirmAppointment}>{t('confirm')}</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('appointments.confirmAppointment')}</DialogTitle>
              <DialogDescription>
                {t('appointments.confirmDescription')}
              </DialogDescription>
            </DialogHeader>
            <AppointmentConfirmationContent 
              selectedDate={selectedDate!} 
              selectedTimeSlot={selectedTimeSlot!} 
              selectedType={selectedType}
            />
            <DialogFooter className="flex flex-row justify-end gap-3 sm:gap-0">
              <DialogClose asChild>
                <Button variant="outline">{t('cancel')}</Button>
              </DialogClose>
              <Button onClick={confirmAppointment}>{t('confirm')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Appointment Confirmation Content
function AppointmentConfirmationContent({ selectedDate, selectedTimeSlot, selectedType }: any) {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarCheck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('appointments.date')}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {format(selectedDate, 'PPP', { 
              locale: i18n.language === 'ar' ? ar : enUS 
            })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('appointments.time')}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">{selectedTimeSlot}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Video className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('appointments.type')}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {t(`appointments.${selectedType}`)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Appointment Confirmed Component
function AppointmentConfirmed({ setIsAppointmentConfirmed }: { setIsAppointmentConfirmed: (value: boolean) => void }) {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardContent className="pt-6 pb-8 px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('appointments.appointmentConfirmed')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('appointments.confirmationMessage')}
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                {t('appointments.zoomLink')}:
              </span>
              <a 
                href="https://zoom.us/j/987654321" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline font-medium"
              >
                https://zoom.us/j/987654321
              </a>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {t('appointments.passcode')}:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">654321</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={() => setIsAppointmentConfirmed(false)}>
              <CalendarClock className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
              {t('appointments.scheduleAnother')}
            </Button>
            <Button onClick={() => window.open('https://zoom.us/j/987654321', '_blank')}>
              <Video className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
              {t('appointments.joinZoom')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
