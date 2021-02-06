import React, { useState, useEffect } from "react";
import { useStep } from "react-hooks-helper";
import { API_URL, vocations } from "../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import MustCreateCharacter from "../../character/MustCreateCharacter";
import NewHuntRecStep1 from "./NewHuntRecStep1";
import NewHuntRecStep2 from "./NewHuntRecStep2";
import NewHuntRecStep3 from "./NewHuntRecStep3";
import NewHuntRecStep4 from "./NewHuntRecStep4";
import "./NewHuntingRecord.scss";

import { useSelector } from "react-redux";
import { selectUser } from "../../user/userSlice";

const steps = [
    { id: "step1" },
    { id: "step2" },
    { id: "step3" },
    { id: "step4" },
];

const NewHuntingRecord = () => {
    const { token } = useSelector(selectUser);
    const { huntingRecordId } = useParams();
    const [loading, setLoading] = useState(true);
    const [set, setSet] = useState({
        Helmets: "Leather_Helmet",
        Amulets_and_Necklaces: "Scarf",
        Armors: "Leather_Armor",
        Weapons: { name: "Rapier", type: "Sword_Weapons" },
        Shields: { name: "Wooden_Shield", type: "Shields" },
        Legs: "Leather_Legs",
        Boots: "Leather_Boots",
        Rings: "Wedding_Ring",
    });
    const [spot, setSpot] = useState({
        name: "",
        city: "",
    });
    const [characters, setCharacters] = useState([]);
    const [teamComp, setTeamComp] = useState();
    const [supplies, setSupplies] = useState([]);
    const [ammunition, setAmmunition] = useState([]);
    const [expH, setExpH] = useState();
    const [expRatio, setExpRatio] = useState(1.5);
    const [profitH, setProfitH] = useState();
    const [preys, setPreys] = useState([]);
    const [imbuements, setImbuements] = useState([]);
    const [charms, setCharms] = useState([]);
    const [specialEvent, setSpecialEvent] = useState();
    const [difficulty, setDifficulty] = useState();
    const [picture, setPicture] = useState();
    const [opComment, setOpComment] = useState();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            let response = await axios.get(`${API_URL}/character`, options);

            if (response.status === 200 && response.data) {
                setCharacters(response.data);
                setLoading(false);
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        if (huntingRecordId) {
            fetchHuntingRecord(huntingRecordId);
        }
    }, [huntingRecordId]);

    const fetchHuntingRecord = async (huntingRecordId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(
                `${API_URL}/huntingRecord/${huntingRecordId}`,
                config
            );
            if (response.status === 200) {
                let {
                    ammunition,
                    charms,
                    difficulty,
                    expH,
                    expRatio,
                    imbuements,
                    opComment,
                    preys,
                    profitH,
                    set,
                    specialEvent,
                    spot,
                    supplies,
                    teamComp,
                    huntPicture,
                } = response.data;

                setAmmunition(ammunition);
                setCharms(charms);
                setDifficulty(difficulty);
                setExpH(expH);
                setExpRatio(expRatio);
                setImbuements(imbuements);
                setOpComment(opComment);
                setPreys(preys);
                setProfitH(profitH);
                setSet(set);
                setSpecialEvent(specialEvent);
                setSpot(spot);
                setSupplies(supplies);
                setTeamComp(teamComp);
                setPicture(huntPicture);
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const postSpot = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const body = JSON.stringify(spot);
            const response = await axios.post(`${API_URL}/spot`, body, config);
            if (
                response.status === 201 ||
                (response.status === 200 && response.data)
            ) {
                return response.data._id;
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const postPicture = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const body = JSON.stringify({ data: picture });
            const response = await axios.post(
                `${API_URL}/image/huntingRecord`,
                body,
                config
            );
            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const saveHuntingRecord = async () => {
        setSaving(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            let spotId;
            if (!spot._id) {
                spotId = await postSpot();
            }

            let huntPicture;
            if (picture && picture !== "/images/default_loot.jpg") {
                huntPicture = await postPicture();
            }

            const body = {
                set,
                spot: spot._id ? spot._id : spotId,
                supplies,
                ammunition,
                imbuements,
                charms,
                preys,
                huntPicture,
                expH,
                profitH,
                expRatio,
                difficulty,
                specialEvent,
                teamComp,
                opComment,
            };

            console.log(body);

            const response = huntingRecordId
                ? await axios.put(
                      `${API_URL}/huntingRecord/${huntingRecordId}`,
                      body,
                      config
                  )
                : await axios.post(`${API_URL}/huntingRecord`, body, config);

            if (response.status === 201 && response.data) {
                setSaved(true);
                window.location.href = `/record-details/${response.data._id}`;
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = {
        huntingRecordId,
        navigation,
        set,
        setSet,
        spot,
        setSpot,
        characters,
        teamComp,
        setTeamComp,
        vocations,
        supplies,
        setSupplies,
        ammunition,
        setAmmunition,
        expH,
        setExpH,
        expRatio,
        setExpRatio,
        profitH,
        setProfitH,
        preys,
        setPreys,
        imbuements,
        setImbuements,
        charms,
        setCharms,
        specialEvent,
        setSpecialEvent,
        difficulty,
        setDifficulty,
        picture,
        setPicture,
        opComment,
        setOpComment,
        saveHuntingRecord,
        saving,
        saved,
    };

    if (loading) {
        return null;
    }

    switch (id) {
        case "step1":
            return characters.length > 0 ? (
                <NewHuntRecStep1 {...props} />
            ) : (
                <MustCreateCharacter />
            );
        case "step2":
            return <NewHuntRecStep2 {...props} />;
        case "step3":
            return <NewHuntRecStep3 {...props} />;
        case "step4":
            return <NewHuntRecStep4 {...props} />;
        default:
            return null;
    }
};

export default NewHuntingRecord;
