import { PageLayout } from "@/layouts";
import { Card, CardContent, CardDescription, CardTitle } from "@/components";
import { CheckCircle2, Settings, MessageSquare, Mic, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../../images/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: "Unlimited Chats",
      description: "Full chat functionality with any AI provider",
      status: "unlocked",
    },
    {
      icon: Sparkles,
      title: "All Languages",
      description: "Get responses in French, German, Spanish, or any language",
      status: "unlocked",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speech-to-text with your own API keys",
      status: "unlocked",
    },
    {
      icon: Settings,
      title: "Custom Shortcuts",
      description: "Fully customizable keyboard shortcuts",
      status: "unlocked",
    },
  ];

  return (
    <PageLayout
      title="Dashboard"
      description="Koios - All features unlocked. Your free, open-source AI assistant."
    >
      {/* Welcome Card */}
      <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <img src={logoImage} alt="Koios" className="size-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Welcome to Koios!</CardTitle>
              <CardDescription>All features are unlocked - no license required</CardDescription>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure your AI provider in <button onClick={() => navigate("/dev-space")} className="text-primary hover:underline font-medium">Dev Space</button> to get started. 
            Set your preferred response language in <button onClick={() => navigate("/responses")} className="text-primary hover:underline font-medium">Responses</button>.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="hover:border-primary/30 transition-colors">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">{feature.title}</CardTitle>
                  <CheckCircle2 className="size-4 text-green-500" />
                </div>
                <CardDescription className="text-xs mt-1">{feature.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
