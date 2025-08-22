<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { useStateValue } from '../../store/store';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/button';
import { whiteLabelEnabled } from '../../utils/functions';
import ICONS from '../../../icons';
import Input from '../../components/input';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import apiFetch from '@wordpress/api-fetch';
const { restNonce } = starterTemplates;
import {
	checkRequiredPlugins,
	getDemo,
} from '../../steps/import-site/import-utils';

const LicenseValidation = ( param ) =&gt; {
	const {} = useForm( { defaultValues: { 'license-key': '' } } );
	const storedState = useStateValue();
	const [
		{ templateId, currentIndex, validateLicenseStatus, builder },
		dispatch,
	] = storedState;
	const [ alreadyPurchasedClicked, setAlreadyPurchasedClicked ] =
		useState( false );
	const [ processing, setProcessing ] = useState( false );
	const [ licenseKey, setLicenseKey ] = useState( '' );
	useEffect( () =&gt; {
		dispatch( {
			type: 'set',
			designStep: 2,
		} );
	}, [] );

	const accessLinkOutput = __(
		`Access this template and all others with Essentials &amp; Business Toolkit package starting at just $79.`,
		'astra-sites'
	);

	const alreadyPurchasedOutput = __(
		`Please enter your licence key.`,
		'astra-sites'
	);

	const getAccessLink = () =&gt; {
		window.open( astraSitesVars?.cta_links[ builder ] );
	};

	const getwhiteLabelLink = () =&gt; {
		if ( astraSitesVars?.whiteLabelUrl !== '#' ) {
			window.open( astraSitesVars?.whiteLabelUrl );
		}
	};

	const handleClick = ( event ) =&gt; {
		event.preventDefault();
		setAlreadyPurchasedClicked( true );
	};

	const validateKey = () =&gt; {
		if ( licenseKey === '' ) {
			param.setErrorCB( __( 'Please Enter License Key', 'astra-sites' ) );
			return;
		}

		setProcessing( true );

		apiFetch.use( apiFetch.createNonceMiddleware( restNonce ) );
		apiFetch( {
			path: '/bsf-core/v1/license/activate',
			method: 'POST',
			data: {
				'license-key': licenseKey,
				'product-id': 'astra-pro-sites',
			},
		} ).then( async ( response ) =&gt; {
			if ( response.success ) {
				await getDemo( templateId, storedState );
				await checkRequiredPlugins( storedState );
				dispatch( {
					type: 'set',
					licenseStatus: true,
					currentIndex: currentIndex + 1,
				} );
			} else {
				param.setErrorCB( response.message );
			}
			setProcessing( false );
		} );
	};
	const processingClass = processing ? 'processing' : '';
	const StoreLink = sprintf(
		//translators: %1$s Opening anchor tag %2$s Closing anchor tag.
		__(
			`If you have already purchased the Essential or Business Toolkit, please install the premium version of the Starter Templates plugin from our %1$sstore%2$s.`,
			'astra-sites'
		),
		`<a href="https://wpastra.com/support/free-support/" target="_blank">`,
		`</a>`
	);

	const SupportTeam = sprintf(
		//translators: %1$s Opening anchor tag %2$s Closing anchor tag.
		__(
			'Need help? feel free to get in touch with our %1$ssupport team%2$s.',
			'astra-sites'
		),
		'<a href="https://wpastra.com/support/free-support/" target="_blank">',
		'</a>'
	);

	return (
		
			</p><div classname="flex flex-col p-4 rounded-md border border-solid border-blue-500 gap-3 via-blue-500 bg-background-primary">
				<div classname="flex gap-2 flex-col">
					<div classname="flex gap-2 items-center">
						<span classname="w-5 h-5">{ ICONS.premiumIcon }</span>
						<h4 classname="text-base font-semibold text-16 leading-24 tracking-normal text-left">
							{ __( 'Premium Template', 'astra-sites' ) }
						</h4>
					</div>
					<p>
						{ ! alreadyPurchasedClicked ? accessLinkOutput : ' ' }
					</p>
				</div>
				{ alreadyPurchasedClicked &amp;&amp; ! validateLicenseStatus &amp;&amp; (
					<p>
						{ __(
							'You are currently using the Free version.',
							'astra-sites'
						) }
						<br>
						<span dangerouslysetinnerhtml="{" __html: storelink></span>
						<br>
						<span dangerouslysetinnerhtml="{" __html: supportteam></span>
					</p>
				) }

				{ alreadyPurchasedClicked &amp;&amp; validateLicenseStatus &amp;&amp; (
					
						<p>{ alreadyPurchasedOutput }</p>
						<form classname="" onsubmit="{" validatekey>
							<div style="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/onboarding/assets/src/steps/customize-site/{" position:>
								<input classname="w-full" inputclassname="pr-10" height="12" name="license-key" placeholder="{" __ key onchange="{" e> {
										setLicenseKey( e.target.value );
										param.setErrorCB( '' );
									} }
									value={ licenseKey }
								/&gt;
								<button type="button" classname="{" right-0 top-0 h-full p-1 pl-2 flex items-center justify-center cursor-pointer bg-transparent border-0 focus:outline-none processingclass onclick="{" validatekey>
									{ ! processing ? (
										<arrowrighticon classname="w-5 h-5"></arrowrighticon>
									) : (
										ICONS.spinner
									) }
								</button>
							</div>
						</form>
						<div classname="text-xs flex gap-6 flex-row">
							<p>
								<a href="https://store.brainstormforce.com/login/" target="_blank" rel="noreferrer">
									{ __( 'Get your key here', 'astra-sites' ) }
								</a>
							</p>
							<p>
								<a href="https://wpastra.com/support/free-support/" target="_blank" rel="noreferrer">
									{ __( 'Need help?', 'astra-sites' ) }
								</a>
							</p>
						</div>
					&gt;
				) }
				{ ! alreadyPurchasedClicked &amp;&amp; (
					
						<button classname="px-3 py-2 rounded-md gap-2 flex !mt-1" onclick="{" whitelabelenabled getwhitelabellink : getaccesslink>
							{ __( 'Get Access', 'astra-sites' ) }
							<arrowrighticon classname="w-4 h-4 text-zip-dark-theme-heading"></arrowrighticon>
						</button>
						<div classname="text-center">
							<a href="#" classname="w-fill h-hug" onclick="{" handleclick>
								{ __( 'Already purchased?', 'astra-sites' ) }
							</a>
						</div>
					&gt;
				) }
			</div>
		&gt;
	);
};

export default LicenseValidation;
</body></html>
