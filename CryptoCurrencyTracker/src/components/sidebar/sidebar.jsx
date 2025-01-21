import './sidebar.css'
import CloseIcon from '@mui/icons-material/Close';
import { Line } from 'react-chartjs-2'
import { useDispatch } from 'react-redux';


function SideBar() {
    const options = {};
    let dispatch = useDispatch('')
    const data = {};

    return (
        <div className='container'>
            <header>
                <p style={{ textAlign: 'center' }}>Bitcoin</p>
                <CloseIcon sx={{ backgroundColor: '#c94a4a', borderRadius: '15px', position: 'absolute', right: '15px', top: '15px' }} />
            </header>
            <Line options={options} data={data} />
        </div>
    )
}

export default SideBar;