import { Button } from "@/components/ui/button";
import { DashboardLayout } from "./(dashboard)/layout";

export default function Home() {
 
  return (
   <div>
       <DashboardLayout children/>

       <Button variant="destructive">Click Me</Button>
   </div>

  )
}
