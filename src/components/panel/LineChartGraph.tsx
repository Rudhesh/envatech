"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const LineChartGraph: React.FC<any> = ({ data }) => {
  return (
    <div>
    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
    <div className="grid flex-1 gap-1 text-center sm:text-left">

      <CardTitle>Line Chart - Multiple</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
          dataKey="time_stamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }}
        />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="max"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="min"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </div>
      </div>
    </CardFooter>
  </div>
  )
}
export default LineChartGraph;
