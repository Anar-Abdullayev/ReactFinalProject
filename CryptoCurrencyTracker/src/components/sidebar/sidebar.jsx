import './sidebar.css'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarChartFetch, sideBarCryptoHistory } from '../../cryptoReducer/slices/sideBarSlicer/sidebarFetchs';
import LineChart from './line';
import { useEffect } from 'react';
import moment from 'moment';
import CryptoHistoryTable from './sidebarHistory';

function SideBar() {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(sideBarChartFetch(90));
        dispatch(sideBarCryptoHistory(90));
    }, [])

    const chartPriceDatePair = useSelector((state) => state.sidebarSlice.chartPriceData)

    const labels = chartPriceDatePair.map(pair => UnixTimeToFormattedTime(pair[0]))
    const chartdata = chartPriceDatePair.map(pair => pair[1])

    return (
        <div className='container'>
            <header>
                <p style={{ textAlign: 'center' }}>Bitcoin</p>
                <CloseIcon sx={{ backgroundColor: '#c94a4a', borderRadius: '15px', position: 'absolute', right: '15px', top: '15px' }} />
            </header>
            <LineChart labels={labels} chartdataset={chartdata} />
            <CryptoHistoryTable/>
        </div>
    )
}

function UnixTimeToFormattedTime(unixTime) {
    const formattedTime = moment(unixTime).format('DD-MM-YYYY HH:mm:ss')
    return formattedTime
}

export default SideBar;