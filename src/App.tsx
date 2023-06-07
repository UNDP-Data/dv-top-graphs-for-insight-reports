import UNDPColorModule from 'undp-viz-colors';
import { Select } from 'antd';
import { useRef, useState } from 'react';
import { LineChartGraph } from './LineChartGraph';
import { SlopeGraph } from './SlopeGraph';
import { SlopeGraphPoverty } from './SlopeGraphPoverty';
import GDP2023 from './data/GDP-2023.json';
import GDP2019 from './data/GDP-2019.json';
import CarbonIntensityFromFossilFuel from './data/CarbonIntensityFromFossilFuel.json';
import CarbonIntensityFromFossilFuelAndLandUse from './data/CarbonIntensityFromFossilFuelAndLandUse.json';
import Poverty2_15 from './data/Poverty2_15.json';
import Poverty3_65 from './data/Poverty3_65.json';
import Poverty6_85 from './data/Poverty6_85.json';
import Poverty14 from './data/Poverty14.json';
import { DownloadImage } from './DownloadImages';

function App() {
  const graph1 = useRef<HTMLDivElement>(null);
  const graph2 = useRef<HTMLDivElement>(null);
  const graph3 = useRef<HTMLDivElement>(null);
  const graphCombined = useRef<HTMLDivElement>(null);
  const WorldGDPData = {
    '2019': 0.028,
    '2020': -0.029,
    '2021': 0.062,
    '2022': 0.034,
    '2023': 0.028,
    '2024': 0.03,
    '2025': 0.031,
  };
  const [selectedCountry, setSelectedCountry] = useState('IDN');
  const country = GDP2023.map(d => ({
    value: d.iso3,
    label: d.country,
  }));
  return (
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
            Growth Pathway
          </h5>
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
              Carbon Intensity
            </h5>
            <p
              className='undp-typography'
              style={{
                fontSize: '1rem',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              }}
            >
              CO2 emissions intensity of GDP (tCO2 per PPP $1,000)
            </p>
            <SlopeGraph
              data={[
                CarbonIntensityFromFossilFuel[
                  CarbonIntensityFromFossilFuel.findIndex(
                    d => d.iso3 === selectedCountry,
                  )
                ],
                CarbonIntensityFromFossilFuelAndLandUse[
                  CarbonIntensityFromFossilFuelAndLandUse.findIndex(
                    d => d.iso3 === selectedCountry,
                  )
                ],
              ]}
              svgWidth={325}
              svgHeight={300}
              colors={[UNDPColorModule.graphMainColor, 'var(--blue-300)']}
            />
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
              Poverty
            </h5>
            <p
              className='undp-typography'
              style={{
                fontSize: '1rem',
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
              }}
            >
              Percentage of the population under each threshold (PPP$ a day)
            </p>
            <SlopeGraphPoverty
              data={[
                Poverty2_15[
                  Poverty2_15.findIndex(d => d.iso3 === selectedCountry)
                ],
                Poverty3_65[
                  Poverty3_65.findIndex(d => d.iso3 === selectedCountry)
                ],
                Poverty6_85[
                  Poverty6_85.findIndex(d => d.iso3 === selectedCountry)
                ],
                Poverty14[Poverty14.findIndex(d => d.iso3 === selectedCountry)],
              ]}
              svgWidth={325}
              svgHeight={300}
              colors={[
                UNDPColorModule.categoricalColors.colors[3],
                UNDPColorModule.categoricalColors.colors[2],
                UNDPColorModule.categoricalColors.colors[1],
                UNDPColorModule.categoricalColors.colors[0],
              ]}
            />
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
  );
}

export default App;
