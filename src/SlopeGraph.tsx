/* eslint-disable @typescript-eslint/no-explicit-any */
import { scaleLinear } from 'd3-scale';
import UNDPColorModule from 'undp-viz-colors';

interface Props {
  data: any;
  svgWidth: number;
  svgHeight: number;
  colors: string[];
}

export function SlopeGraph(props: Props) {
  const { data, svgWidth, svgHeight, colors } = props;
  const margin = {
    top: 75,
    bottom: 35,
    left: 50,
    right: 50,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;
  const params = [
    data[0]['2023'],
    data[0]['2025'],
    data[1]['2023'],
    data[1]['2025'],
  ];
  const minParam = Math.min(...params) < 0 ? Math.min(...params) : 0;
  const maxParam = Math.max(...params);
  const minYearFiltered = 2023;
  const maxYearFiltered = 2025;
  const y = scaleLinear()
    .domain([minParam, maxParam])
    .range([graphHeight, 0])
    .nice();
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
      <circle
        cx={5}
        cy={15}
        r={5}
        style={{ fill: colors[0] }}
        shapeRendering='geometricPrecision'
      />
      <text
        x={15}
        y={23}
        dx={0}
        dy={-3}
        style={{
          fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
          fill: 'var(--gray-700)',
          fontWeight: 'bold',
          fontSize: '0.825rem',
        }}
      >
        From fossil fuels
      </text>
      <circle
        cx={5}
        cy={40}
        r={5}
        style={{ fill: colors[1] }}
        shapeRendering='geometricPrecision'
      />
      <text
        x={15}
        y={48}
        dx={0}
        dy={-3}
        style={{
          fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
          fill: 'var(--gray-700)',
          fontWeight: 'bold',
          fontSize: '0.825rem',
        }}
      >
        From fossil fuels & land-use change
      </text>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g>
          <g>
            <text
              y={graphHeight + 5}
              x={0}
              style={{
                fill: 'var(--gray-600)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              }}
              textAnchor='middle'
              fontSize={14}
              dy={15}
            >
              {minYearFiltered}
            </text>
            <text
              y={graphHeight + 5}
              x={graphWidth}
              style={{
                fill: 'var(--gray-600)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              }}
              textAnchor='middle'
              fontSize={14}
              dy={15}
            >
              {maxYearFiltered}
            </text>
          </g>
        </g>
        <line
          y1={graphHeight}
          y2={0}
          x1={0}
          x2={0}
          style={{ stroke: 'var(--gray-600)', strokeWidth: 2 }}
        />
        <line
          y1={graphHeight}
          y2={0}
          x1={graphWidth}
          x2={graphWidth}
          style={{ stroke: 'var(--gray-600)', strokeWidth: 2 }}
        />
        <line
          x1={0}
          x2={graphWidth}
          y1={y(data[0]['2023'])}
          y2={y(data[0]['2025'])}
          style={{
            strokeWidth: '1px',
            stroke: colors[0],
            fill: 'none',
          }}
        />
        <line
          x1={0}
          x2={graphWidth}
          y1={y(data[1]['2023'])}
          y2={y(data[1]['2025'])}
          style={{
            strokeWidth: '1px',
            stroke: colors[1],
            fill: 'none',
          }}
        />
        <circle
          cx={0}
          cy={y(data[0]['2023'])}
          r={6}
          style={{
            fill: colors[0],
          }}
        />
        <text
          x={0}
          y={y(data[0]['2023'])}
          dx={-9}
          dy={7}
          style={{
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fill: UNDPColorModule.graphMainColor,
            fontWeight: 'bold',
            fontSize: '0.825rem',
            textAnchor: 'end',
          }}
        >
          {data[0]['2023']}
        </text>
        <circle
          cx={graphWidth}
          cy={y(data[0]['2025'])}
          r={6}
          style={{
            fill: colors[0],
          }}
        />
        <text
          x={graphWidth}
          y={y(data[0]['2025'])}
          dx={9}
          dy={7}
          style={{
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fill: UNDPColorModule.graphMainColor,
            fontWeight: 'bold',
            fontSize: '0.825rem',
            textAnchor: 'start',
          }}
        >
          {data[0]['2025']}
        </text>
        <circle
          cx={0}
          cy={y(data[1]['2023'])}
          r={6}
          style={{
            fill: colors[1],
          }}
        />
        <text
          x={0}
          y={y(data[1]['2023'])}
          dx={-9}
          dy={3}
          style={{
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fill: colors[1],
            fontWeight: 'bold',
            fontSize: '0.825rem',
            textAnchor: 'end',
          }}
        >
          {data[1]['2023']}
        </text>
        <circle
          cx={graphWidth}
          cy={y(data[1]['2025'])}
          r={6}
          style={{
            fill: colors[1],
          }}
        />
        <text
          x={graphWidth}
          y={y(data[1]['2025'])}
          dx={9}
          dy={3}
          style={{
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fill: colors[1],
            fontWeight: 'bold',
            fontSize: '0.825rem',
            textAnchor: 'start',
          }}
        >
          {data[1]['2025']}
        </text>
      </g>
    </svg>
  );
}
