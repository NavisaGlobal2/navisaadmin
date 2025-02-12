
import { useState } from "react";
import {
  Bell,
  Check,
  Info,
  MessageSquare,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Document Approved",
    message: "Your passport document has been approved",
    type: "success",
    timestamp: "5 mins ago",
    read: false,
  },
  {
    id: "2",
    title: "Security Alert",
    message: "New login detected from unknown device",
    type: "warning",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Application Update",
    message: "Your visa application status has been updated",
    type: "info",
    timestamp: "2 hours ago",
    read: true,
  },
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-500" />;
      case "warning":
        return <ShieldAlert className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Notifications</p>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} new</Badge>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="p-4 focus:bg-accent cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-4 items-start">
                {getIcon(notification.type)}
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : ''}`}>
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 focus:bg-accent cursor-pointer">
          <Button variant="ghost" className="w-full" asChild>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              View All Notifications
            </div>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
