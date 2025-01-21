import './sidebar.css'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarChartFetch, sideBarCryptoHistory } from '../../cryptoReducer/slices/sideBarSlicer/sidebarFetchs';
import LineChart from './line';
import { useEffect } from 'react';
import moment from 'moment';
import CryptoHistoryTable from './sidebarHistory';
import { setCrpytoInfoVisibility } from '../../cryptoReducer/slices/sideBarSlicer/sidebarSlicer';

function SideBar() {
    let dispatch = useDispatch();

    const cryptoInfo = useSelector((state) => state.sidebarSlice.crypto)
    const containerVisibility = useSelector((state) => state.sidebarSlice.visible)


    useEffect(() => {
        dispatch(sideBarChartFetch(cryptoInfo.id));
        dispatch(sideBarCryptoHistory(cryptoInfo.id));
    }, [cryptoInfo])
    const chartPriceDatePair = useSelector((state) => state.sidebarSlice.chartPriceData)

    const labels = chartPriceDatePair.map(pair => UnixTimeToFormattedTime(pair[0]))
    const chartdata = chartPriceDatePair.map(pair => pair[1])

    let classes = containerVisibility ? ' showContainer' : ' hideContainer'

    return (
        <div className={'container' + classes}>
            <header>
                <p style={{ textAlign: 'center' }}>{cryptoInfo.name} ({cryptoInfo.symbol})</p>
                <CloseIcon onClick={() => dispatch(setCrpytoInfoVisibility(false))} sx={{ backgroundColor: '#c94a4a', borderRadius: '15px', position: 'absolute', right: '15px', top: '15px', cursor: 'pointer' }} />
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