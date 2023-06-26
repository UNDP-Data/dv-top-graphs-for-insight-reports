/* eslint-disable @typescript-eslint/no-explicit-any */
import { scaleLinear } from 'd3-scale';
import UNDPColorModule from 'undp-viz-colors';

interface Props {
  data: any;
  svgWidth: number;
  svgHeight: number;
}

export function SlopeGraphPovertySeparated(props: Props) {
  const { data, svgWidth, svgHeight } = props;
  const margin = {
    top: 50,
    bottom: 40,
    left: 10,
    right: 0,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;
  const dataFiltered = data.filter((d: any) => d !== undefined);
  const params = [
    data[0] ? data[0]['2023'] * 100 : undefined,
    data[0] ? data[0]['2025'] * 100 : undefined,
    data[1] ? data[1]['2023'] * 100 : undefined,
    data[1] ? data[1]['2025'] * 100 : undefined,
    data[2] ? data[2]['2023'] * 100 : undefined,
    data[2] ? data[2]['2025'] * 100 : undefined,
    data[3] ? data[3]['2023'] * 100 : undefined,
    data[3] ? data[3]['2025'] * 100 : undefined,
  ].filter(d => d !== undefined);
  const minParam = 0;
  const maxParam = Math.max(...(params as number[]));
  const columnWid =
    graphWidth / data.filter((d: any) => d !== undefined).length;
  const keys = [
    data[0] ? '$2.15' : undefined,
    data[1] ? '$3.65' : undefined,
    data[2] ? '$6.85' : undefined,
    data[3] ? '$14' : undefined,
  ].filter(d => d !== undefined);
  const y = scaleLinear()
    .domain([minParam, maxParam])
    .range([graphHeight, 0])
    .nice();
  const ticks = y.ticks(5);
  return (
    <svg
      width='325px'
      style={{ alignItems: 'flex-end' }}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
    >
      <rect
        x={0}
        y={0}
        width={svgWidth}
        height={svgHeight}
        fill={UNDPColorModule.graphBackgroundColor}
      />
      <g transform='translate(-5,-7)'>
        <circle cx={10} cy={20} r={5} style={{ fill: 'var(--blue-300)' }} />
        <text
          x={15}
          y={20}
          dx={5}
          dy={4}
          style={{
            fill: 'var(--blue-300)',
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fontSize: '0.825rem',
            textAnchor: 'start',
            fontWeight: 'bold',
          }}
        >
          2023
        </text>
        <circle cx={90} cy={20} r={5} style={{ fill: 'var(--blue-700)' }} />
        <text
          x={95}
          y={20}
          dx={5}
          dy={4}
          style={{
            fill: 'var(--blue-700)',
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fontSize: '0.825rem',
            textAnchor: 'start',
            fontWeight: 'bold',
          }}
        >
          2025
        </text>
      </g>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {ticks.map((d, i) => (
          <g key={i} transform={`translate(${-margin.left}, ${y(d)})`}>
            {d === 0 ? null : (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={graphWidth + margin.left}
                y2={0}
                strokeWidth={1}
                fill='none'
                strokeDasharray='8 8'
                style={{ stroke: 'var(--gray-400)' }}
              />
            )}
            <text
              x={0}
              y={0}
              dx={0}
              dy={-5}
              style={{
                fill: 'var(--gray-500)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '0.825rem',
                textAnchor: 'start',
                fontWeight: 'bold',
              }}
            >
              {d}%
            </text>
          </g>
        ))}
        <line
          x1={-30}
          x2={graphWidth}
          y1={y(0)}
          y2={y(0)}
          shapeRendering='geometricPrecision'
          style={{
            strokeWidth: '1px',
            stroke: 'var(--gray-600)',
            fill: 'none',
          }}
        />
        {keys.map((d, i) => (
          <g key={i}>
            {dataFiltered[i] ? (
              <g transform={`translate(${i * columnWid + columnWid / 2},0)`}>
                <line
                  x1={-20}
                  y1={y(dataFiltered[i]['2023'] * 100)}
                  x2={20}
                  y2={y(dataFiltered[i]['2025'] * 100)}
                  strokeWidth={1}
                  fill='none'
                  style={{ stroke: 'var(--gray-500)' }}
                />
                <circle
                  cx={-20}
                  cy={y(dataFiltered[i]['2023'] * 100)}
                  r={5}
                  style={{ fill: 'var(--blue-300)' }}
                />
                <circle
                  cx={20}
                  cy={y(dataFiltered[i]['2025'] * 100)}
                  r={5}
                  style={{ fill: 'var(--blue-700)' }}
                />
                <text
                  x={-20}
                  y={y(dataFiltered[i]['2023'] * 100)}
                  dx={0}
                  dy={-10}
                  style={{
                    fill: 'var(--blue-300)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '0.825rem',
                    textAnchor: 'middle',
                  }}
                >
                  {(dataFiltered[i]['2023'] * 100).toFixed(1)}%
                </text>
                <text
                  x={20}
                  y={y(dataFiltered[i]['2025'] * 100)}
                  dx={0}
                  dy={-10}
                  style={{
                    fill: 'var(--blue-700)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '0.825rem',
                    textAnchor: 'middle',
                  }}
                >
                  {(dataFiltered[i]['2025'] * 100).toFixed(1)}%
                </text>
                <text
                  x={0}
                  y={graphHeight}
                  dx={0}
                  dy={20}
                  style={{
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                    fill: 'var(--gray-700)',
                    fontSize: '0.825rem',
                    fontWeight: 'bold',
                    textAnchor: 'middle',
                  }}
                >
                  {d}
                </text>
              </g>
            ) : (
              <g />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
