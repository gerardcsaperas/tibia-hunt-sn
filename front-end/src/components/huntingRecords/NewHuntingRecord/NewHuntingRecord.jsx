import React, { useState, useEffect } from 'react';
import { useStep } from 'react-hooks-helper';
import { API_URL, vocations } from '../../../config';
import axios from 'axios';

import NewHuntRecStep1 from './NewHuntRecStep1';
import NewHuntRecStep2 from './NewHuntRecStep2';
import NewHuntRecStep3 from './NewHuntRecStep3';
import NewHuntRecStep4 from './NewHuntRecStep4';
import './NewHuntingRecord.scss';

import { useSelector } from 'react-redux';
import { selectUser } from '../../user/userSlice';

const steps = [ { id: 'step1' }, { id: 'step2' }, { id: 'step3' }, { id: 'step4' } ];

const NewHuntingRecord = () => {
	const { token } = useSelector(selectUser);
	const [ set, setSet ] = useState({
		Helmets: 'Leather_Helmet',
		Amulets_and_Necklaces: 'Scarf',
		Armors: 'Leather_Armor',
		Weapons: { name: 'Rapier', type: 'Sword_Weapons' },
		Shields: { name: 'Wooden_Shield', type: 'Shields' },
		Legs: 'Leather_Legs',
		Boots: 'Leather_Boots',
		Rings: 'Wedding_Ring'
	});
	const [ spot, setSpot ] = useState({
		name: '',
		city: ''
	});
	const [ characters, setCharacters ] = useState();
	const [ teamComp, setTeamComp ] = useState();
	const [ supplies, setSupplies ] = useState([]);
	const [ ammunition, setAmmunition ] = useState([]);
	const [ expH, setExpH ] = useState();
	const [ expRatio, setExpRatio ] = useState(1.5);
	const [ profitH, setProfitH ] = useState();
	const [ preys, setPreys ] = useState(['', '', '']);
	const [ imbuements, setImbuements ] = useState();
	const [ charms, setCharms ] = useState();

	const fetchCharacters = async () => {
		const options = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
		try {
			let response = await axios.get(`${API_URL}/character`, options);

			if (response.status === 200 && response.data) {
				setCharacters(response.data);
			}
		} catch (e) {
			console.error(e.message);
		}
	};

	const { step, navigation } = useStep({ initialStep: 0, steps });
	const { id } = step;

	const props = {
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
		setExpH,
		setExpRatio,
		setProfitH,
		preys,
		setPreys,
		imbuements,
		setImbuements,
		charms,
		setCharms
	};

	switch (id) {
		case 'step1':
			return <NewHuntRecStep1 {...props} />;
		case 'step2':
			return <NewHuntRecStep2 {...props} />;
		case 'step3':
			return <NewHuntRecStep3 {...props} />;
		case 'step4':
			return <NewHuntRecStep4 {...props} />;
		default:
			return null;
	}
};

export default NewHuntingRecord;
