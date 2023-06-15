/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { scaleLinear } from 'd3-scale';
import UNDPColorModule from 'undp-viz-colors';

interface Props {
  averageData: any;
  fiscalData: any;
  svgWidth: number;
  svgHeight: number;
}

const ratings = [
  'C',
  'CC',
  'CCC-',
  'CCC',
  'CCC+',
  'B-',
  'B',
  'B+',
  'BB-',
  'BB',
  'BB+',
  'BBB-',
  'BBB',
  'BBB+',
  'A-',
  'A',
  'A+',
  'AA-',
  'AA',
  'AA+',
  'AAA',
];

const DSARisk = ['Low', 'Moderate', 'High', 'In debt distress'];

export function RadarAndDotPlot(props: Props) {
  const { averageData, fiscalData, svgWidth, svgHeight } = props;
  const margin = {
    top: 20,
    bottom: 10,
    left: 30,
    right: 50,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const highFreqKeys = [
    'Total external debt servicing (% of revenue)',
    'Credit rating',
    '10-year bond yield (%)',
    'DSA Risk',
  ];
  const lowFreqKeys = [
    'Revenue (% of GDP)',
    'Government debt (% of GDP)',
    'Resource revenue (% of revenue)',
    'Natural resources rents (% of GDP)',
  ];
  const highFreqFiltered = highFreqKeys.filter(d => fiscalData[d] !== null);
  const lowFreqFiltered = lowFreqKeys.filter(d => fiscalData[d] !== null);
  const USBondYield = 3.753;
  const lowFreqDataArray = lowFreqKeys.map(d => fiscalData[d]);
  const lowFreqAvgDataArray = lowFreqKeys.map(d => averageData[d]);
  const lowFreqDataArrayCombine = lowFreqDataArray.concat(lowFreqAvgDataArray);
  const radarRadius = (graphHeight / 2 - 70) / 2;
  const xLowFreq = scaleLinear()
    .domain([0, Math.max(...lowFreqDataArrayCombine)])
    .range([0, radarRadius])
    .nice();
  const xTicks = xLowFreq.ticks(5);
  let pathFiscal = '';
  let pathAverage = '';

  lowFreqFiltered.forEach((d, i) => {
    if (i === 0) {
      pathFiscal += `M ${
        (xLowFreq(fiscalData[d]) as number) *
        Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
      },${
        (xLowFreq(fiscalData[d]) as number) *
        Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
      }`;
      pathAverage += `M ${
        (xLowFreq(averageData[d]) as number) *
        Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
      },${
        (xLowFreq(averageData[d]) as number) *
        Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
      }`;
    } else {
      pathFiscal += ` L ${
        (xLowFreq(fiscalData[d]) as number) *
        Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
      },${
        (xLowFreq(fiscalData[d]) as number) *
        Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
      }`;
      pathAverage += ` L ${
        (xLowFreq(averageData[d]) as number) *
        Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
      },${
        (xLowFreq(averageData[d]) as number) *
        Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
      }`;
    }
  });
  pathFiscal += ' Z';
  pathAverage += ' Z';
  return (
    <svg
      width='656px'
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
        <g transform='translate(0,0)'>
          <text
            y={15}
            x={0 - margin.left}
            style={{
              fill: 'var(--gray-700)',
              fontFamily:
                'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            fontSize={16}
          >
            Low-Frequency Indicators
          </text>
          <g transform={`translate(${0 - margin.left - 5},20)`}>
            <circle cx={10} cy={20} r={5} style={{ fill: 'var(--blue-700)' }} />
            <text
              x={15}
              y={20}
              dx={5}
              dy={4}
              style={{
                fill: 'var(--blue-700)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '0.825rem',
                textAnchor: 'start',
                fontWeight: 'bold',
              }}
            >
              {fiscalData.iso}
            </text>
            <circle cx={90} cy={20} r={5} style={{ fill: 'var(--dark-red)' }} />
            <text
              x={95}
              y={20}
              dx={5}
              dy={4}
              style={{
                fill: 'var(--dark-red)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '0.825rem',
                textAnchor: 'start',
                fontWeight: 'bold',
              }}
            >
              {fiscalData['IMF country grouping']} Average
            </text>
          </g>
          <g
            transform={`translate(${graphWidth / 2 + 20},${
              (graphHeight / 2 - 70) / 2 + 40
            })`}
          >
            {lowFreqFiltered.map((d, i) => (
              <g key={i}>
                <line
                  x1={0}
                  y1={0}
                  x2={
                    radarRadius * Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
                  }
                  y2={
                    radarRadius * Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
                  }
                  r={7.5}
                  style={{
                    fill: 'none',
                    stroke: 'var(--gray-500)',
                    strokeWidth: 1,
                  }}
                />
                <text
                  style={{
                    fill: 'var(--gray-700)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                    textAnchor:
                      i === 0
                        ? 'middle'
                        : Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2) < 0
                        ? 'end'
                        : 'start',
                    fontWeight: 'bold',
                  }}
                  fontSize={12}
                  x={
                    radarRadius * Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
                  }
                  y={
                    radarRadius * Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
                  }
                  dy={
                    radarRadius *
                      Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2) <
                    0
                      ? -10
                      : 20
                  }
                >
                  {d}
                </text>
              </g>
            ))}
            <path
              fill='none'
              style={{
                stroke: 'var(--dark-red)',
                fill: 'var(--dark-red)',
                strokeWidth: '2px',
                strokeOpacity: 0.6,
                fillOpacity: 0.1,
              }}
              d={pathAverage}
            />
            <path
              fill='none'
              style={{
                stroke: 'var(--blue-700)',
                fill: 'var(--blue-700)',
                strokeWidth: '2px',
                strokeOpacity: 0.6,
                fillOpacity: 0.1,
              }}
              d={pathFiscal}
            />
            {xTicks.map((d, i) => (
              <g key={i}>
                <circle
                  x={0}
                  y={0}
                  r={xLowFreq(d)}
                  style={{
                    fill: 'none',
                    stroke: 'var(--gray-400)',
                    strokeWidth: 1,
                  }}
                />
                <text
                  style={{
                    fill: 'var(--gray-500)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                    textAnchor: 'middle',
                    fontWeight: 'bold',
                  }}
                  fontSize={14}
                  x={0}
                  y={xLowFreq(d)}
                  dy={4}
                >
                  {d} %
                </text>
              </g>
            ))}

            {lowFreqFiltered.map((d, i) => {
              return (
                <g key={i}>
                  <circle
                    cx={
                      (xLowFreq(averageData[d]) as number) *
                      Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    cy={
                      (xLowFreq(averageData[d]) as number) *
                      Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    r={7.5}
                    style={{ fill: 'var(--dark-red)' }}
                  />
                  <text
                    style={{
                      fill: 'var(--dark-red)',
                      fontFamily:
                        'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                      textAnchor:
                        (xLowFreq(averageData[d]) as number) *
                          Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2) >
                        0
                          ? 'start'
                          : 'end',
                      fontWeight: 'bold',
                    }}
                    fontSize={14}
                    x={
                      (xLowFreq(averageData[d]) as number) *
                      Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    y={
                      (xLowFreq(averageData[d]) as number) *
                      Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    dy={5}
                    dx={
                      (xLowFreq(averageData[d]) as number) *
                        Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2) >
                      0
                        ? 10
                        : -10
                    }
                  >
                    {averageData[d].toFixed(2)}
                  </text>
                  <circle
                    cx={
                      (xLowFreq(fiscalData[d]) as number) *
                      Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    cy={
                      (xLowFreq(fiscalData[d]) as number) *
                      Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    r={7.5}
                    style={{ fill: 'var(--blue-700)' }}
                  />
                  <text
                    style={{
                      fill: 'var(--blue-700)',
                      fontFamily:
                        'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                      textAnchor:
                        (xLowFreq(averageData[d]) as number) *
                          Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2) >
                        0
                          ? 'start'
                          : 'end',
                      fontWeight: 'bold',
                    }}
                    fontSize={14}
                    x={
                      (xLowFreq(fiscalData[d]) as number) *
                      Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    y={
                      (xLowFreq(fiscalData[d]) as number) *
                      Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)
                    }
                    dx={
                      (xLowFreq(averageData[d]) as number) *
                        Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2) >
                      0
                        ? 10
                        : -10
                    }
                    dy={5}
                  >
                    {fiscalData[d].toFixed(2)}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
        <g transform={`translate(0,${graphHeight / 2 + 20})`}>
          <line
            x1={0 - margin.left}
            x2={svgWidth}
            y1={-25}
            y2={-25}
            style={{
              strokeWidth: '2px',
              stroke: 'var(--gray-400)',
              fill: 'none',
            }}
          />
          <text
            y={15}
            x={0 - margin.left}
            style={{
              fill: 'var(--gray-700)',
              fontFamily:
                'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            fontSize={16}
          >
            High-Frequency Indicators
          </text>
          <g transform={`translate(${0 - margin.left - 5},20)`}>
            <circle cx={10} cy={20} r={5} style={{ fill: 'var(--blue-700)' }} />
            <text
              x={15}
              y={20}
              dx={5}
              dy={4}
              style={{
                fill: 'var(--blue-700)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '0.825rem',
                textAnchor: 'start',
                fontWeight: 'bold',
              }}
            >
              {fiscalData.iso}
            </text>
            <circle cx={90} cy={20} r={5} style={{ fill: 'var(--dark-red)' }} />
            <text
              x={95}
              y={20}
              dx={5}
              dy={4}
              style={{
                fill: 'var(--dark-red)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '0.825rem',
                textAnchor: 'start',
                fontWeight: 'bold',
              }}
            >
              {fiscalData['IMF country grouping']} Average
            </text>
            <circle
              cx={0}
              cy={0}
              r={5}
              transform={
                fiscalData['IMF country grouping'] === 'Advanced Economy'
                  ? 'translate(300,20)'
                  : 'translate(240,20)'
              }
              style={{ fill: UNDPColorModule.categoricalColors.colors[3] }}
            />
            <text
              x={
                fiscalData['IMF country grouping'] === 'Advanced Economy'
                  ? 305
                  : 245
              }
              y={20}
              dx={5}
              dy={4}
              style={{
                fill: UNDPColorModule.categoricalColors.colors[3],
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontSize: '0.825rem',
                textAnchor: 'start',
                fontWeight: 'bold',
              }}
            >
              10-year bond yield for US
            </text>
          </g>
          {highFreqFiltered.map((d, i) => {
            const x = scaleLinear()
              .domain([
                0,
                fiscalData[d] > averageData[d] ? fiscalData[d] : averageData[d],
              ])
              .range([0, graphWidth])
              .nice();
            return (
              <g
                transform={`translate(0,${
                  ((graphHeight / 2 - 70) / highFreqFiltered.length) * i + 70
                })`}
                key={i}
              >
                <text
                  y={10}
                  x={0 - margin.left}
                  style={{
                    fill: 'var(--gray-700)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                  }}
                  fontSize={16}
                >
                  {d}
                </text>
                <line
                  x1={0 - margin.left}
                  x2={svgWidth}
                  y1={40}
                  y2={40}
                  style={{
                    strokeWidth: '1px',
                    stroke: 'var(--gray-400)',
                    fill: 'none',
                  }}
                />
                <line
                  x1={x(averageData[d]) as number}
                  x2={x(fiscalData[d]) as number}
                  y1={40}
                  y2={40}
                  style={{
                    strokeWidth: '1px',
                    stroke: 'var(--gray-700)',
                    fill: 'none',
                  }}
                />
                {d === '10-year bond yield (%)' ? (
                  <g>
                    <circle
                      r={7.5}
                      style={{
                        fill: UNDPColorModule.categoricalColors.colors[3],
                      }}
                      transform={`translate(${x(USBondYield)},40)`}
                      x={0}
                      y={0}
                    />
                    <text
                      style={{
                        fill: UNDPColorModule.categoricalColors.colors[3],
                        fontFamily:
                          'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                        textAnchor: 'middle',
                        fontWeight: 'bold',
                      }}
                      fontSize={14}
                      x={x(USBondYield)}
                      y={40}
                      dy={-15}
                    >
                      {USBondYield}
                    </text>
                  </g>
                ) : null}
                <circle
                  cx={x(averageData[d]) as number}
                  cy={40}
                  r={7.5}
                  style={{ fill: 'var(--dark-red)' }}
                />
                <circle
                  cx={x(averageData[d]) as number}
                  cy={40}
                  r={7.5}
                  style={{ fill: 'var(--dark-red)' }}
                />
                <text
                  style={{
                    fill: 'var(--dark-red)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                    textAnchor:
                      fiscalData[d] < averageData[d] ? 'start' : 'end',
                    fontWeight: 'bold',
                  }}
                  fontSize={14}
                  x={x(averageData[d]) as number}
                  y={40}
                  dy={25}
                >
                  {averageData[d].toFixed(2)}
                </text>
                {d === 'Credit rating' ? (
                  <text
                    style={{
                      fill: 'var(--dark-red)',
                      fontFamily:
                        'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                      textAnchor:
                        fiscalData[d] < averageData[d] ? 'start' : 'end',
                      fontWeight: 'bold',
                    }}
                    fontSize={14}
                    x={x(averageData[d]) as number}
                    y={40}
                    dy={40}
                  >
                    {ratings[Math.round(averageData[d]) - 1]}
                  </text>
                ) : null}
                {d === 'DSA Risk' ? (
                  <text
                    style={{
                      fill: 'var(--dark-red)',
                      fontFamily:
                        'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                      textAnchor:
                        fiscalData[d] < averageData[d] ? 'start' : 'end',
                      fontWeight: 'bold',
                    }}
                    fontSize={14}
                    x={x(averageData[d]) as number}
                    y={40}
                    dy={40}
                  >
                    {DSARisk[Math.round(averageData[d]) - 1]}
                  </text>
                ) : null}
                <circle
                  cx={x(fiscalData[d]) as number}
                  cy={40}
                  r={7.5}
                  style={{ fill: 'var(--blue-700)' }}
                />
                <text
                  style={{
                    fill: 'var(--blue-700)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                    textAnchor:
                      fiscalData[d] > averageData[d] ? 'start' : 'end',
                    fontWeight: 'bold',
                  }}
                  fontSize={14}
                  x={x(fiscalData[d]) as number}
                  y={40}
                  dy={25}
                >
                  {fiscalData[d].toFixed(2)}
                </text>
                {d === 'Credit rating' ? (
                  <text
                    style={{
                      fill: 'var(--blue-700)',
                      fontFamily:
                        'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                      textAnchor:
                        fiscalData[d] > averageData[d] ? 'start' : 'end',
                      fontWeight: 'bold',
                    }}
                    fontSize={14}
                    x={x(fiscalData[d]) as number}
                    y={40}
                    dy={40}
                  >
                    {ratings[Math.round(fiscalData[d]) - 1]}
                  </text>
                ) : null}
                {d === 'DSA Risk' ? (
                  <text
                    style={{
                      fill: 'var(--blue-700)',
                      fontFamily:
                        'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                      textAnchor:
                        fiscalData[d] > averageData[d] ? 'start' : 'end',
                      fontWeight: 'bold',
                    }}
                    fontSize={14}
                    x={x(fiscalData[d]) as number}
                    y={40}
                    dy={40}
                  >
                    {DSARisk[Math.round(fiscalData[d]) - 1]}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
}
