import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="max-w-sm">
        <CardHeader>
          <Image className="round-lg"
            src="https://images.pexels.com/photos/27880451/pexels-photo-27880451/free-photo-of-woman-in-dress-standing-on-pier-on-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="img"
            width={500}
            height={500}
            priority />
        </CardHeader>

      </Card>
    </main>
  );
}
