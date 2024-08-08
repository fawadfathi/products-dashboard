import DashboradCard from "@/components/dashboard/DashboradCard";
import { Folder, MessageCircle, Newspaper, Users } from "lucide-react";

import AnalyticsChart from "@/components/dashboard/Analytics";

export default async function Home() {
  return (
    <>
      <div className="flex flex-clo md:flex-row justify-between gap-5 mb-5">
        <DashboradCard
          title="Posts"
          count={100}
          icon={<Newspaper className="text-slate-500" size={40} />}
        />
        <DashboradCard
          title="Categores"
          count={12}
          icon={<Folder className="text-slate-500" size={40} />}
        />
        <DashboradCard
          title="Users "
          count={75}
          icon={<Users className="text-slate-500" size={40} />}
        />
        <DashboradCard
          title="Comments"
          count={1200}
          icon={<MessageCircle className="text-slate-500" size={40} />}
        />
      </div>
      <AnalyticsChart />
    </>
  );
}
