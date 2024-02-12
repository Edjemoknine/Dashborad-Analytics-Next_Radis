"use client";

import { Card } from "@tremor/react";
import React from "react";
interface AnalyticsDashbordProps {
  avgVisitorsPerDay: string;
}
const AnalyticsDashboard = ({ avgVisitorsPerDay }: AnalyticsDashbordProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className=" grid grid-cols-1 md:grid-cols-2 w-full mx-auto gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitor/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
