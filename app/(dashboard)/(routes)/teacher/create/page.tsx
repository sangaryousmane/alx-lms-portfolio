import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
    FormMessage,
    FormLabel,
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,

} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';

const formSchema = z.object({
    title: z.string().min(1, 
        { message: 'Title is required' }),

});
const CreateCoursePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    });

    const { isSubmitting, isValid } = form.formState;
   
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        try {
            const response = await axios.post('/api/course', values);
            router.push(`/teacher/courses/${response.data.id}`);

        } catch (error) {
            toast.error("Something went wrong");
        }
    }  

    return ( 
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'> Name your course</h1>
                <p className='text-sm text-slate-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium consequatur tempora autem numquam nostrum, ex suscipit, magni quas ab non provident vitae eos inventore mollitia illum? Ipsam eos minus unde?
                </p>

                <Form {...form}>
                    <form 
                       onSubmit={form.handleSubmit(onSubmit)}
                       className='space-y-8 mt-8'>
                        <FormField 
                        control={form.control}
                        name='title'
                        render={({ field }) =>(
                            <FormItem>
                                <FormLabel>Course Title</FormLabel>
                                <FormControl>
                                    <Input 
                                      disabled={isSubmitting}
                                      placeholder="e.g. 'Advance web development' "
                                      {...field}/>
                                </FormControl>

                                <FormDescription>
                                    What are you teaching in this course?
                                </FormDescription>
                            </FormItem>
                        )}/>

                        <div className='flex items-center gap-x-2'>
                            <Link href='/'>
                               <Button variant='ghost' type='button'></Button>
                            </Link>

                            <Button 
                               type='submit' 
                               disabled={!isValid || isSubmitting}> Continue </Button>
                        </div>
                    </form>
                </Form>
            </div>
            Create Course
        </div>
     );
}
 
export default CreateCoursePage;