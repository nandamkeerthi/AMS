import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AreaChartTooltip, LegendText } from '@/pages/Dashboard/components/charts/ChartTooltip';
import chartStyles from './AnalyticsCharts.module.css';

const axisProps = {
  tick: { fontSize: 11, fill: '#64748B' },
  axisLine: { stroke: '#E2E8F0' },
  tickLine: false,
};

export function IncidentTrendLineChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis tick={axisProps.tick} axisLine={false} tickLine={false} />
          <Tooltip content={<AreaChartTooltip />} />
          <Legend iconType="circle" iconSize={8} formatter={(v) => <LegendText value={v} />} />
          <Line type="monotone" dataKey="incidents" name="Incidents" stroke="#2563EB" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="critical" name="Critical" stroke="#EF4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ResolutionTimeBarChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis tick={axisProps.tick} axisLine={false} tickLine={false} unit="h" />
          <Tooltip content={<AreaChartTooltip />} />
          <Bar dataKey="hours" name="Avg hours" fill="#2563EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StatusDistributionPieChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="45%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" iconType="circle" iconSize={8} formatter={(v) => <LegendText value={v} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AiAccuracyAreaChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="aiAccuracyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis domain={[80, 100]} tick={axisProps.tick} axisLine={false} tickLine={false} unit="%" />
          <Tooltip content={<AreaChartTooltip />} />
          <Area type="monotone" dataKey="accuracy" name="Accuracy" stroke="#7C3AED" fill="url(#aiAccuracyGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RepeatIncidentLineChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis tick={axisProps.tick} axisLine={false} tickLine={false} />
          <Tooltip content={<AreaChartTooltip />} />
          <Legend iconType="circle" iconSize={8} formatter={(v) => <LegendText value={v} />} />
          <Line type="monotone" dataKey="repeat" name="Repeat" stroke="#F59E0B" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="total" name="Total" stroke="#64748B" strokeWidth={2} dot={false} strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function KnowledgeGrowthAreaChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="kbGrowthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis tick={axisProps.tick} axisLine={false} tickLine={false} />
          <Tooltip content={<AreaChartTooltip />} />
          <Legend iconType="circle" iconSize={8} formatter={(v) => <LegendText value={v} />} />
          <Area type="monotone" dataKey="articles" name="Total articles" stroke="#10B981" fill="url(#kbGrowthGradient)" strokeWidth={2} />
          <Area type="monotone" dataKey="new" name="New articles" stroke="#059669" fill="none" strokeWidth={2} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopApplicationsBarChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" horizontal={false} />
          <XAxis type="number" tick={axisProps.tick} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <Tooltip content={<AreaChartTooltip />} />
          <Bar dataKey="incidents" name="Incidents" fill="#2563EB" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlySummaryBarChart({ data = [] }) {
  return (
    <div className={chartStyles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis tick={axisProps.tick} axisLine={false} tickLine={false} />
          <Tooltip content={<AreaChartTooltip />} />
          <Legend iconType="circle" iconSize={8} formatter={(v) => <LegendText value={v} />} />
          <Bar dataKey="opened" name="Opened" fill="#2563EB" radius={[4, 4, 0, 0]} />
          <Bar dataKey="resolved" name="Resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="critical" name="Critical" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
