/**
 * Country data for cg-phone-input.
 * Sourced from ITU-T E.164 + ISO-3166-1 alpha-2.
 *
 * `flag` uses unicode regional-indicator symbols — renders as the country flag
 * via the OS/browser font (no SVG bundle). Length is reasonable (~250 entries).
 *
 * `format` is an optional human-friendly placeholder; numbers are E.164 only at
 * emit time. Spaces in `format` are display hints, not validation.
 */

export interface Country {
  /** ISO-3166-1 alpha-2 (e.g. "US", "BR"). */
  iso2: string;
  /** Display name in English. */
  name: string;
  /** International dial code without the leading "+" (e.g. "1", "55", "44"). */
  dialCode: string;
  /** Unicode flag emoji. */
  flag: string;
  /** Optional national-number placeholder hint. */
  format?: string;
  /** Min digits in the national number (excluding dial code). */
  minLength?: number;
  /** Max digits in the national number. */
  maxLength?: number;
}

const C = (
  iso2: string,
  name: string,
  dialCode: string,
  format?: string,
  minLength?: number,
  maxLength?: number,
): Country => {
  const cp = iso2
    .toUpperCase()
    .split('')
    .map(ch => 0x1f1e6 + ch.charCodeAt(0) - 65);
  const flag = String.fromCodePoint(...cp);
  const out: Country = { iso2, name, dialCode, flag };
  if (format !== undefined) out.format = format;
  if (minLength !== undefined) out.minLength = minLength;
  if (maxLength !== undefined) out.maxLength = maxLength;
  return out;
};

