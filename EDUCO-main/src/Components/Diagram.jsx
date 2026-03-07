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
                borderRadius : 6
            },
            {
                label: 'Timbulan Sampah (Juta Ton)',
                data: dataPencemaran.map(item => item.data.timbulan_sampah_ton / 1000000),
                backgroundColor: '#F2B50B',
                borderRadius : 6
            },
            {
                label: 'Kasus Pencemaran Air Perbulan',
                data: dataPencemaran.map(item => item.data.kasus_pencemaran_air/12),
                backgroundColor: '#25671E',
                borderRadius : 6
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Data Pencemaran Lingkungan di Indonesia' },
        },
        scales: {
            y: { beginAtZero: true },
            x: {
                grid: {
                    display: false, // Menghilangkan garis vertikal (grid lines) sumbu x
                    drawBorder: false, // Opsional: Menghilangkan garis sumbu X paling bawah
                }
            },
        }
    }

  return(
    <div className = "max-w-3xl mx-auto p-4" >
                <Bar data={data} options={options} />
    </div >
  )
}

export default Diagram