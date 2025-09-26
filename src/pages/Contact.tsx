import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
    <Card className="max-w-2xl w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">Contact UBlood</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg text-muted-foreground">
        <p>
          Have questions, feedback, or need support? Reach out to our team and we’ll get back to you as soon as possible.
        </p>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full border rounded px-3 py-2" required />
          <input type="email" placeholder="Your Email" className="w-full border rounded px-3 py-2" required />
          <textarea placeholder="Your Message" className="w-full border rounded px-3 py-2" rows={4} required />
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </CardContent>
    </Card>
  </div>
);

export default Contact;
