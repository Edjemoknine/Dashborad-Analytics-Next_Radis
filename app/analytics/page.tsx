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

  const topCountryisMap = new Map<string, number>();

  for (let i = 0; i < pageviews.length; i++) {
    const day = pageviews[i];
    if (!day) continue;

    for (let j = 0; j < day.events.length; j++) {
      const event = day.events[j];
      if (!event) continue;

      const key = Object.keys(event)[0]!;
      const value = Object.values(event)[0]!;
      const parseKey = JSON.parse(key);

      const country = parseKey?.country;
      if (country) {
        if (topCountryisMap.has(country)) {
          const prev = topCountryisMap.get(country)!;
          topCountryisMap.set(country, prev + value);
        } else {
          topCountryisMap.set(country, value);
        }
      }
    }
  }

  const TopCountries = [...topCountryisMap.entries()]
    .sort((a, b) => {
      if (a[1] > b[1]) return -1;
      else return 1;
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          topCountries={TopCountries}
          timeseriousviews={pageviews}
          amtVistorssToday={amtVistorssToday}
          avgVisitorsPerDay={avgVisitorsPerDay}
        />
      </div>
    </div>
  );
};

export default Analytics;
