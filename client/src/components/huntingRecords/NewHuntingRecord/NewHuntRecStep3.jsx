import React, { Fragment, useState, useEffect } from "react";
import ContentBox from "../../custom/ContentBox/ContentBox";
import FormBox from "../../custom/FormBox/FormBox";
import Imbuements from "../../../assets/objects/Imbuements.json";
import Charms from "../../../assets/objects/Charms.json";
import "./NewHuntingRecord.scss";

const NewHuntRecStep3 = ({
    huntingRecordId,
    navigation,
    preys,
    setPreys,
    imbuements,
    setImbuements,
    charms,
    setCharms,
}) => {
    const { next, previous } = navigation;
    const preyOptions = [
        "",
        "Experience",
        "Loot",
        "Damage Reduction",
        "Damage Boost",
    ];
    const handlePreysChange = (e) => {
        const newArray = preys;
        let index = parseInt(e.target.name);
        newArray[index] = e.target.value;
        setPreys(newArray);
    };
    const preysForm = (
        <div className="form preys">
            <div className="form-input-row">
                <select name="0" value={preys[0]} onChange={handlePreysChange}>
                    {preyOptions.map((bonus, index) => {
                        return (
                            <option key={index} value={bonus}>
                                {bonus}
                            </option>
                        );
                    })}
                </select>
                <select name="1" value={preys[1]} onChange={handlePreysChange}>
                    {preyOptions.map((bonus, index) => {
                        return (
                            <option key={index} value={bonus}>
                                {bonus}
                            </option>
                        );
                    })}
                </select>
                <select name="2" value={preys[2]} onChange={handlePreysChange}>
                    {preyOptions.map((bonus, index) => {
                        return (
                            <option key={index} value={bonus}>
                                {bonus}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
    const [selectedImbuement, setSelectedImbuement] = useState({
        name: "Basic Scorch",
    });

    const removeIndexImbuement = (e, index) => {
        const newArray = [...imbuements];
        newArray.splice(index, 1);
        setImbuements(newArray);
    };
    const attackImbuements = Imbuements.filter(
        (imbuement) => imbuement.type === "Attack"
    );
    const protectiveImbuements = Imbuements.filter(
        (imbuement) => imbuement.type === "Protective"
    );
    const supportImbuements = Imbuements.filter(
        (imbuement) => imbuement.type === "Support"
    );
    const skillsImbuements = Imbuements.filter(
        (imbuement) => imbuement.type === "Skills"
    );

    const imbuementsForm = (
        <div className="form imbuements">
            <div className="form-input-row">
                <div className="flex-row">
                    <select
                        name="name"
                        onChange={(e) =>
                            setSelectedImbuement({
                                ...selectedImbuement,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <optgroup label="Attack">
                            {attackImbuements.map((imbuement, index) => {
                                return (
                                    <option key={index} value={imbuement.name}>
                                        {imbuement.name}
                                    </option>
                                );
                            })}
                        </optgroup>
                        <optgroup label="Protective">
                            {protectiveImbuements.map((imbuement, index) => {
                                return (
                                    <option key={index} value={imbuement.name}>
                                        {imbuement.name}
                                    </option>
                                );
                            })}
                        </optgroup>
                        <optgroup label="Support">
                            {supportImbuements.map((imbuement, index) => {
                                return (
                                    <option key={index} value={imbuement.name}>
                                        {imbuement.name}
                                    </option>
                                );
                            })}
                        </optgroup>
                        <optgroup label="Skills">
                            {skillsImbuements.map((imbuement, index) => {
                                return (
                                    <option key={index} value={imbuement.name}>
                                        {imbuement.name}
                                    </option>
                                );
                            })}
                        </optgroup>
                    </select>
                    <input
                        type="number"
                        min="1"
                        name="ammount"
                        onChange={(e) =>
                            setSelectedImbuement({
                                ...selectedImbuement,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <i
                        className="fas fa-plus-circle"
                        onClick={() => {
                            if (selectedImbuement.ammount &&
                                selectedImbuement.ammount >= 1) {
                                setImbuements(imbuements.concat(selectedImbuement))
                            } else {
                                selectedImbuement.ammount = 1;
                                setImbuements(imbuements.concat(selectedImbuement))
                            }
                        }}
                    />
                </div>
            </div>
            <div className="form-input-row">
                {imbuements &&
                    imbuements.map((imbuement, index) => {
                        return (
                            <p
                                key={index}
                                onClick={(e) => removeIndexImbuement(e, index)}
                            >
                                {imbuement.name} x {imbuement.ammount}
                            </p>
                        );
                    })}
            </div>
        </div>
    );

    const [selectedCharm, setSelectedCharm] = useState("Wound");
    const removeIndexCharm = (e, index) => {
        const newArray = [...charms];
        newArray.splice(index, 1);
        setCharms(newArray);
    };
    const charmsForm = (
        <div className="form charms">
            <div className="form-input-row">
                <div className="flex-row">
                    <select
                        name="name"
                        onChange={(e) => setSelectedCharm(e.target.value)}
                    >
                        {Charms.map((charm, index) => {
                            return (
                                <option key={index} value={charm.name}>
                                    {charm.name}
                                </option>
                            );
                        })}
                    </select>
                    <i
                        className="fas fa-plus-circle"
                        onClick={() => setCharms(charms.concat(selectedCharm))}
                    />
                </div>
            </div>
            <div className="form-input-row">
                {charms &&
                    charms.map((charm, index) => {
                        return (
                            <p
                                key={index}
                                onClick={(e) => removeIndexCharm(e, index)}
                            >
                                {charm}
                            </p>
                        );
                    })}
            </div>
        </div>
    );

    const content = (
        <Fragment>
            <div id="formContainer">
                <FormBox
                    title="Preys"
                    imgSrc="../images/Demon_Trophy.gif"
                    form={preysForm}
                    margin="10px"
                />
                <FormBox
                    title="Imbuements"
                    imgSrc="../images/Fire_Sword.gif"
                    form={imbuementsForm}
                    margin="10px"
                />
                <FormBox
                    title="Charms"
                    imgSrc="../images/Charm_Expansion.png"
                    form={charmsForm}
                    margin="10px"
                />
            </div>

            <div className="buttons_NHR">
                <button className="button" onClick={previous}>
                    Back
                </button>
                <button className="button" onClick={next}>
                    Next
                </button>
            </div>

            <div className="nextPage">
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="fas fa-circle"></i>
                <i className="far fa-circle"></i>
            </div>
        </Fragment>
    );

    return (
        <ContentBox
            width="1000px"
            title={
                huntingRecordId ? "Edit Hunting Record" : "New Hunting Record"
            }
            content={content}
        />
    );
};

export default NewHuntRecStep3;
