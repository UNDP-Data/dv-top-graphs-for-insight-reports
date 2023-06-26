import UNDPColorModule from 'undp-viz-colors';
import { Select } from 'antd';
import { useRef, useState } from 'react';
import { LineChartGraph } from './LineChartGraph';
import GDP2023 from './data/GDP-2023.json';
import GDP2019 from './data/GDP-2019.json';
import CarbonIntensityFromFossilFuel from './data/CarbonIntensityFromFossilFuel.json';
import CarbonIntensityFromFossilFuelAndLandUse from './data/CarbonIntensityFromFossilFuelAndLandUse.json';
import Poverty2_15 from './data/Poverty2_15.json';
import Poverty3_65 from './data/Poverty3_65.json';
import Poverty6_85 from './data/Poverty6_85.json';
import Poverty14 from './data/Poverty14.json';
import FiscalData from './data/FiscalData.json';
import { DownloadImage } from './DownloadImages';
import { SlopeGraphPovertySeparated } from './SlopeGraphPovertySeperated';
import { SlopeGraphCarbonIntensity } from './SlopeGraphCarbonIntesity';
import { RadarAndDotPlot } from './RadarAndDotPlot';

function App() {
  const graph1 = useRef<HTMLDivElement>(null);
  const graph2 = useRef<HTMLDivElement>(null);
  const graph3 = useRef<HTMLDivElement>(null);
  const graphCombined = useRef<HTMLDivElement>(null);
  const FiscalRadarGraph = useRef<HTMLDivElement>(null);
  const WorldGDPData = {
    '2019': 0.028,
    '2020': -0.029,
    '2021': 0.062,
    '2022': 0.034,
    '2023': 0.028,
    '2024': 0.03,
    '2025': 0.031,
  };
  const AverageFiscalData = [
    {
      iso: 'LIDC',
      'Resource revenue (% of revenue)': 12.5,
      'Revenue (% of GDP)': 14.9,
      'Government debt (% of GDP)': 48.3,
      'Natural resources rents (% of GDP)': 9.8,
      'Total external debt servicing (% of revenue)': 14.06,
      'Credit rating': 6.5,
      '10-year bond yield (%)': 15.7416,
      'DSA Rating': 2.5,
    },
    {
      iso: 'EMMIE',
      'Resource revenue (% of revenue)': 17.6,
      'Revenue (% of GDP)': 26,
      'Government debt (% of GDP)': 68.8,
      'Natural resources rents (% of GDP)': 7.6,
      'Total external debt servicing (% of revenue)': 12.26,
      'Credit rating': 9.44,
      '10-year bond yield (%)': 9.321433333,
      'DSA Rating': 2.7,
    },
    {
      iso: 'Advanced Economy',
      'Resource revenue (% of revenue)': 0.2,
      'Revenue (% of GDP)': 38.8,
      'Government debt (% of GDP)': 70.2,
      'Natural resources rents (% of GDP)': 1,
      'Total external debt servicing (% of revenue)': 5.38,
      'Credit rating': 17.9,
      '10-year bond yield (%)': 3.354942857,
      'DSA Rating': null,
    },
  ];
  const [selectedCountry, setSelectedCountry] = useState('IDN');
  const country = GDP2023.map(d => ({
    value: d.iso3,
    label: d.country,
  }));
  return (
    <div>
      <div
        className='undp-container flex-div flex-wrap flex-hor-align-center margin-top-13 margin-bottom-13'
        style={{ maxWidth: '740px' }}
      >
        <Select
          className='undp-select margin-bottom-09'
          style={{ width: '100%' }}
          placeholder='Please select'
          defaultValue='All STEEP+V'
          value={selectedCountry}
          showSearch
          onChange={values => {
            setSelectedCountry(values);
          }}
        >
          {country.map(d => (
            <Select.Option className='undp-select-option' key={d.value}>
              {d.label}
            </Select.Option>
          ))}
        </Select>
        <div ref={graphCombined}>
          <div
            style={{
              padding: '2rem',
              backgroundColor: UNDPColorModule.graphBackgroundColor,
            }}
            ref={graph1}
          >
            <h5
              className='undp-typography'
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'var(--blue-600)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              GDP
            </h5>
            <p
              className='undp-typography'
              style={{
                fontSize: '1rem',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              }}
            >
              <span className='bold'>Growth Pathways</span>
            </p>
            <LineChartGraph
              data2023={
                GDP2023[GDP2023.findIndex(d => d.iso3 === selectedCountry)]
              }
              data2019={
                GDP2019[GDP2019.findIndex(d => d.iso3 === selectedCountry)]
              }
              dataWorld={WorldGDPData}
              svgWidth={730}
              svgHeight={480}
              strokeWidth={3}
            />
            <div
              className='margin-top-05 small-font'
              style={{
                color: 'var(--gray-600)',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              }}
            >
              Source: IMF World Economic Outlook (WEO) (April 2023 and October
              2019).
            </div>
          </div>
          <div className='flex-div flex-space-between margin-top-05'>
            <div
              style={{
                padding: '2rem',
                backgroundColor: UNDPColorModule.graphBackgroundColor,
              }}
              ref={graph3}
            >
              <h5
                className='undp-typography'
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: 'var(--blue-600)',
                  fontFamily:
                    'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                People
              </h5>
              <p
                className='undp-typography'
                style={{
                  fontSize: '1rem',
                  fontFamily:
                    'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                }}
              >
                <span className='bold'>Poverty</span>: Percentage of the
                population under each threshold (PPP$ a day)
              </p>
              {Poverty2_15.findIndex(d => d.iso3 === selectedCountry) === -1 &&
              Poverty3_65.findIndex(d => d.iso3 === selectedCountry) === -1 &&
              Poverty6_85.findIndex(d => d.iso3 === selectedCountry) === -1 &&
              Poverty14.findIndex(d => d.iso3 === selectedCountry) === -1 ? (
                <p className='undp-typography bold'>Data Not Available</p>
              ) : (
                <SlopeGraphPovertySeparated
                  data={[
                    Poverty2_15.findIndex(d => d.iso3 === selectedCountry) !==
                    -1
                      ? Poverty2_15[
                          Poverty2_15.findIndex(d => d.iso3 === selectedCountry)
                        ]
                      : undefined,
                    Poverty3_65.findIndex(d => d.iso3 === selectedCountry) !==
                    -1
                      ? Poverty3_65[
                          Poverty3_65.findIndex(d => d.iso3 === selectedCountry)
                        ]
                      : undefined,
                    Poverty6_85.findIndex(d => d.iso3 === selectedCountry) !==
                    -1
                      ? Poverty6_85[
                          Poverty6_85.findIndex(d => d.iso3 === selectedCountry)
                        ]
                      : undefined,
                    Poverty14.findIndex(d => d.iso3 === selectedCountry) !== -1
                      ? Poverty14[
                          Poverty14.findIndex(d => d.iso3 === selectedCountry)
                        ]
                      : undefined,
                  ]}
                  svgWidth={325}
                  svgHeight={300}
                />
              )}
              <div
                className='margin-top-05 small-font'
                style={{
                  color: 'var(--gray-600)',
                  fontFamily:
                    'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                }}
              >
                Source: Projections based on binned distributions ($0.10-bins,
                2017 PPP) reconstructed from the World Bank&apos;s Poverty and
                Inequality Platform through the pip: Stata Module.
              </div>
            </div>
            <div
              style={{
                padding: '2rem',
                backgroundColor: UNDPColorModule.graphBackgroundColor,
              }}
              ref={graph2}
            >
              <h5
                className='undp-typography'
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: 'var(--blue-600)',
                  fontFamily:
                    'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                Planet
              </h5>
              <p
                className='undp-typography'
                style={{
                  fontSize: '1rem',
                  fontFamily:
                    'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                }}
              >
                <span className='bold'>Carbon Intensity</span>: CO2 emissions
                intensity of GDP (tCO2 per PPP $1,000)
              </p>
              {CarbonIntensityFromFossilFuel.findIndex(
                d => d.iso3 === selectedCountry,
              ) === -1 &&
              CarbonIntensityFromFossilFuelAndLandUse.findIndex(
                d => d.iso3 === selectedCountry,
              ) === -1 ? (
                <p className='undp-typography bold'>Data Not Available</p>
              ) : (
                <SlopeGraphCarbonIntensity
                  data={[
                    CarbonIntensityFromFossilFuel.findIndex(
                      d => d.iso3 === selectedCountry,
                    ) === -1
                      ? undefined
                      : CarbonIntensityFromFossilFuel[
                          CarbonIntensityFromFossilFuel.findIndex(
                            d => d.iso3 === selectedCountry,
                          )
                        ],
                    CarbonIntensityFromFossilFuelAndLandUse.findIndex(
                      d => d.iso3 === selectedCountry,
                    ) === -1
                      ? undefined
                      : CarbonIntensityFromFossilFuelAndLandUse[
                          CarbonIntensityFromFossilFuelAndLandUse.findIndex(
                            d => d.iso3 === selectedCountry,
                          )
                        ],
                  ]}
                  svgWidth={325}
                  svgHeight={300}
                />
              )}
              <div
                className='margin-top-05 small-font'
                style={{
                  color: 'var(--gray-600)',
                  fontFamily:
                    'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                }}
              >
                Source: Projections based on GDP data from the IMF WEO Database
                (April 2023), and on CO2 emissions from the Global Carbon Budget
                2022 and EDGAR (JRC and IEA).
              </div>
            </div>
          </div>
        </div>
        <button
          className='undp-button tertiary-button'
          type='button'
          style={{ color: 'var(--blue-600)', padding: 0 }}
          onClick={() => {
            if (graph1.current) {
              DownloadImage(graph1.current, 'GDP Chart');
            }
            if (graph2.current) {
              DownloadImage(graph2.current, 'Carbon Intensity');
            }
            if (graph3.current) {
              DownloadImage(graph3.current, 'Poverty');
            }
            if (graphCombined.current) {
              DownloadImage(graphCombined.current, 'Combined Graphs');
            }
          }}
        >
          Download All Graphs
        </button>
      </div>
      <div
        className='margin-top-13 margin-bottom-13'
        style={{ maxWidth: '740px', margin: 'auto' }}
      >
        <div
          className='margin-bottom-07'
          style={{
            padding: '2rem',
            backgroundColor: UNDPColorModule.graphBackgroundColor,
          }}
          ref={FiscalRadarGraph}
        >
          {FiscalData.findIndex(d => d.iso === selectedCountry) !== -1 ? (
            <>
              <RadarAndDotPlot
                fiscalData={
                  FiscalData[
                    FiscalData.findIndex(d => d.iso === selectedCountry)
                  ]
                }
                averageData={
                  AverageFiscalData[
                    AverageFiscalData.findIndex(
                      d =>
                        d.iso ===
                        FiscalData[
                          FiscalData.findIndex(el => el.iso === selectedCountry)
                        ]['IMF country grouping'],
                    )
                  ]
                }
                svgWidth={656}
                svgHeight={800}
              />
              {FiscalData[FiscalData.findIndex(d => d.iso === selectedCountry)][
                'notes/sources'
              ]
                .split('Sources: ')[0]
                .replace('Notes: ', '').length === 0 ? null : (
                <div
                  className='margin-top-05 small-font'
                  style={{
                    color: 'var(--gray-600)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                  }}
                >
                  <span className='bold'>Notes: </span>
                  {FiscalData[
                    FiscalData.findIndex(d => d.iso === selectedCountry)
                  ]['notes/sources']
                    .split('Sources: ')[0]
                    .replace('Notes: ', '')}
                </div>
              )}
              {FiscalData[FiscalData.findIndex(d => d.iso === selectedCountry)][
                'notes/sources'
              ].split('Sources: ')[1].length === 0 ? null : (
                <div
                  className='margin-top-03 small-font'
                  style={{
                    color: 'var(--gray-600)',
                    fontFamily:
                      'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                  }}
                >
                  <span className='bold'>Sources: </span>
                  {
                    FiscalData[
                      FiscalData.findIndex(d => d.iso === selectedCountry)
                    ]['notes/sources'].split('Sources: ')[1]
                  }
                </div>
              )}
            </>
          ) : (
            <p
              className='undp-typography bold margin-bottom-00'
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              }}
            >
              Fiscal Data Not Available
            </p>
          )}
        </div>
        <button
          className='undp-button tertiary-button'
          type='button'
          style={{ color: 'var(--blue-600)', padding: 0 }}
          onClick={() => {
            if (FiscalRadarGraph.current) {
              DownloadImage(FiscalRadarGraph.current, 'Fiscal Chart');
            }
          }}
        >
          Download Above Graphs
        </button>
      </div>
    </div>
  );
}

export default App;
