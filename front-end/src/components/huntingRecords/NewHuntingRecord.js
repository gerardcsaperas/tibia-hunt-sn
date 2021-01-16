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