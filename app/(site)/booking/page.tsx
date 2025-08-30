"use client";

import React, { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useLanguage } from "@/components/language-provider";

export default function BookingPage() {
  const { t, tn } = useLanguage();
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
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('booking.title')}</h1>
          <p className="text-slate-600 text-lg mb-4">
            {t('booking.subtitle')}
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-2xl mx-auto">
            <h2 className="font-semibold text-gray-900 mb-2">{t('booking.servicesInclude')}</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {tn('booking.services').map((service: string, index: number) => (
                <li key={index}>• {service}</li>
              ))}
            </ul>
          </div>
        </header>
        
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
