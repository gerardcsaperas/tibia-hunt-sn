export const shortenVocation = (vocation) => {
    switch (vocation) {
        default:
            return vocation;
            break;
        case 'Elite Knight':
            return 'EK';
            break;
        case 'Royal Paladin':
            return 'RP';
            break;
        case 'Elder Druid':
            return 'ED';
            break;
        case 'Master Sorcerer':
            return 'MS';
            break;
    }
}