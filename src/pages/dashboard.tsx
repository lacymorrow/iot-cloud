import {
  AcUnit,
  Cable,
  QrCode2,
  SignalWifi4Bar,
  SignalWifiOff,
  Thermostat,
  Wifi,
  WifiOff,
} from "@mui/icons-material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import useDevice from "../hooks/useDevice";
import useDevicePowerStatus from "../hooks/useDevicePowerStatus";
import useIp from "../hooks/useIp";
import useSensor from "../hooks/useSensor";
import { setDevicePower } from "../lib/py/pyapi";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { PowerIcon, PowerOffIcon } from "lucide-react";

const Dashboard = () => {
  const { data: tempHum } = useSensor();
  const { hwid } = useDevice();
  const { ip } = useIp();
  const { status, isLoading, isError } = useDevicePowerStatus();

  const handleClickPower = async () => {
    setDevicePower(!status);
  };

  return (
    <>
      <div className=" h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <PowerSettingsNewIcon /> Device Power
          </CardTitle>
          <CardDescription>Controlling device power status</CardDescription>
        </CardHeader>
        <div className="grid grid-cols-3 gap-2">
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 space-x-2 pb-2">
                <CardTitle className="text-sm font-medium">
                  Temperature
                </CardTitle>
                <Thermostat />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tempHum?.temperature} °C
                </div>
                {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
              </CardContent>
            </Card>
          </>

          <Card onClick={handleClickPower} className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 space-x-2 pb-2">
              <CardTitle className="text-sm font-bold">
                {status ? "On" : "Off"}
              </CardTitle>
              {status ? <PowerIcon size={12} /> : <PowerOffIcon size={12} />}
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2 justify-center">
              <Switch checked={status} />
              {/* {status ? <PowerIcon /> : <PowerOffIcon />} */}
            </CardContent>
          </Card>

          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 space-x-2 pb-2">
                <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                <AcUnit />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tempHum?.humidity}%</div>
                {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
              </CardContent>
            </Card>
          </>
        </div>
        <div>
          <Separator className="my-2" />
          <div className="grid grid-cols-3 text-xs">
            {/* QR Button, Power button, Wifi Disconnected button */}
            <div className="flex gap-2 items-center">
              <Cable fontSize="small" />
              {hwid || "unknown"}
            </div>

            <Link
              href="/settings/view-qr"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full flex justify-center"
              )}
            >
              <QrCode2 fontSize="large" />
            </Link>
            <Link
              href="/wifi"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex gap-2 items-center justify-end text-xs"
              )}
            >
              {ip ? (
                <>
                  {ip}
                  <Wifi fontSize="small" />
                </>
              ) : (
                <>
                  Disconnected
                  <WifiOff fontSize="small" />
                </>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/*
		Settings
			- wifi
			- device
		- about
		- Pairing
    - qr
    - schedule */}
    </>
  );
};

export default Dashboard;
