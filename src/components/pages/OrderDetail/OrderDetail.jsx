import React, {useEffect, useState} from 'react';
import ProductComponent from '../../molecules/ProductComponent/ProductComponent';

// import icons and images from assets
import greenIcon from '../../../assets/icons/greenDotIcon.png';
import greyIcon from '../../../assets/icons/greyDotIcon.png';
import redIcon from '../../../assets/icons/redDotIcon.png';


const OrderDetailHeader = (props) => {
    return(
        <div className='orderDetailHeader'>
            <div>
                <img src={redIcon}></img>
                <h3>Go back</h3>
            </div>
            <div className='containerIdAndStatus'>
                <h3>Order ID: 1213231231242</h3>
                <h3>Pending</h3>
            </div>
        </div>
    )
}

const DataDummy = [
    {
        name: '1',
        image: redIcon,
        productQuantities: 10,
        price: 10000,
    },
    {
        name: '2',
        image: redIcon,
        productQuantities: 2,
        price: 10000,
    },
    {
        name: '3',
        image: redIcon,
        productQuantities: 4,
        price: 10000,
    }
]

const OrderDetail = (props) => {
    props = DataDummy;
    console.log(props);
    const [dataOrder, setDataOrder] = useState(props);
    return (
        <div id='orderDetail' className='orderDetail'>
            <OrderDetailHeader></OrderDetailHeader>
            {dataOrder === undefined ? (
                <p>No data</p>
            ) : (
                dataOrder.map((e, i) => {
                    return(
                        <div className='containerOrderProducts'>
                            <img src={e.image}></img>
                            <div className='containerOrderProducts__Text'>
                                <h3>{e.name}</h3>
                                <p>{e.productQuantities}</p>
                            </div>
                            <span>{e.price}</span>
                        </div>
                    )
                })
            )}
        </div>
    );
}

export default OrderDetail;