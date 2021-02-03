import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import ContentBox from "../custom/ContentBox/ContentBox";
import HuntSummary from "./HuntSummary";
import FiltersBox from "../custom/FiltersBox/FiltersBox";
import "./HuntingRecordsList.scss";

function AllRecords() {
    const [huntList, setHuntList] = useState();
    const [expH, setExpH] = useState("");
    const [query, setQuery] = useState({});

    useEffect(() => {
        getHuntList();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "expH") {
            setExpH(e.target.value);
        }

        setQuery({
            ...query,
            [e.target.name]: e.target.value,
        });
    };

    const getHuntList = async () => {
        try {
            const config = {};

            query && (config.params = query);

            const response = await axios.get(
                `${API_URL}/huntingRecord`,
                config
            );

            if (response.status === 200) {
                return setHuntList([...response.data]);
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const content = (
        <Fragment>
            <p>We found a bug! 🐛</p>
            <p>
                You might still be able to access{" "}
                <a href="/my-records">"My Records"</a>.
            </p>
            <p>If you're not, you're the one who caused the bug! 🌚</p>
            <p>
                Take a break from the website, go hunting for a bit and come
                back around 19:30. It should be solved by then.
            </p>
            <p>Kind Regards,</p>
            <p>Gerard</p>
        </Fragment>
        // <Fragment>
        //     <FiltersBox handleChange={handleChange} filterClick={getHuntList} />
        //     <ol className="listContainer">
        //         <li className="recordsList">
        //             {
        //                 huntList && huntList.length > 0 ?
        //                     huntList.map((huntingRecord, index) => {
        //                     return <HuntSummary data={huntingRecord} key={index} />

        //                 })
        //                  : null
        //             }
        //         </li>
        //     </ol>
        // </Fragment>
    );

    return (
        <ContentBox
            height="700px"
            width="980px"
            title="All Records"
            content={content}
        ></ContentBox>
    );
}

export default AllRecords;
