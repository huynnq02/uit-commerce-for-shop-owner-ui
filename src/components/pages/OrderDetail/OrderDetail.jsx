import React from 'react';



// import icons and images from assets
import greenIcon from '../../../assets/icons/greenDotIcon.png';
import greyIcon from '../../../assets/icons/greyDotIcon.png';
import redIcon from '../../../assets/icons/redDotIcon.png';


const OrderDetailHeader = ({props}) => {
    <div className='orderDetailHeader'>
        <img></img>
        <h3>Go back</h3>
        <div className='containerIdAndStatus'>
            <h3>Order ID: 1213231231242</h3>
            <div></div>
            <h3>Pending</h3>
        </div>
    </div>
}

const orderDetailStatusView = ({props}) => {
    if (props.orderStatus === 'Pending') {
        return (
            <div className='containerPendingStatus'>
                <div>
                    <p>Pending</p>
                    <img src={redIcon} alt='Pending Icon'/>
                </div>
                <p>Your Order is in process</p>
            </div>
        )
    }
    if (props.orderStatus === 'Dispatch') {
        return (
            <div className='containerDispatchStatus'>
                <div className='containerPendingStatus'>
                    <div>
                        <p>Pending</p>
                        <img src={redIcon} alt='Pending Icon'/>
                    </div>
                    <p>Your Order is in process</p>
                </div>
                <div>
                    <img src={greenIcon} alt='Dispatch Icon'/>
                    <p>Your Order is delivery</p>
                </div>
            </div>
        )
    }
    if (props.orderStatus === 'Completed') {
        return (
            <div className='containerCompletedStatus'>
                <div className='containerDispatchStatus'>
                    <div className='containerPendingStatus'>
                        <div>
                            <p>Pending</p>
                            <img src={redIcon} alt='Pending Icon'/>
                        </div>
                    <p>Your Order is in process</p>
                    </div>
                    <div>
                        <img src={greenIcon} alt='Dispatch Icon'/>
                        <p>Your Order is delivered</p>
                    </div>
                </div>
                <div>
                    <img src={greyIcon} alt='Completed Icon'/>
                    <p>Your order has been successfully delivered</p>
                </div>
            </div>
        )
    }
    // orderStatus === 'Cancelled'
    else {
        return (
            <div className='containerCancelledStatus'>

            </div>
        )
    }
}

const OrderDetail = ({props}) => {
    return (
        <div id='orderDetail' className='orderDetail'>
            
        </div>
    );
}

export default OrderDetail;