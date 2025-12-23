
'use client';

import { notFound } from "next/navigation";
import React from "react";
import { getOrderById } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTracker from "@/components/order-tracker";
import { Clock, CookingPot, Bike, CheckCircle2 } from "lucide-react";
import { EstimatedDeliveryTime } from "@/components/estimated-delivery-time";

export default function OrderTrackingPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = getOrderById(params.orderId);

  if (!order) {
    notFound();
  }

  const getStatusInfo = (status: typeof order.status) => {
    switch (status) {
      case "pending":
        return { text: "Pending", icon: <Clock className="h-5 w-5" />, color: "bg-gray-500" };
      case "preparing":
        return { text: "Preparing", icon: <CookingPot className="h-5 w-5" />, color: "bg-orange-500" };
      case "out-for-delivery":
        return { text: "Out for Delivery", icon: <Bike className="h-5 w-5" />, color: "bg-blue-500" };
      case "delivered":
        return { text: "Delivered", icon: <CheckCircle2 className="h-5 w-5" />, color: "bg-green-500" };
    }
  };

  const statusInfo = getStatusInfo(order.status);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Track Your Order</h1>
        <p className="text-muted-foreground mt-2">Order ID: #{order.id}</p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full text-white ${statusInfo.color}`}>
                {statusInfo.icon}
              </div>
              <div>
                  <p className="font-semibold text-lg">{statusInfo.text}</p>
                  <p className="text-muted-foreground text-sm">
                    Estimated delivery: <EstimatedDeliveryTime orderDate={order.createdAt} />
                  </p>
              </div>
          </div>
          <div className="relative mt-8 px-2">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-border -z-10" />
            <div className="flex items-center space-x-4 mb-6">
                <div className={`h-4 w-4 rounded-full ${order.status !== 'pending' ? 'bg-primary' : 'bg-border'}`} />
                <p className={`${order.status !== 'pending' ? 'font-semibold' : 'text-muted-foreground'}`}>Order Confirmed</p>
            </div>
            <div className="flex items-center space-x-4 mb-6">
                <div className={`h-4 w-4 rounded-full ${order.status === 'out-for-delivery' || order.status === 'delivered' ? 'bg-primary' : 'bg-border'}`} />
                <p className={`${order.status === 'out-for-delivery' || order.status === 'delivered' ? 'font-semibold' : 'text-muted-foreground'}`}>Out for Delivery</p>
            </div>
             <div className="flex items-center space-x-4">
                <div className={`h-4 w-4 rounded-full ${order.status === 'delivered' ? 'bg-primary' : 'bg-border'}`} />
                <p className={`${order.status === 'delivered' ? 'font-semibold' : 'text-muted-foreground'}`}>Delivered</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Live Location</CardTitle>
        </CardHeader>
        <CardContent>
            <OrderTracker order={order} />
        </CardContent>
      </Card>
    </div>
  );
}
