"use client";

import React, { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function BookingPage() {
  const [isCalLoaded, setIsCalLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "60min" });
        cal("ui", { 
          hideEventTypeDetails: false, 
          layout: "month_view" 
        });
        setIsCalLoaded(true);
      } catch (error) {
        console.error("Failed to load Cal.com:", error);
      }
    })();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Book a Session</h1>
        <p className="text-slate-600 text-center mb-8">
          Pick a time that works for you. This integrates with Google Calendar.
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          {!isCalLoaded && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading calendar...</p>
              </div>
            </div>
          )}
          
          <Cal 
            namespace="60min"
            calLink="august-wang-113/60min"
            style={{
              width: "100%",
              height: "600px",
              overflow: "scroll"
            }}
            config={{
              layout: "month_view"
            }}
          />
        </div>
      </div>
    </section>
  );
}
