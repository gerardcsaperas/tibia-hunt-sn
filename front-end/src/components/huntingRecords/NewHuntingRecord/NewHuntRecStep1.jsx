import React, { Fragment, useState, useEffect } from 'react';
import ContentBox from '../../custom/ContentBox/ContentBox';
import FormBox from '../../custom/FormBox/FormBox';
import { API_URL, vocations } from '../../../config';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import { nameWithoutSpace } from '../../../utils/nameWithoutSpace';
import { cityOptions } from '../../../config';
import './NewHuntingRecord.scss';

// Assets (items, supplies...)
import Amulets_and_Necklaces from '../../../assets/objects/Amulets_and_Necklaces.json';
import Armors from '../../../assets/objects/Armors.json';
import Axe_Weapons from '../../../assets/objects/Axe_Weapons.json';
import Boots from '../../../assets/objects/Boots.json';
import Club_Weapons from '../../../assets/objects/Club_Weapons.json';
import Distance_Weapons from '../../../assets/objects/Distance_Weapons.json';
import Helmets from '../../../assets/objects/Helmets.json';
import Legs from '../../../assets/objects/Legs.json';
import Quivers from '../../../assets/objects/Quivers.json';
import Rings from '../../../assets/objects/Rings.json';
import Rods from '../../../assets/objects/Rods.json';
import shields from '../../../assets/objects/Shields.json';
import Spellbooks from '../../../assets/objects/Spellbooks.json';
import Sword_Weapons from '../../../assets/objects/Sword_Weapons.json';
import Wands from '../../../assets/objects/Wands.json';

// Redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../user/userSlice';

