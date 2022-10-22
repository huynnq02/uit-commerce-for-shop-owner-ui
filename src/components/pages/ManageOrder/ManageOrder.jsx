import React, {useState, useEffect} from 'react';
import ManageOrderHeader from '../../molecules/ManageOrderHeader/ManageOrderHeader';
import TabManagerOrder from '../../molecules/TabManagerOrder/TabManagerOrder';
import { collection, doc, getDoc, getDocs  } from "firebase/firestore"; 
import {db} from '../../../firebase/firebase-config';

const ManageOrder = () => {
    // const [dataOrder, setDataOrder] = useState();


    // const _GetCollection = async () => {
    //     const testCollection = collection(db, 'listOrdered')
    //     let docCollection = await getDocs(testCollection);
    //     const docs = docCollection.docs.map((doc) => {
    //         const data = doc.data();
    //         return data;
    //     })
    //     setDataOrder(docs);
    //     // console.log(dataOrder);    
    // }
    
    
    return (
        <div className='manageOrder'>
            <ManageOrderHeader></ManageOrderHeader>
            <TabManagerOrder></TabManagerOrder>
        </div>
    );
}

export default ManageOrder;