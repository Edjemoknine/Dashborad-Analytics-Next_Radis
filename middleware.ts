import { NextRequest, NextResponse } from "next/server";
import { analytics } from "./app/utils/analytics";

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname === "/") {
    console.log("track");
    try {
      analytics.track("pageview", {
        page: "/",
        country: req.geo?.country,
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  return NextResponse.next();
};

export const matcher = {
  matcher: ["/"],
};
