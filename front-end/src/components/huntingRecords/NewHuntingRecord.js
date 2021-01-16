// import React, { Fragment } from 'react';

// import { Link } from 'react-router-dom';

// import ContentBox from '../custom/ContentBox/ContentBox';
// import "./NewHuntingRecord.css";



// function NewHuntingRecord() {

//   const content = (
//     <Fragment>
    
//       <div id="formContainer">
//         <div className="set">
//           <h1 className="setTitle">Set*</h1>
//           <img className="goldenArmor" src={"../images/Golden_Armor.gif"}/>

//           <div className="setImgContainer">
//             <img src={"../images/set.jpg"}/>
//           </div>
          
//         </div>

//         <div className="location">
//           <h1 className="locationTitle">Location*</h1>
//           <img className="treasureMap" src={"../images/Treasure_Map.gif"}/>

//           <div className="locationInfo">
//             <p>City:</p>
//             <select></select>
//             <p>Spot Name:</p>
//             <select></select>
//           </div>
          
//         </div>

//         <div className="teamComp">
//           <h1 className="teamCompTitle">Team Comp*</h1>
//           <img className="partyHat" src={"../images/Party_Hat.gif"}/>

//           <div className="teamCompData">
//             <p>Your Character:</p>
//             <select></select>

//             <div className="others">
//               <div className="other">
//                 <p>Other Members:</p>
//                 <select className="otherMemberSelector"></select>
//               </div>

//               <div className="level">
//                 <p>Level:</p>
//                 <select className="otherLevelSelector"></select>
                
//               </div>
//               <i className="fas fa-plus-circle"></i>
//             </div>
           
//           </div>
//         </div>
//       </div>

//         <div className="mandatory">
//           <strong>*Mandatory information</strong>
//         </div>

//       <div className="buttons__box">
//         <Link className="button" to="/hunting-records">Next</Link>
//       </div>

//       <div className="nextPage">
//         <i class="fas fa-circle"></i>
//         <i class="far fa-circle"></i>
//         <i class="far fa-circle"></i>
//         <i class="far fa-circle"></i>
//       </div>

//     </Fragment>
//   )

//     return (
//     <ContentBox
//       width="1000px"
//       title="New Hunting Record"
//       content={content}
//     ></ContentBox>
//     )
// }

// export default NewHuntingRecord

import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import NewHuntRecStep1 from "./NewHuntRecStep1";
import NewHuntRecStep2 from "./NewHuntRecStep2";
import NewHuntRecStep3 from "./NewHuntRecStep3";
import NewHuntRecStep4 from "./NewHuntRecStep4";

import "./NewHuntingRecord.css";

const steps = [
  { id: "step1" },
  { id: "step2" },
  { id: "step3" },
  { id: "step4" }
];

const defaultData = {
  firstName: "Jane",
  lastName: "Doe",
  nickName: "Jan",
  address: "200 South Main St",
  city: "Anytown",
  state: "CA",
  zip: "90505",
  email: "email@domain.com",
  phone: "+61 4252 454 332"
};

const NewHuntingRecord = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "step1":
      return <NewHuntRecStep1 {...props} />;
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