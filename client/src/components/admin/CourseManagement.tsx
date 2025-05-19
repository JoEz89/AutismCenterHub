import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { courses } from '@/data/courses';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CourseManagement: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isAddCourseOpen, setIsAddCourseOpen] = React.useState(false);
  const [editingCourse, setEditingCourse] = React.useState<number | null>(null);
  
  const handleEditCourse = (id: number) => {
    setEditingCourse(id);
    setIsAddCourseOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('courseManagement')}</h2>
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>{t('addCourse')}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingCourse !== null ? t('editCourse') : t('addCourse')}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">
                    {language === 'ar' ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
                  </Label>
                  <Input id="title" placeholder="Course title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="titleAr">
                    {language === 'ar' ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
                  </Label>
                  <Input id="titleAr" placeholder="عنوان الدورة" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="instructor">
                    {language === 'ar' ? 'المدرب (بالإنجليزية)' : 'Instructor (English)'}
                  </Label>
                  <Input id="instructor" placeholder="Instructor name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="instructorAr">
                    {language === 'ar' ? 'المدرب (بالعربية)' : 'Instructor (Arabic)'}
                  </Label>
                  <Input id="instructorAr" placeholder="اسم المدرب" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">
                    {language === 'ar' ? 'المدة (بالإنجليزية)' : 'Duration (English)'}
                  </Label>
                  <Input id="duration" placeholder="e.g., 8 weeks" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="durationAr">
                    {language === 'ar' ? 'المدة (بالعربية)' : 'Duration (Arabic)'}
                  </Label>
                  <Input id="durationAr" placeholder="مثال: 8 أسابيع" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="level">
                    {language === 'ar' ? 'المستوى (بالإنجليزية)' : 'Level (English)'}
                  </Label>
                  <Input id="level" placeholder="e.g., Beginners" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="levelAr">
                    {language === 'ar' ? 'المستوى (بالعربية)' : 'Level (Arabic)'}
                  </Label>
                  <Input id="levelAr" placeholder="مثال: مبتدئين" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">
                  {language === 'ar' ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
                </Label>
                <Textarea id="description" placeholder="Course description" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="descriptionAr">
                  {language === 'ar' ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
                </Label>
                <Textarea id="descriptionAr" placeholder="وصف الدورة" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">
                  {language === 'ar' ? 'رابط الصورة' : 'Image URL'}
                </Label>
                <Input id="image" placeholder="https://example.com/image.jpg" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </DialogClose>
              <Button type="submit">
                {editingCourse !== null 
                  ? (language === 'ar' ? 'تحديث' : 'Update') 
                  : (language === 'ar' ? 'إضافة' : 'Add')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('courses.title')}</TableHead>
                <TableHead>{t('courses.instructor')}</TableHead>
                <TableHead>{t('courses.duration')}</TableHead>
                <TableHead>{t('courses.level')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    {language === 'ar' ? course.titleAr : course.title}
                  </TableCell>
                  <TableCell>
                    {language === 'ar' ? course.instructorAr : course.instructor}
                  </TableCell>
                  <TableCell>
                    {language === 'ar' ? course.durationAr : course.duration}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {language === 'ar' ? course.levelAr : course.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCourse(course.id)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">{t('editCourse')}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
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
  );
};

export default CourseManagement;
