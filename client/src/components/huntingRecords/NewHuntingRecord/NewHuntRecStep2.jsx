import React, { Fragment, useEffect, useState } from "react";
import ContentBox from "../../custom/ContentBox/ContentBox";
import FormBox from "../../custom/FormBox/FormBox";
import nameWithoutSpace from "../../../utils/nameWithoutSpace";
import NumberFormat from "react-number-format";
import "./NewHuntingRecord.scss";

// Assets
import Ammunition from "../../../assets/objects/Ammunition.json";
import Potions from "../../../assets/objects/Potions.json";
import Runes from "../../../assets/objects/Runes.json";

const NewHuntRecStep2 = ({
    huntingRecordId,
    navigation,
    supplies,
    setSupplies,
    ammunition,
    setAmmunition,
    setExpRatio,
    expH,
    setExpH,
    profitH,
    setProfitH,
}) => {
    const { next, previous } = navigation;
    const Supplies = [...Runes, ...Potions];
    const [validStep, setValidStep] = useState(false);
    const [selectedSupply, setSelectedSupply] = useState({
        name: "Sudden_Death_Rune",
        type: "Runes",
    });

    const [selectedAmmunition, setSelectedAmmunition] = useState({
        name: "Arrow",
    });

    useEffect(() => {
        if (expH && profitH && expH !== "" && profitH !== "") {
            setValidStep(true);
        }
    }, [expH, profitH]);

    const handleSuppliesChange = (e, type) => {
        if (type === "supply") {
            let value = JSON.parse(e.target.value);
            setSelectedSupply({
                ...selectedSupply,
                name: value.name,
                type: value.type,
            });
        } else {
            setSelectedSupply({
                ...selectedSupply,
                [e.target.name]: e.target.value,
            });
        }
    };

    const removeIndexSupply = (e, index) => {
        const newArray = [...supplies];
        newArray.splice(index, 1);
        setSupplies(newArray);
    };

    const handleAmmunitionChange = (e) => {
        setSelectedAmmunition({
            ...selectedAmmunition,
            [e.target.name]: e.target.value,
        });
    };

    const removeIndexAmmunition = (e, index) => {
        const newArray = [...ammunition];
        newArray.splice(index, 1);
        setAmmunition(newArray);
    };

    const suppliesForm = (
        <div className="form supplies">
            <div className="form-input-row">
                <label>Supplies</label>
                <div className="flex-row">
                    <select
                        name="supply"
                        onChange={(e) => handleSuppliesChange(e, "supply")}
                    >
                        {Supplies.map((item, index) => {
                            return (
                                <option
                                    value={JSON.stringify({
                                        name: nameWithoutSpace(item.name),
                                        type: item.type,
                                    })}
                                    key={index}
                                >
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        type="number"
                        min="1"
                        name="ammount"
                        onChange={handleSuppliesChange}
                    />
                    <i
                        className="fas fa-plus-circle"
                        onClick={() =>
                            setSupplies(supplies.concat(selectedSupply))
                        }
                    />
                </div>
            </div>
            <div className="form-input-row">
                <label>Ammunition</label>
                <div className="flex-row">
                    <select name="name" onChange={handleAmmunitionChange}>
                        {Ammunition.map((item, index) => {
                            return (
                                <option
                                    value={nameWithoutSpace(item.name)}
                                    key={index}
                                >
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        name="ammount"
                        type="number"
                        min="1"
                        onChange={(e) =>
                            setSelectedAmmunition({
                                ...selectedAmmunition,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <i
                        className="fas fa-plus-circle"
                        onClick={() =>
                            setAmmunition(ammunition.concat(selectedAmmunition))
                        }
                    />
                </div>
            </div>
            <div
                className="form-input-row"
                className="supply-images__container"
            >
                {supplies &&
                    supplies.map((supply, index) => {
                        return (
                            <span
                                key={index}
                                onClick={(e) => removeIndexSupply(e, index)}
                            >
                                <img
                                    src={`../images/${supply.type}/${supply.name}.jpg`}
                                />
                                x {supply.ammount}
                            </span>
                        );
                    })}
                {ammunition &&
                    ammunition.map((ammo, index) => {
                        return (
                            <span
                                key={index}
                                onClick={(e) => removeIndexAmmunition(e, index)}
                            >
                                <img
                                    src={`../images/Ammunition/${ammo.name}.jpg`}
                                />
                                x {ammo.ammount}
                            </span>
                        );
                    })}
            </div>
        </div>
    );

    const experienceForm = (
        <div className="form experience">
            <div className="form-input-row">
                <label>Exp Ratio</label>
                <select
                    name="expRatio"
                    onChange={(e) => setExpRatio(e.target.value)}
                >
                    <option value={1}>100%</option>
                    <option value={1.5} defaultValue>
                        150% Happy Hour
                    </option>
                    <option value={2}>200% Double Exp</option>
                    <option value={2.25}>225% Happy + Boost</option>
                    <option value={3}>300% Double Exp + Happy</option>
                </select>
            </div>
            <div className="form-input-row">
                <label>Exp/h</label>
                <NumberFormat
                    value={expH}
                    thousandSeparator={true}
                    allowNegative={false}
                    suffix=" exp/h"
                    name="expH"
                    spellCheck="false"
                    autoComplete="off"
                    onValueChange={(values) => setExpH(values.value)}
                />
            </div>
        </div>
    );

    const lootForm = (
        <div className="form loot">
            <div className="form-input-row">
                <label>Profit/h</label>
                <NumberFormat
                    value={profitH}
                    thousandSeparator={true}
                    allowNegative={true}
                    suffix=" gp/h"
                    spellCheck="false"
                    autoComplete="off"
                    name="profitH"
                    onValueChange={(values) => setProfitH(values.value)}
                />
            </div>
        </div>
    );

    const content = (
        <Fragment>
            <div id="formContainer">
                <FormBox
                    title="Supplies"
                    imgSrc="../images/Backpack.gif"
                    form={suppliesForm}
                    margin="10px"
                />
                <FormBox
                    title="Experience*"
                    imgSrc="../images/XP_Boost.png"
                    form={experienceForm}
                    margin="10px"
                />
                <FormBox
                    title="Loot*"
                    imgSrc="../images/Tibia_Coins.gif"
                    form={lootForm}
                    margin="10px"
                />
            </div>

            {/* Footer Section */}
            <div className="mandatory">
                <strong>*Mandatory fields</strong>
            </div>

            <div className="buttons_NHR">
                <button className="button" onClick={previous}>
                    Back
                </button>
                <button
                    className={validStep ? "button" : "disabled-button"}
                    onClick={next}
                    disabled={!validStep}
                >
                    Next
                </button>
            </div>

            <div className="nextPage">
                <i class="far fa-circle" />
                <i class="fas fa-circle" />
                <i class="far fa-circle" />
                <i class="far fa-circle" />
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

export default NewHuntRecStep2;