export const COUNTRIES: Country[] = [
  C('AF', 'Afghanistan', '93', '70 123 4567', 9, 9),
  C('AL', 'Albania', '355', '67 212 3456', 9, 9),
  C('DZ', 'Algeria', '213', '551 23 45 67', 9, 9),
  C('AS', 'American Samoa', '1684', '684-733-1234', 7, 7),
  C('AD', 'Andorra', '376', '312 345', 6, 9),
  C('AO', 'Angola', '244', '923 123 456', 9, 9),
  C('AI', 'Anguilla', '1264', '264-235-1234', 7, 7),
  C('AG', 'Antigua and Barbuda', '1268', '268-464-1234', 7, 7),
  C('AR', 'Argentina', '54', '11 1234-5678', 10, 11),
  C('AM', 'Armenia', '374', '77 123456', 8, 8),
  C('AW', 'Aruba', '297', '560 1234', 7, 7),
  C('AU', 'Australia', '61', '412 345 678', 9, 9),
  C('AT', 'Austria', '43', '664 123456', 10, 11),
  C('AZ', 'Azerbaijan', '994', '40 123 45 67', 9, 9),
  C('BS', 'Bahamas', '1242', '242-359-1234', 7, 7),
  C('BH', 'Bahrain', '973', '3600 1234', 8, 8),
  C('BD', 'Bangladesh', '880', '1812-345678', 10, 10),
  C('BB', 'Barbados', '1246', '246-250-1234', 7, 7),
  C('BY', 'Belarus', '375', '29 491-19-11', 9, 9),
  C('BE', 'Belgium', '32', '470 12 34 56', 9, 9),
  C('BZ', 'Belize', '501', '622-1234', 7, 7),
  C('BJ', 'Benin', '229', '90 01 12 34', 8, 8),
  C('BM', 'Bermuda', '1441', '441-370-1234', 7, 7),
  C('BT', 'Bhutan', '975', '17 12 34 56', 8, 8),
  C('BO', 'Bolivia', '591', '71234567', 8, 8),
  C('BA', 'Bosnia and Herzegovina', '387', '61 123 456', 8, 9),
  C('BW', 'Botswana', '267', '71 123 456', 8, 8),
  C('BR', 'Brazil', '55', '11 96123-4567', 10, 11),
  C('IO', 'British Indian Ocean Territory', '246', '380 1234', 7, 7),
  C('VG', 'British Virgin Islands', '1284', '284-300-1234', 7, 7),
  C('BN', 'Brunei', '673', '712 3456', 7, 7),
  C('BG', 'Bulgaria', '359', '48 123 456', 9, 9),
  C('BF', 'Burkina Faso', '226', '70 12 34 56', 8, 8),
  C('BI', 'Burundi', '257', '79 56 12 34', 8, 8),
  C('KH', 'Cambodia', '855', '91 234 567', 8, 9),
  C('CM', 'Cameroon', '237', '6 71 23 45 67', 9, 9),
  C('CA', 'Canada', '1', '(506) 234-5678', 10, 10),
  C('CV', 'Cape Verde', '238', '991 12 34', 7, 7),
  C('KY', 'Cayman Islands', '1345', '345-323-1234', 7, 7),
  C('CF', 'Central African Republic', '236', '70 01 23 45', 8, 8),
  C('TD', 'Chad', '235', '63 01 23 45', 8, 8),
  C('CL', 'Chile', '56', '2 2123 4567', 9, 9),
  C('CN', 'China', '86', '131 2345 6789', 11, 11),
  C('CO', 'Colombia', '57', '321 1234567', 10, 10),
  C('KM', 'Comoros', '269', '321 23 45', 7, 7),
  C('CG', 'Congo', '242', '06 123 4567', 9, 9),
  C('CD', 'Congo, DRC', '243', '991 234 567', 9, 9),
  C('CK', 'Cook Islands', '682', '71 234', 5, 5),
  C('CR', 'Costa Rica', '506', '8312 3456', 8, 8),
  C('CI', "Côte d'Ivoire", '225', '01 23 45 67 89', 10, 10),
  C('HR', 'Croatia', '385', '92 123 4567', 8, 9),
  C('CU', 'Cuba', '53', '5 1234567', 8, 8),
  C('CW', 'Curaçao', '599', '9 518 1234', 7, 8),
  C('CY', 'Cyprus', '357', '96 123456', 8, 8),
  C('CZ', 'Czech Republic', '420', '601 123 456', 9, 9),
  C('DK', 'Denmark', '45', '32 12 34 56', 8, 8),
  C('DJ', 'Djibouti', '253', '77 83 10 01', 8, 8),
  C('DM', 'Dominica', '1767', '767-225-1234', 7, 7),
  C('DO', 'Dominican Republic', '1', '809-234-5678', 10, 10),
  C('EC', 'Ecuador', '593', '99 123 4567', 9, 9),
  C('EG', 'Egypt', '20', '100 123 4567', 10, 10),
  C('SV', 'El Salvador', '503', '7012 3456', 8, 8),
  C('GQ', 'Equatorial Guinea', '240', '222 123 456', 9, 9),
  C('ER', 'Eritrea', '291', '7 123 456', 7, 7),
  C('EE', 'Estonia', '372', '5123 4567', 7, 8),
  C('SZ', 'Eswatini', '268', '7612 3456', 8, 8),
  C('ET', 'Ethiopia', '251', '91 123 4567', 9, 9),
  C('FK', 'Falkland Islands', '500', '51234', 5, 5),
  C('FO', 'Faroe Islands', '298', '211234', 6, 6),
  C('FJ', 'Fiji', '679', '701 2345', 7, 7),
  C('FI', 'Finland', '358', '41 234 5678', 9, 11),
  C('FR', 'France', '33', '6 12 34 56 78', 9, 9),
  C('GF', 'French Guiana', '594', '694 12 34 56', 9, 9),
  C('PF', 'French Polynesia', '689', '40 12 34 56', 8, 8),
  C('GA', 'Gabon', '241', '06 03 12 34', 7, 8),
  C('GM', 'Gambia', '220', '301 2345', 7, 7),
  C('GE', 'Georgia', '995', '555 12 34 56', 9, 9),
  C('DE', 'Germany', '49', '1512 3456789', 10, 11),
  C('GH', 'Ghana', '233', '23 123 4567', 9, 9),
  C('GI', 'Gibraltar', '350', '5713 4567', 8, 8),
  C('GR', 'Greece', '30', '691 234 5678', 10, 10),
  C('GL', 'Greenland', '299', '22 12 34', 6, 6),
  C('GD', 'Grenada', '1473', '473-403-1234', 7, 7),
  C('GP', 'Guadeloupe', '590', '690 30-1234', 9, 9),
  C('GU', 'Guam', '1671', '671-300-1234', 7, 7),
  C('GT', 'Guatemala', '502', '5123 4567', 8, 8),
  C('GG', 'Guernsey', '44', '7781 123456', 10, 10),
  C('GN', 'Guinea', '224', '601 12 34 56', 9, 9),
  C('GW', 'Guinea-Bissau', '245', '955 012 345', 9, 9),
  C('GY', 'Guyana', '592', '609 1234', 7, 7),
  C('HT', 'Haiti', '509', '34 10 1234', 8, 8),
  C('HN', 'Honduras', '504', '9123-4567', 8, 8),
  C('HK', 'Hong Kong', '852', '5123 4567', 8, 8),
  C('HU', 'Hungary', '36', '20 123 4567', 9, 9),
  C('IS', 'Iceland', '354', '611 1234', 7, 9),
  C('IN', 'India', '91', '81234 56789', 10, 10),
  C('ID', 'Indonesia', '62', '812-345-678', 9, 12),
  C('IR', 'Iran', '98', '912 345 6789', 10, 10),
  C('IQ', 'Iraq', '964', '791 234 5678', 10, 10),
  C('IE', 'Ireland', '353', '85 012 3456', 9, 9),
  C('IM', 'Isle of Man', '44', '7924 123456', 10, 10),
  C('IL', 'Israel', '972', '50-234-5678', 9, 9),
  C('IT', 'Italy', '39', '312 345 6789', 9, 11),
  C('JM', 'Jamaica', '1876', '876-210-1234', 7, 7),
  C('JP', 'Japan', '81', '90-1234-5678', 10, 10),
  C('JE', 'Jersey', '44', '7797 712345', 10, 10),
  C('JO', 'Jordan', '962', '7 9012 3456', 9, 9),
  C('KZ', 'Kazakhstan', '7', '771 000 9998', 10, 10),
  C('KE', 'Kenya', '254', '712 123456', 9, 9),
  C('KI', 'Kiribati', '686', '72001234', 8, 8),
  C('XK', 'Kosovo', '383', '43 201 234', 8, 9),
  C('KW', 'Kuwait', '965', '500 12345', 8, 8),
  C('KG', 'Kyrgyzstan', '996', '700 123 456', 9, 9),
  C('LA', 'Laos', '856', '20 23 123 456', 10, 10),
  C('LV', 'Latvia', '371', '21 234 567', 8, 8),
  C('LB', 'Lebanon', '961', '71 123 456', 8, 8),
  C('LS', 'Lesotho', '266', '5012 3456', 8, 8),
  C('LR', 'Liberia', '231', '77 012 3456', 8, 9),
  C('LY', 'Libya', '218', '91 2345678', 9, 9),
  C('LI', 'Liechtenstein', '423', '660 234 567', 7, 9),
  C('LT', 'Lithuania', '370', '612 34567', 8, 8),
  C('LU', 'Luxembourg', '352', '628 123 456', 9, 9),
  C('MO', 'Macau', '853', '6612 3456', 8, 8),
  C('MG', 'Madagascar', '261', '32 12 345 67', 9, 9),
  C('MW', 'Malawi', '265', '991 23 45 67', 9, 9),
  C('MY', 'Malaysia', '60', '12-345 6789', 9, 10),
  C('MV', 'Maldives', '960', '771-2345', 7, 7),
  C('ML', 'Mali', '223', '65 01 23 45', 8, 8),
  C('MT', 'Malta', '356', '9696 1234', 8, 8),
  C('MH', 'Marshall Islands', '692', '235-1234', 7, 7),
  C('MQ', 'Martinique', '596', '696 30-1234', 9, 9),
  C('MR', 'Mauritania', '222', '22 12 34 56', 8, 8),
  C('MU', 'Mauritius', '230', '5251 2345', 8, 8),
  C('YT', 'Mayotte', '262', '639 01 23 45', 9, 9),
  C('MX', 'Mexico', '52', '222 123 4567', 10, 10),
  C('FM', 'Micronesia', '691', '350 1234', 7, 7),
  C('MD', 'Moldova', '373', '621 12 345', 8, 8),
  C('MC', 'Monaco', '377', '6 12 34 56 78', 8, 9),
  C('MN', 'Mongolia', '976', '8812 3456', 8, 8),
  C('ME', 'Montenegro', '382', '67 622 901', 8, 9),
  C('MS', 'Montserrat', '1664', '664-491-1234', 7, 7),
  C('MA', 'Morocco', '212', '650-123456', 9, 9),
  C('MZ', 'Mozambique', '258', '82 123 4567', 9, 9),
  C('MM', 'Myanmar', '95', '9 212 3456', 7, 10),
  C('NA', 'Namibia', '264', '81 123 4567', 9, 9),
  C('NR', 'Nauru', '674', '555 1234', 7, 7),
  C('NP', 'Nepal', '977', '984-1234567', 10, 10),
  C('NL', 'Netherlands', '31', '6 12345678', 9, 9),
  C('NC', 'New Caledonia', '687', '75.12.34', 6, 6),
  C('NZ', 'New Zealand', '64', '21 123 4567', 8, 10),
  C('NI', 'Nicaragua', '505', '8123 4567', 8, 8),
  C('NE', 'Niger', '227', '93 12 34 56', 8, 8),
  C('NG', 'Nigeria', '234', '802 123 4567', 10, 10),
  C('NU', 'Niue', '683', '4002', 4, 4),
  C('KP', 'North Korea', '850', '192 123 4567', 10, 10),
  C('MK', 'North Macedonia', '389', '72 345 678', 8, 8),
  C('MP', 'Northern Mariana Islands', '1670', '670-234-5678', 7, 7),
  C('NO', 'Norway', '47', '406 12 345', 8, 8),
  C('OM', 'Oman', '968', '9212 3456', 8, 8),
  C('PK', 'Pakistan', '92', '301 2345678', 10, 10),
  C('PW', 'Palau', '680', '620 1234', 7, 7),
  C('PS', 'Palestine', '970', '599 123 456', 9, 9),
  C('PA', 'Panama', '507', '6123-4567', 8, 8),
  C('PG', 'Papua New Guinea', '675', '7012 3456', 8, 8),
  C('PY', 'Paraguay', '595', '961 456789', 9, 9),
  C('PE', 'Peru', '51', '912 345 678', 9, 9),
  C('PH', 'Philippines', '63', '905 123 4567', 10, 10),
  C('PL', 'Poland', '48', '512 345 678', 9, 9),
  C('PT', 'Portugal', '351', '912 345 678', 9, 9),
  C('PR', 'Puerto Rico', '1', '787-234-5678', 10, 10),
  C('QA', 'Qatar', '974', '3312 3456', 8, 8),
  C('RE', 'Réunion', '262', '692 12 34 56', 9, 9),
  C('RO', 'Romania', '40', '712 034 567', 9, 9),
  C('RU', 'Russia', '7', '912 345-67-89', 10, 10),
  C('RW', 'Rwanda', '250', '720 123 456', 9, 9),
  C('KN', 'Saint Kitts and Nevis', '1869', '869-765-2917', 7, 7),
  C('LC', 'Saint Lucia', '1758', '758-284-5678', 7, 7),
  C('VC', 'Saint Vincent', '1784', '784-430-1234', 7, 7),
  C('WS', 'Samoa', '685', '72 12345', 6, 7),
  C('SM', 'San Marino', '378', '66 66 12 12', 10, 10),
  C('ST', 'São Tomé and Príncipe', '239', '981 2345', 7, 7),
  C('SA', 'Saudi Arabia', '966', '51 234 5678', 9, 9),
  C('SN', 'Senegal', '221', '70 123 45 67', 9, 9),
  C('RS', 'Serbia', '381', '60 1234567', 8, 9),
  C('SC', 'Seychelles', '248', '2 510 123', 7, 7),
  C('SL', 'Sierra Leone', '232', '25 123456', 8, 8),
  C('SG', 'Singapore', '65', '8123 4567', 8, 8),
  C('SX', 'Sint Maarten', '1721', '721-520-5678', 7, 7),
  C('SK', 'Slovakia', '421', '912 123 456', 9, 9),
  C('SI', 'Slovenia', '386', '31 234 567', 8, 8),
  C('SB', 'Solomon Islands', '677', '74 21234', 7, 7),
  C('SO', 'Somalia', '252', '7 1123456', 8, 8),
  C('ZA', 'South Africa', '27', '71 123 4567', 9, 9),
  C('KR', 'South Korea', '82', '10-1234-5678', 9, 11),
  C('SS', 'South Sudan', '211', '977 123 456', 9, 9),
  C('ES', 'Spain', '34', '612 34 56 78', 9, 9),
  C('LK', 'Sri Lanka', '94', '71 234 5678', 9, 9),
  C('SD', 'Sudan', '249', '91 123 1234', 9, 9),
  C('SR', 'Suriname', '597', '741-2345', 7, 7),
  C('SE', 'Sweden', '46', '70-123 45 67', 9, 9),
  C('CH', 'Switzerland', '41', '78 123 45 67', 9, 9),
  C('SY', 'Syria', '963', '944 567 890', 9, 9),
  C('TW', 'Taiwan', '886', '912 345 678', 9, 9),
  C('TJ', 'Tajikistan', '992', '917 12 3456', 9, 9),
  C('TZ', 'Tanzania', '255', '621 234 567', 9, 9),
  C('TH', 'Thailand', '66', '81 234 5678', 9, 9),
  C('TL', 'Timor-Leste', '670', '7721 2345', 7, 8),
  C('TG', 'Togo', '228', '90 11 23 45', 8, 8),
  C('TK', 'Tokelau', '690', '7290', 4, 4),
  C('TO', 'Tonga', '676', '771 5123', 5, 7),
  C('TT', 'Trinidad and Tobago', '1868', '868-291-5678', 7, 7),
  C('TN', 'Tunisia', '216', '20 123 456', 8, 8),
  C('TR', 'Turkey', '90', '501 234 56 78', 10, 10),
  C('TM', 'Turkmenistan', '993', '66 123456', 8, 8),
  C('TC', 'Turks and Caicos Islands', '1649', '649-231-1234', 7, 7),
  C('TV', 'Tuvalu', '688', '901234', 5, 6),
  C('UG', 'Uganda', '256', '712 345678', 9, 9),
  C('UA', 'Ukraine', '380', '50 123 4567', 9, 9),
  C('AE', 'United Arab Emirates', '971', '50 123 4567', 8, 9),
  C('GB', 'United Kingdom', '44', '7400 123456', 10, 10),
  C('US', 'United States', '1', '(201) 555-0123', 10, 10),
  C('UY', 'Uruguay', '598', '94 231 234', 8, 8),
  C('UZ', 'Uzbekistan', '998', '91 234 56 78', 9, 9),
  C('VU', 'Vanuatu', '678', '591 1234', 5, 7),
  C('VA', 'Vatican City', '39', '312 345 6789', 9, 11),
  C('VE', 'Venezuela', '58', '412-1234567', 10, 10),
  C('VN', 'Vietnam', '84', '912 345 678', 9, 10),
  C('VI', 'U.S. Virgin Islands', '1340', '340-642-1234', 7, 7),
  C('WF', 'Wallis and Futuna', '681', '50 12 34', 6, 6),
  C('YE', 'Yemen', '967', '712 345 678', 9, 9),
  C('ZM', 'Zambia', '260', '95 1234567', 9, 9),
  C('ZW', 'Zimbabwe', '263', '71 234 5678', 9, 9),
];

