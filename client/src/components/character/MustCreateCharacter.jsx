import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ContentBox from "../custom/ContentBox/ContentBox";

function MustCreateCharacter() {
    const content = (
        <Fragment>
            <p>
                In order to perform this action you need, at least, one
                character
            </p>
            <div className="buttons__box">
                <Link className="button" to="/characters/new">
                    Create Character
                </Link>
            </div>
        </Fragment>
    );

    return (
        <div>
            <ContentBox
                width="370"
                title="Create a character"
                content={content}
            ></ContentBox>
        </div>
    );
}

export default MustCreateCharacter;
