/* eslint-disable @typescript-eslint/no-explicit-any */
import { scaleLinear } from 'd3-scale';
import UNDPColorModule from 'undp-viz-colors';

interface Props {
  data: any;
  svgWidth: number;
  svgHeight: number;
}

export function BarWithChange(props: Props) {
  const { data, svgWidth, svgHeight } = props;
  const margin = {
    top: 50,
    bottom: 35,
    left: 50,
    right: 5,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const params = [
    data[0]['2023'],
    data[0]['2025'],
    data[1]['2023'],
    data[1]['2025'],
  ];
  const minParam = Math.min(...params) < 0 ? Math.min(...params) : 0;
  const maxParam = Math.max(...params);
  const x = scaleLinear()
    .domain([minParam, maxParam])
    .range([0, graphWidth / 2 - 10])
    .nice();
  const centerPoint =
    (Math.max(x(data[1]['2023']), x(data[1]['2025']), x(0)) -
      Math.min(x(data[1]['2023']), x(data[1]['2025']), x(0))) /
    2;
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
      <g transform={`translate(${margin.left},${margin.top})`}>
        <text
          x={0}
          y={0}
          dx={-10}
          dy={40}
          textAnchor='end'
          style={{
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fontSize: '1rem',
            fill: 'var(--gray-700)',
          }}
        >
          2023
        </text>
        <text
          x={0}
          y={130}
          dx={-10}
          dy={40}
          textAnchor='end'
          style={{
            fontFamily: 'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
            fontSize: '1rem',
            fill: 'var(--gray-700)',
          }}
        >
          2025
        </text>
        <g transform={`translate(${0 - x(0)},0)`}>
          <g transform='translate(0,20)'>
            <rect
              x={x(0)}
              y={0}
              width={x(data[0]['2023']) - x(0)}
              height={30}
              fill={UNDPColorModule.categoricalColors.colors[0]}
            />
            <text
              x={x(data[0]['2023'])}
              y={0}
              dx={x(data[0]['2023']) - x(0) < 50 ? 5 : -5}
              dy={20}
              textAnchor={x(data[0]['2023']) - x(0) < 50 ? 'start' : 'end'}
              fill={
                x(data[0]['2023']) - x(0) < 50
                  ? UNDPColorModule.categoricalColors.colors[0]
                  : '#FFF'
              }
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '1rem',
              }}
            >
              {data[0]['2023']}
            </text>
          </g>
          <g transform='translate(0,150)'>
            <rect
              x={x(0)}
              y={0}
              width={x(data[0]['2025']) - x(0)}
              height={30}
              fill={UNDPColorModule.categoricalColors.colors[0]}
            />
            <text
              x={x(data[0]['2025'])}
              y={0}
              dx={x(data[0]['2025']) - x(0) < 50 ? 5 : -5}
              dy={20}
              textAnchor={x(data[0]['2025']) - x(0) < 50 ? 'start' : 'end'}
              fill={
                x(data[0]['2025']) - x(0) < 50
                  ? UNDPColorModule.categoricalColors.colors[0]
                  : '#FFF'
              }
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '1rem',
              }}
            >
              {data[0]['2025']}
            </text>
          </g>
          <rect
            x={
              Math.max(x(data[0]['2023']) - x(0), x(data[0]['2025']) - x(0)) /
                2 +
              x(0) -
              20
            }
            y={91}
            fill={UNDPColorModule.categoricalColors.colors[0]}
            width={40}
            height={20}
            fillOpacity={0.3}
            stroke={UNDPColorModule.categoricalColors.colors[0]}
            strokeWidth={1}
          />
          <text
            x={
              Math.max(x(data[0]['2023']) - x(0), x(data[0]['2025']) - x(0)) /
                2 +
              x(0)
            }
            y={95}
            dy={10}
            textAnchor='middle'
            fill={UNDPColorModule.categoricalColors.colors[0]}
            style={{
              fontFamily:
                'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            {(
              (Math.abs(data[0]['2025'] - data[0]['2023']) * 100) /
              Math.abs(data[0]['2023'])
            ).toFixed(1)}
            %
          </text>
          <path
            d={`
              M ${x(0) - 3},${20}
              l 0,33
              L ${x(0) - 3},${150 - 3}
              l 0,33
           `}
            fill='none'
            strokeWidth={1}
            stroke={UNDPColorModule.categoricalColors.colors[0]}
          />
          <path
            d={`
              M ${x(data[0]['2023']) + 3},${20}
              l 0,33
              L ${x(data[0]['2025']) + 3},${150 - 3}
              l 0,33
           `}
            fill='none'
            strokeWidth={1}
            stroke={UNDPColorModule.categoricalColors.colors[0]}
          />
          <text
            x={x(0)}
            y={205}
            dx={0}
            dy={-3}
            style={{
              fontFamily:
                'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              fill: 'var(--gray-700)',
              fontWeight: 'bold',
              fontSize: '0.825rem',
            }}
          >
            From fossil fuels
          </text>
        </g>
        <g transform={`translate(${graphWidth / 2 + 10},0)`}>
          <g transform='translate(0,20)'>
            <rect
              x={data[1]['2023'] < 0 ? x(data[1]['2023']) : x(0)}
              y={0}
              width={
                data[1]['2023'] > 0
                  ? x(data[1]['2023']) - x(0)
                  : x(0) - x(data[1]['2023'])
              }
              height={30}
              fill={UNDPColorModule.categoricalColors.colors[3]}
            />
            <text
              x={x(data[1]['2023'])}
              y={0}
              dx={
                data[1]['2023'] > 0
                  ? x(data[1]['2023']) - x(0) < 50
                    ? 5
                    : -5
                  : x(0) - x(data[1]['2023']) < 50
                  ? -5
                  : 5
              }
              dy={20}
              textAnchor={
                data[1]['2023'] > 0
                  ? x(data[1]['2023']) < 50
                    ? 'start'
                    : 'end'
                  : x(0) - x(data[1]['2023']) < 50
                  ? 'end'
                  : 'start'
              }
              fill={
                data[1]['2023'] > 0
                  ? x(data[1]['2023']) - x(0) < 50
                    ? UNDPColorModule.categoricalColors.colors[3]
                    : '#FFF'
                  : x(data[1]['2023']) - x(0) > 50
                  ? '#FFF'
                  : UNDPColorModule.categoricalColors.colors[3]
              }
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '1rem',
              }}
            >
              {data[1]['2023']}
            </text>
          </g>
          <g transform='translate(0,150)'>
            <rect
              x={data[1]['2025'] < 0 ? x(data[1]['2025']) : x(0)}
              y={0}
              width={
                data[1]['2025'] > 0
                  ? x(data[1]['2025']) - x(0)
                  : x(0) - x(data[1]['2025'])
              }
              height={30}
              fill={UNDPColorModule.categoricalColors.colors[3]}
            />
            <text
              x={x(data[1]['2025'])}
              y={0}
              dx={
                data[1]['2025'] > 0
                  ? x(data[1]['2025']) - x(0) < 50
                    ? 5
                    : -5
                  : x(0) - x(data[1]['2025']) < 50
                  ? -5
                  : 5
              }
              dy={20}
              textAnchor={
                data[1]['2025'] > 0
                  ? x(data[1]['2025']) - x(0) < 50
                    ? 'start'
                    : 'end'
                  : x(0) - x(data[1]['2025']) < 50
                  ? 'end'
                  : 'start'
              }
              fill={
                data[1]['2025'] > 0
                  ? x(data[1]['2025']) - x(0) < 50
                    ? UNDPColorModule.categoricalColors.colors[3]
                    : '#FFF'
                  : x(data[1]['2025']) - x(0) > 50
                  ? '#FFF'
                  : UNDPColorModule.categoricalColors.colors[3]
              }
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '1rem',
              }}
            >
              {data[1]['2025']}
            </text>
          </g>
          <rect
            x={
              centerPoint +
              Math.min(x(data[1]['2023']), x(data[1]['2025']), x(0)) -
              20
            }
            y={91}
            fill={UNDPColorModule.categoricalColors.colors[3]}
            width={40}
            height={20}
            fillOpacity={0.3}
            stroke={UNDPColorModule.categoricalColors.colors[3]}
            strokeWidth={1}
          />
          <text
            x={
              centerPoint +
              Math.min(x(data[1]['2023']), x(data[1]['2025']), x(0))
            }
            y={95}
            dy={10}
            textAnchor='middle'
            fill={UNDPColorModule.categoricalColors.colors[3]}
            style={{
              fontFamily:
                'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            {data[1]['2025'] > data[1]['2023'] ? '-' : ''}
            {(Math.abs(data[1]['2025'] - data[1]['2023']) * 100) /
              Math.abs(data[1]['2023']) <
            10
              ? (
                  (Math.abs(data[1]['2025'] - data[1]['2023']) * 100) /
                  Math.abs(data[1]['2023'])
                ).toFixed(1)
              : (
                  (Math.abs(data[1]['2025'] - data[1]['2023']) * 100) /
                  Math.abs(data[1]['2023'])
                ).toFixed(0)}
            %
          </text>
          <path
            d={`
              M ${
                x(0) < x(data[1]['2023']) ? x(0) - 3 : x(data[1]['2023']) - 3
              },${20}
              l 0,33
              L ${
                x(0) < x(data[1]['2025']) ? x(0) - 3 : x(data[1]['2025']) - 3
              },${150 - 3}
              l 0,33
           `}
            fill='none'
            strokeWidth={1}
            stroke={UNDPColorModule.categoricalColors.colors[3]}
          />
          <path
            d={`
              M ${
                x(0) > x(data[1]['2023']) ? x(0) + 3 : x(data[1]['2023']) + 3
              },${20}
              l 0,33
              L ${
                x(0) > x(data[1]['2025']) ? x(0) + 3 : x(data[1]['2025']) + 3
              },${150 - 3}
              l 0,33
           `}
            fill='none'
            strokeWidth={1}
            stroke={UNDPColorModule.categoricalColors.colors[3]}
          />
          <text
            x={0}
            y={205}
            dx={0}
            dy={-3}
            style={{
              fontFamily:
                'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              fill: 'var(--gray-700)',
              fontWeight: 'bold',
              fontSize: '0.825rem',
            }}
          >
            From fossil fuels &
          </text>
          <text
            x={0}
            y={218}
            dx={0}
            dy={-3}
            style={{
              fontFamily:
                'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              fill: 'var(--gray-700)',
              fontWeight: 'bold',
              fontSize: '0.825rem',
            }}
          >
            land-use change
          </text>
        </g>
      </g>
    </svg>
  );
}