/** Indexed by ISO-2 (uppercase) for O(1) lookup. */
export const COUNTRIES_BY_ISO: Record<string, Country> = COUNTRIES.reduce(
  (acc, c) => {
    acc[c.iso2] = c;
    return acc;
  },
  {} as Record<string, Country>,
);

/**
 * Primary country for ambiguous dial codes — the entry that should win when
 * a number could match multiple countries (e.g. +44 → GB, GG, JE, IM).
 */
const PRIMARY_BY_DIAL: Record<string, string> = {
  '1': 'US',
  '7': 'RU',
  '39': 'IT',
  '44': 'GB',
  '47': 'NO',
  '212': 'MA',
  '262': 'RE',
  '358': 'FI',
  '590': 'GP',
  '599': 'CW',
};

/**
 * Find the most-likely country for a leading dial code in an E.164 string.
 * Resolves ambiguity by preferring (in order): an explicit `preferIso2`
 * match, the entry from `PRIMARY_BY_DIAL`, then the first definition.
 */
export function detectCountryFromValue(
  e164: string,
  preferIso2 = 'US',
): Country | undefined {
  if (!e164.startsWith('+')) return undefined;
  const digits = e164.slice(1);
  let best: Country | undefined;
  let bestLen = 0;
  for (const c of COUNTRIES) {
    if (!digits.startsWith(c.dialCode)) continue;
    if (c.dialCode.length > bestLen) {
      best = c;
      bestLen = c.dialCode.length;
      continue;
    }
    if (c.dialCode.length === bestLen && best) {
      const primary = PRIMARY_BY_DIAL[c.dialCode];
      if (c.iso2 === preferIso2) best = c;
      else if (best.iso2 !== preferIso2 && primary && c.iso2 === primary) best = c;
    }
  }
  return best;
}

/** Strip non-digit characters; useful for E.164 emit. */
export function digitsOnly(s: string): string {
  return s.replace(/\D+/g, '');
}