const NewHuntRecStep1 = ({ _id, navigation, set, setSet, spot, setSpot, characters, teamComp, setTeamComp }) => {
	const { token } = useSelector(selectUser);
	const { next } = navigation;
	const ItemArrays = [ Amulets_and_Necklaces, Armors, Boots, Helmets, Legs, Rings ];
	const Weapons = [ ...Axe_Weapons, ...Club_Weapons, ...Distance_Weapons, ...Rods, ...Sword_Weapons, ...Wands ];
	const Shields = [ ...Quivers, ...shields, ...Spellbooks ];
	const [ fetchedSpots, setFetchedSpots ] = useState();
	const [ displayDropdown, setDisplayDropdown ] = useState(true);
	const [ otherMembers, setOtherMembers ] = useState({
		vocation: '',
		level: 1
	});
	const axeWeapons = Weapons.filter(weapon => weapon.type ==="Axe_Weapons")
	const clubWeapons = Weapons.filter(weapon => weapon.type ==="Club_Weapons")
	const swordWeapons = Weapons.filter(weapon => weapon.type ==="Sword_Weapons")
	const distanceWeapons = Weapons.filter(weapon => weapon.type ==="Distance_Weapons")
	const rodWeapons = Weapons.filter(weapon => weapon.type ==="Rods")
	const wandWeapons = Weapons.filter(weapon => weapon.type ==="Wands")

	const [ selectedWeapon, setSelectedWeapon ] = useState();

	const [ validStep, setValidStep ] = useState(false);
	const handleItemSelection = (type, e) => {
		setSet({
			...set,
			[type]: e.target.value
		});
	};
	const handleObjectSelection = (type, e) => {
		setSet({
			...set,
			[type]: JSON.parse(e.target.value)
		});
	};

	const equipmentForm = (
		<div className="setImgContainer">
			{ItemArrays.map((itemArray) => {
				let type = itemArray[0].type;
				return (
					<Fragment>
						{set &&
						set[type] && <img src={`../images/${type}/${set[type]}.jpg`} className={`${type}`} />}
						<select className={`${type}`} onChange={(e) => handleItemSelection(type, e)}>
							{itemArray.map((item, index) => {
								return (
									<option value={nameWithoutSpace(item.name)} key={index}>
										{item.name}
									</option>
								);
							})}
						</select>
					</Fragment>
				);
			})}
			<Fragment>
				{set &&
				set.Weapons && (
					<img src={`../images/${set.Weapons.type}/${set.Weapons.name}.jpg`} className="Weapons" />
				)}
				<select className="Weapons" onChange={(e) => handleObjectSelection('Weapons', e)}>
				{/* <select className="Weapons" onChange={(e) => setSelectedWeapon({...selectedWeapon, [e.target.name]: e.target.value})}>
				
					<optgroup label="Axe Weapons">
						{
							axeWeapons.map((weapon, index) => {
						return <option key={index} value={weapon.name}>{weapon.name}</option>
						})
						}
					</optgroup>
					<optgroup label="Club Weapons">
						{
							clubWeapons.map((weapon, index) => {
							return <option key={index} value={weapon.name}>{weapon.name}</option>
							})
						}
					</optgroup>
					<optgroup label="Sword Weapons">
						{
							swordWeapons.map((weapon, index) => {
							return <option key={index} value={weapon.name}>{weapon.name}</option>
							})
						}
					</optgroup>
					<optgroup label="Distance Weapons">
						{
							distanceWeapons.map((weapon, index) => {
							return <option key={index} value={weapon.name}>{weapon.name}</option>
							})
						}
					</optgroup>
					<optgroup label="Rods">
						{
							rodWeapons.map((weapon, index) => {
							return <option key={index} value={weapon.name}>{weapon.name}</option>
							})
						}
					</optgroup>
					<optgroup label="Wands">
						{
							wandWeapons.map((weapon, index) => {
							return <option key={index} value={weapon.name}>{weapon.name}</option>
							})
						}
					</optgroup> */}
					
					{Weapons.map((weapon, index) => {
						console.log(weapon.name)
						console.log(weapon.type)
						return (
								<option
									value={JSON.stringify({
										name: nameWithoutSpace(weapon.name),
										type: weapon.type
									})}
									key={index}
								> 
									{weapon.name}
								</option>
						);
					})}
				</select>
			</Fragment>
			<Fragment>
				{set &&
				set.Shields && (
					<img src={`../images/${set.Shields.type}/${set.Shields.name}.jpg`} className="Shields" />
				)}
				<select className="Shields" onChange={(e) => handleObjectSelection('Shields', e)}>
					{Shields.map((shield, index) => {
						return (
							<option
								value={JSON.stringify({
									name: nameWithoutSpace(shield.name),
									type: shield.type
								})}
								key={index}
							>
								{shield.name}
							</option>
						);
					})}
				</select>
			</Fragment>
		</div>
	);

	const fetchSpots = async () => {
		if (!spot.name) {
			return;
		}

		const options = {
			headers: {
				Authorization: `Bearer ${token}`
			},
			params: {
				city: spot.city || '',
				name: spot.name
			}
		};
		try {
			let response = await axios.get(`${API_URL}/spot`, options);

			if (response.status === 200 && response.data) {
				setFetchedSpots(response.data);
			}
		} catch (e) {
			console.error(e.message);
		}
	};

	const selectSpotFromDropdown = (newSpot) => {
		setDisplayDropdown(false);
		setSpot({
			...spot,
			_id: newSpot._id,
			city: newSpot.city,
			name: newSpot.name
		});
	};

	const handleSpotNameChange = (spotName) => {
		setDisplayDropdown(true);
		setSpot({
			...spot,
			name: spotName
		});
		fetchSpots(spot);
	};

	useEffect(
		() => {
			if (!teamComp || teamComp.length < 2) {
				characters && characters.length > 0 && setTeamComp([ characters[0] ]);
			}
		},
		[ characters ]
	);

	useEffect(
		() => {
			if (spot && spot.name && spot.name !== '' && spot.city && spot.city !== '') {
				setValidStep(true);
			} else {
				setValidStep(false);
			}
		},
		[ spot ]
	);

	const spotForm = (
		<Fragment>
			<div className="form spot">
				<div className="form-input-row">
					<label>City</label>
					<select name="city" value={spot.city} onChange={(e) => setSpot({ ...spot, city: e.target.value })}>
						{cityOptions.map((city, index) => {
							return (
								<option key={index} value={city}>
									{city}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-input-row">
					<label>Spot</label>
					<DebounceInput
						element="input"
						type="text"
						name="spot"
						value={spot.name}
						onChange={(e) => handleSpotNameChange(e.target.value)}
						autoComplete="off"
						minLength={0}
						debounceTimeout={300}
					/>
					<div
						className="spot-dropdown__content"
						style={spot && spot.name && displayDropdown ? { display: 'block' } : { display: 'none' }}
					>
						{fetchedSpots &&
							fetchedSpots.map((spot) => {
								return <p onClick={() => selectSpotFromDropdown(spot)}>{spot.name}</p>;
							})}
					</div>
				</div>
			</div>
		</Fragment>
	);

	const changeFirstCharTeamComp = (e) => {
		const character = JSON.parse(e.target.value)
		const newArray = [...teamComp];
		newArray.splice(0, 1, character);
		setTeamComp(newArray)
	};

	const handleOtherMembersChange = (e) => {
		setOtherMembers({
			...otherMembers,
			[e.target.name]: e.target.value
		});
	};

	const addNewMember = () => {
		if (otherMembers && otherMembers.vocation && otherMembers.level) {
			setTeamComp(teamComp.concat(otherMembers));
			setOtherMembers({
				vocation: '',
				level: 1
			});
		}
	};

	const removeIndexMember = (e, index) => {
		const newArray = [ ...teamComp ];
		newArray.splice(index, 1);
		setTeamComp(newArray);
	};

	useEffect(() => {
		console.log(characters)
	}, [characters])

	useEffect(() => {
		console.log(teamComp)
	}, [teamComp])

	const teamCompForm = (
		<div className="form teamComp">
			<div className="teamcomp-form__left">
				<div className="form-input-row">
					<label>Your Character</label>
					<select name="character" onChange={changeFirstCharTeamComp}>
						{characters &&
							characters.map((character, index) => {
								return (
									<option value={JSON.stringify(character)} key={index}>
										{character.name}
									</option>
								);
							})}
					</select>
				</div>
				<div className="form-input-row">
					<label>Other Members</label>
					<select name="vocation" value={otherMembers.vocation} onChange={handleOtherMembersChange}>
						{vocations.map((vocation, index) => {
							return (
								<option key={index} value={vocation}>
									{vocation}
								</option>
							);
						})}
					</select>
					<label>Level</label>
					<input
						type="number"
						name="level"
						min="1"
						value={otherMembers.level}
						onChange={handleOtherMembersChange}
					/>
					<i className="fas fa-plus-circle" onClick={addNewMember} />
				</div>
			</div>
			<div className="teamcomp-form__right">
				<label>
					<strong>Team</strong>
				</label>
				{teamComp &&
					teamComp.map((char, index) => {
						return (
							<p key={index}>
								{char.vocation} {char.level}
								{index !== 0 && (
									<i
										className="fas fa-minus-circle"
										onClick={(e) => removeIndexMember(e, index)}
										style={{ paddingLeft: '5px' }}
									/>
								)}
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
					className="setForm"
					title="Set*"
					imgSrc="../images/Golden_Armor.gif"
					form={equipmentForm}
					margin="10px"
				/>
				<FormBox title="Spot*" imgSrc="../images/Treasure_Map.gif" form={spotForm} margin="10px" />
				<FormBox
					className="team-comp__form-box"
					title="Team Comp*"
					imgSrc="../images/Party_Hat.gif"
					form={teamCompForm}
					margin="10px"
				/>
			</div>

			{/* Footer Section */}
			<div className="mandatory">
				<strong>*Mandatory fields</strong>
			</div>

			<div className="buttons__box">
				<button className={validStep ? 'button' : 'disabled-button'} onClick={next} disabled={!validStep}>
					Next
				</button>
			</div>

			<div className="nextPage">
				<i class="fas fa-circle" />
				<i class="far fa-circle" />
				<i class="far fa-circle" />
				<i class="far fa-circle" />
			</div>
		</Fragment>
	);

	return <ContentBox width="1000px" title={ _id ? "Edit Hunting Record" : "New Hunting Record" } content={content} />;
};

export default NewHuntRecStep1;
