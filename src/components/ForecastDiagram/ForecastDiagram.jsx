import './ForecastDiagram.scss';
import * as d3 from 'd3';

export default function ForecastDiagram({ className, hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) return null;

  const colorBlue = '#696b9b';
  const width = 600;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 30 };

  // шкалы
  const x = d3
    .scalePoint()
    .domain(hourlyData.map((d) => d.time))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([
      d3.min(hourlyData, (d) => d.temperature) - 1,
      d3.max(hourlyData, (d) => d.temperature) + 1,
    ])
    .range([height - margin.bottom, margin.top]);

  // генераторы
  const line = d3
    .line()
    .x((d) => x(d.time))
    .y((d) => y(d.temperature))
    .curve(d3.curveMonotoneX);

  const area = d3
    .area()
    .x((d) => x(d.time))
    .y0(height - margin.bottom)
    .y1((d) => y(d.temperature))
    .curve(d3.curveMonotoneX);

  // ось X (делаем массив объектов {time, x})
  const ticks = hourlyData.map((d) => ({
    time: d.time,
    x: x(d.time),
  }));

  return (
    <div className={`diagram ${className}`}>
      <h3 className="diagram__title">Температура в течение дня</h3>
      <svg
        className="diagram__image"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto' }}
      >
        <defs>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorBlue} stopOpacity={0.7} />
            <stop offset="100%" stopColor={colorBlue} stopOpacity={0} />
          </linearGradient>
        </defs>

        <g>
          {/* область */}
          <path d={area(hourlyData)} className="area" />

          {/* линия */}
          <path d={line(hourlyData)} className="line" />

          {/* подписи температуры */}
          {hourlyData.map((d) => (
            <text
              key={d.time}
              className="temp-label"
              x={x(d.time)}
              y={y(d.temperature) - 10}
            >
              {d.temperature}°
            </text>
          ))}

          {/* ось X */}
          <g transform={`translate(0,${height - margin.bottom})`}>
            {ticks.map((t) => (
              <text
                key={t.time}
                x={t.x}
                y={20}
                textAnchor="middle"
                fill={colorBlue}
                fontSize="13"
              >
                {t.time}
              </text>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
