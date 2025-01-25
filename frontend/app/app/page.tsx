'use client';
import ReactECharts from 'echarts-for-react';

const AppLandingPage = () => {
  // Define the options for the chart
  const chartOptions = {
    title: {
      text: 'Basic ECharts Example',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: '#4caf50',
        },
      },
    ],
  };

  return (
    <div className="flex flex-col grow">
      <h1 className="text-2xl font-bold mb-4">App Landing Page</h1>
      <div className="grid grid-cols-1 gap-4 bg-red-200 p-4 rounded">
        <div className="bg-green-200 p-4 rounded">
          <span className="font-semibold">Mon</span>
        </div>
        <ReactECharts
          option={chartOptions}
          style={{ height: '400px', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default AppLandingPage;
