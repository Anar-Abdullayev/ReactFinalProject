import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useRef, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top', // Position of the legend (top, bottom, left, right)
        },
        title: {
            display: true,
            text: 'Daily Crypto Data', // Chart title
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Date time', // X-axis title
            },
        },
        y: {
            title: {
                display: true,
                text: 'Price (in $)', // Y-axis title
            },
        },
    },
};


function LineChart({ labels, chartdataset }) {
    const chartContainerRef = useRef(null);
    let labelLength = useRef(0)

    const [chartData, setChartData] = useState({
        labels: labels,
        datasets: [
            {
                label: '1 day data',
                data: chartdataset,
                borderColor: 'red',
                backgroundColor: 'red',
                tension: 0.4,
            }
        ]
    })
    useEffect(() => {
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: '1 day data',
                    data: chartdataset,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    tension: 0.4,
                },
            ],
        });
    }, [labels, chartdataset]);

    useEffect(() => {
        const chartContainer = chartContainerRef.current;

        if (chartContainer) {
            chartContainer.addEventListener('wheel', handleScroll, { passive: false });

            return () => {
                chartContainer.removeEventListener('wheel', handleScroll);
            };
        }
    }, [chartData])

    const handleScroll = (event) => {
        event.preventDefault()
        const isScrollingUp = event.deltaY < 0;
        let updatedLabels = [...labels];
        let updatedData = [...chartdataset]
        if (isScrollingUp) {
            if (labelLength.current < labels.length-1) {
                labelLength.current = labelLength.current+1;
            }
        } else {
            if (labelLength.current > 1) {
                labelLength.current = labelLength.current-1;
            }
        }
        let sliceFrom = labelLength.current
        let sliceTo = labels.length
        updatedLabels = updatedLabels.slice(sliceFrom, sliceTo);
        updatedData = updatedData.slice(sliceFrom, sliceTo)

        setChartData((prevState) => ({
            ...prevState, 
            labels: updatedLabels,
            datasets: [
                {
                  ...prevState.datasets[0],
                  data: updatedData,
                },
              ]
        }))
    }

    return (
        <div ref={chartContainerRef} style={{ width: '100%', margin: '0 auto', height: '500px' }}>
            <Line options={options} data={chartData} style={{marginLeft: '15px'}}/>
        </div>
    )
}


export default LineChart