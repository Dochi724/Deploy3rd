import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import axios from "axios";
import DetailPageItem from "./DetailPageItem.js";
import Nav from "./Nav.js";
import '../stylesheets/detail.scss'; 
const DetailPage = ({match}) => {
    const history = useHistory();
    const id = match.params.id
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/articles/${id}`,);
                    setItem(response.data);
                    // console.log(response.data);
                    } catch(e) {
                        console.log(e)
                    }
                    setLoading(false);
                }
                fetchData();
            }
        // console.log(last)
    ,[]);

    // 대기 중일 때
    if(loading) {
        return <div><h3>loading</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }

    return(
        <div>

            <DetailPageItem item={item} />
        </div>
    )
};

export default withRouter(DetailPage);