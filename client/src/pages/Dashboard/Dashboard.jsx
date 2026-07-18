import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Activity, Users, FileText, AlertCircle } from 'lucide-react';
import { TableWrapper, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/TableWrapper';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }
};

export default function Dashboard() {
  return (
    <motion.div 
      className="w-full flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <PageHeader 
          title="Overview" 
          description="Here's what's happening in your network today." 
        />
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={itemVariants}>
        <StatsCard 
          title="Total Referrals" 
          value="1,248" 
          description="+12.5% from last month"
          icon={<Activity className="h-6 w-6" />}
        />
        <StatsCard 
          title="Active Patients" 
          value="84" 
          description="+4 since yesterday"
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard 
          title="Pending Reports" 
          value="12" 
          description="Needs your attention"
          icon={<FileText className="h-6 w-6" />}
        />
        <StatsCard 
          title="Critical Alerts" 
          value="3" 
          description="Requires immediate action"
          icon={<AlertCircle className="h-6 w-6 text-destructive" />}
        />
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7" variants={itemVariants}>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Referral Analytics</CardTitle>
            <CardDescription>Daily referral volume over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-t border-dashed bg-muted/10 m-6 rounded-b">
            <p className="text-muted-foreground">Chart Placeholder</p>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <TableWrapper>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1,2,3,4,5].map(i => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">Referral</TableCell>
                    <TableCell>Patient John Doe assigned</TableCell>
                    <TableCell className="text-right">10m ago</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableWrapper>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
