import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import dataPencemaran from '../assets/Data/DataPencemaran'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Diagram = () => {
    const labels = dataPencemaran.map(item => item.year)

    const data = {
        labels,
        datasets: [
            {
                label: 'Polusi Udara (Hari Buruk)',
                data: dataPencemaran.map(item => item.data.polusi_udara_hari_buruk),
                backgroundColor: '#48A111',
                borderRadius: 6
            },
            {
                label: 'Timbulan Sampah (Juta Ton)',
                data: dataPencemaran.map(item => item.data.timbulan_sampah_ton / 1000000),
                backgroundColor: '#F2B50B',
                borderRadius: 6
            },
            {
                label: 'Kasus Pencemaran Air Perbulan',
                data: dataPencemaran.map(item => item.data.kasus_pencemaran_air / 12),
                backgroundColor: '#25671E',
                borderRadius: 6
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Data Pencemaran Lingkungan di Indonesia' },
        },
        scales: {
            y: { beginAtZero: true },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                }
            },
        }
    }

    return (
        <div className="w-full max-w-none mx-auto py-4">
            <div className="relative w-full max-w-none h-44 sm:h-60 md:h-76 lg:h-105">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default Diagram