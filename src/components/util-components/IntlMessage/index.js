import React from 'react';
import { useTranslation } from 'react-i18next'

const IntlMessage = ({ id, fallback }) => {

	const { t } = useTranslation()

	const translate = t(id, fallback)

	// console.log("TRANSLATE");
	// console.log(translate);
	// console.log("OVER");
	return <>{translate}</>
}

export default IntlMessage;
