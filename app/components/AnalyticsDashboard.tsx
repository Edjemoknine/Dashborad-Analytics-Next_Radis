"use client";

import { Card, BarChart } from "@tremor/react";
import React from "react";
import { analytics } from "../utils/analytics";
import { ReactCountryFlag } from "react-country-flag";
interface AnalyticsDashbordProps {
  avgVisitorsPerDay: string;
  amtVistorssToday: number;
  timeseriousviews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
}
const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVistorssToday,
  timeseriousviews,
  topCountries,
}: AnalyticsDashbordProps) => {
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
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            visitors Today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amtVistorssToday}
          </p>
        </Card>
      </div>
      <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
        <h2 className="w-full text-dark-tremor-content-strong text-center sm:text-left font-semibold text-xl">
          This weeks top visitors
        </h2>
        <div className="col-span-3 flex items-center justify-between flex-wrap gap-8">
          {topCountries.map((country, number) => {
            return (
              <div
                className="flex items-center gap-3 text-dark-tremor-content-strong"
                key={country}
              >
                <p className="hidden sm:block text-tremor-content">{country}</p>
                <ReactCountryFlag
                  svg
                  countryCode={country}
                  className="text-5xl sm:text-3xl"
                />

                <p className="text-tremor-content-strong ">{number}</p>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="">
        {timeseriousviews ? (
          <BarChart
            showAnimation
            data={timeseriousviews.map((day) => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!;
              }, 0),
            }))}
            allowDecimals={false}
            categories={["Visitors"]}
            index="name"
          ></BarChart>
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
