import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
    <Card className="max-w-2xl w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg text-muted-foreground">
        <div className="space-y-2">
          <div><span className="font-semibold">Name:</span> John Doe</div>
          <div><span className="font-semibold">Blood Type:</span> O+</div>
          <div><span className="font-semibold">Last Donation:</span> July 2025</div>
        </div>
        <Button className="w-full">Edit Profile</Button>
      </CardContent>
    </Card>
  </div>
);

export default Profile;
