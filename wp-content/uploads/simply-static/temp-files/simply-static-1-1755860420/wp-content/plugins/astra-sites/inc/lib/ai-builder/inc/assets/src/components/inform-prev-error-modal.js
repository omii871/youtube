<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { memo, renderToString, useState } from '@wordpress/element';
import Modal from './modal';
import { useSelect, useDispatch } from '@wordpress/data';
import { ExclamationTriangleColorfulIcon } from '../ui/icons';
import ModalTitle from './modal-title';
import { __, sprintf } from '@wordpress/i18n';
import Button from './button';
import { STORE_KEY } from '../store';
import { RadioGroup } from '@headlessui/react';
import { useNavigateSteps } from '../router';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import apiFetch from '@wordpress/api-fetch';
import { setLocalStorageItem, toastBody } from '../helpers';
import { Tooltip } from 'react-tooltip';
import toast from 'react-hot-toast';

const supportLink = (
	<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" aibuildervars.supportlink target="_blank" classname="text-accent-st" rel="noreferrer">
		{ __( 'here', 'ai-builder' ) }
	</a>
);

const InformPreviousErrorModal = ( {
	open,
	setOpen,
	onConfirm,
	errorString,
} ) =&gt; {
	const { nextStep } = useNavigateSteps();
	const {
		setWebsiteInfoAIStep,
		updateImportAiSiteData,
		setWebsiteNameAIStep,
		setWebsiteImagesAIStep,
		setWebsiteLanguageAIStep,
		setWebsiteSelectedTemplateAIStep,
		setFullOnboardingState,
	} = useDispatch( STORE_KEY );

	// const handleBack = () =&gt; {
	// 	if ( typeof setOpen !== 'function' ) {
	// 		return;
	// 	}
	// 	setOpen( false );
	// };

	const handleConfirm = () =&gt; {
		if ( typeof onConfirm !== 'function' ) {
			return;
		}
		onConfirm();
	};
	const { failedSites } = useSelect( ( select ) =&gt; {
		const { getFailedSites } = select( STORE_KEY );

		return {
			failedSites: getFailedSites(),
		};
	}, [] );

	const [ selected, setSelected ] = useState(
		failedSites?.length &gt; 0 ? failedSites[ 0 ] : ''
	);

	function classNames( ...classes ) {
		return classes.filter( Boolean ).join( ' ' );
	}

	const setStepData = async ( stepData ) =&gt; {
		try {
			const response = await apiFetch( {
				path: 'zipwp/v1/set-step-data',
				method: 'POST',
				headers: {
					'X-WP-Nonce': aiBuilderVars.rest_api_nonce,
				},
				data: {
					business_details: JSON.stringify( stepData ),
				},
			} );
			console.log( response );
			if ( response.success ) {
				console.log( 'Data reset!' );
			} else {
				//  Handle error.
				throw new Error( response?.data?.data );
			}
		} catch ( error ) {
			toast.error( toastBody( error ) );
		}
	};

	const retryImport = async () =&gt; {
		const websiteData = selected;
		await setStepData( websiteData?.step_data );
		setLocalStorageItem(
			'ai-builder-onboarding-details',
			websiteData?.local_storage
		);

		setFullOnboardingState( {
			stepData: {
				...websiteData?.local_storage.stepData,
			},
		} );
		setWebsiteInfoAIStep( websiteData );
		setWebsiteNameAIStep( websiteData.businessName );
		setWebsiteLanguageAIStep( websiteData?.step_data?.language );
		setWebsiteImagesAIStep( websiteData?.step_data?.images );
		setWebsiteSelectedTemplateAIStep( websiteData?.step_data?.template );
		updateImportAiSiteData( {
			templateId: websiteData?.uuid,
			importErrorMessages: {},
			importErrorResponse: [],
			importError: false,
			reset: true,
		} );
		nextStep();
	};

	const convertToUTC = ( dateString ) =&gt; {
		const date = new Date( dateString );
		return date.toUTCString();
	};

	return (
		<modal open="{" setopen="{" classname="sm:w-full sm:max-w-2xl">
			<modaltitle>
				<exclamationtrianglecolorfulicon classname="w-6 h-6 text-alert-success"></exclamationtrianglecolorfulicon>
				<h5 classname="text-lg text-zip-app-heading">
					{ __(
						'Problem Detected in Previous Site Creation!',
						'ai-builder'
					) }
				</h5>
			</modaltitle>
			<p classname="!mt-3 text-sm leading-5 font-normal text-zip-body-text">
				{ __(
					'We encountered the following errors while creating your previous site:',
					'ai-builder'
				) }
			</p>
			<div classname="!my-4">
				<div classname="mb-4 text-zip-body-text text-sm font-normal leading-6 p-3 border border-solid border-border-primary rounded-md">
					{ errorString ||
						__(
							'Not enough information to display.',
							'ai-builder'
						) }
				</div>

				{ failedSites?.length &gt; 0 ? (
					<p classname="!mb-4 text-sm leading-5 font-normal text-zip-body-text" dangerouslysetinnerhtml="{" __html: sprintf translators: support link __ you want to retry the import select a saved site below then click on button. or contact our rendertostring supportlink></p>
				) : (
					<p classname="!mb-4 text-sm leading-5 font-normal text-zip-body-text" dangerouslysetinnerhtml="{" __html: sprintf translators: support link __ you proceed without fixing these issues may encounter the same errors again which could exhaust your ai site creation attempts. if need help feel free to contact us do still want continue rendertostring supportlink></p>
				) }
				<tooltip id="{" classname="z-50 h-fit max-w-96 md:max-w-[544px] !text-[14px]"></tooltip>
				<div classname="max-h-52 overflow-y-auto failed-site-container overflow-x-hidden w-auto">
					<fieldset aria-label="Privacy setting" classname="flex flex-col"></fieldset>
					<radiogroup value="{" selected onchange="{" setselected classname="overflow-visible" style="{" width:>
						{ failedSites?.map( ( failedSite, settingIdx ) =&gt; (
							<radiogroup.option key="{" failedsite.businessname value="{" failedsite classname="{" checked>
									classNames(
										settingIdx === 0
											? 'rounded-tl-md rounded-tr-md'
											: '',
										settingIdx === failedSites.length - 1
											? 'rounded-bl-md rounded-br-md'
											: '',
										'group relative flex cursor-pointer border border-gray-200 px-3 py-[10px] focus:outline-none items-center',
										checked
											? 'bg-zip-app-highlight-bg border-border-tertiary z-10'
											: ''
									)
								}
							&gt;
								{ ( { checked } ) =&gt; (
									
										<span classname="{" classnames checked border border-accent-hover-st : border-border-tertiary size-5 cursor-pointer items-center justify-center rounded-full p->
											<span classname="{" classnames checked rounded-full bg-accent-st : bg-transparent></span>
										</span>
										<span classname="ml-3 flex flex-col">
											<radiogroup.label as="span" classname="{" classnames text-sm font-semibold text-slate-900>
												{ failedSite.businessName }
											</radiogroup.label>
											<radiogroup.description as="span" classname="{" classnames text-sm relative group mt-0.5>
												<span data-tooltip-id="{" data-tooltip-content="{" failedsite.businessdesc classname="block text-sm text-body-text font-normal truncate max-w-96 md:max-w-[544px]">
													{ failedSite.businessDesc }
												</span>
											</radiogroup.description>
											<p classname="text-xs leading-5 font-normal text-secondary-text mt-0.5">
												{ __(
													'Created On: ',
													'ai-builder'
												) +
													convertToUTC(
														failedSite.created
													) }
											</p>
										</span>
									&gt;
								) }
							</radiogroup.option>
						) ) }
					</radiogroup>
				</div>

				{ failedSites?.length &gt; 0 &amp;&amp; (
					<p classname="!my-4 text-xs leading-5 font-normal text-secondary-text flex">
						<exclamationcircleicon classname="w-5 h-5 mr-2"></exclamationcircleicon>
						{ __(
							'Importing saved sites won&rsquo;t be exhausting your AI site generation count.',
							'ai-builder'
						) }
					</p>
				) }
				<div classname="space-x-4 flex justify-between">
					{ failedSites?.length &gt; 0 &amp;&amp; (
						<button classname="w-full shadow-lg" variant="primary" onclick="{" retryimport>
							{ __( 'Retry Import', 'ai-builder' ) }
						</button>
					) }
					<button classname="w-full shadow-lg" variant="{" classnames failedsites> 0 ? 'white' : 'primary'
						) }
						onClick={ handleConfirm }
					&gt;
						{ __( 'Start Building', 'ai-builder' ) }
					</button>
				</div>
			</div>
		</modal>
	);
};

export default memo( InformPreviousErrorModal );
</p></body></html>
