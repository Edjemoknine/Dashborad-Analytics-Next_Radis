import React from "react";
import { analytics } from "../utils/analytics";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { getDate } from "../utils";

const Analytics = async () => {
  const TrackingDays = 7;
  const pageviews = await analytics.retrieveDays("pageview", TrackingDays);

  const totalPageViews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);
  const avgVisitorsPerDay = (totalPageViews / TrackingDays).toFixed(1);
  const amtVistorssToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => {
          return acc + Object.values(curr)[0]!;
        }, 0)
      );
    }, 0);
  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard avgVisitorsPerDay={avgVisitorsPerDay} />
      </div>
    </div>
  );
};

export default Analytics;
