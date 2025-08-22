<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import {
	ClipboardIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { STORE_KEY } from '../store';
import { getLocalStorageItem, removeLocalStorageItem } from '../helpers';
import { defaultOnboardingAIState } from '../store/reducer';
import Modal from './modal';
import Button from './button';
import { useNavigateSteps } from '../router';
import { ExclamationTriangleColorfulIcon } from '../ui/icons';
import ModalTitle from './modal-title';
import { renderToString } from '@wordpress/element';
import { copyToClipboard, deleteCookie } from '../utils/helpers';

const supportLink = (
	<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" aibuildervars.supportlink target="_blank" classname="text-accent-st" rel="noreferrer">
		{ __( 'contact support', 'ai-builder' ) }
	</a>
);

const ConfirmationStartOverModal = () =&gt; {
	const {
		setContinueProgressModal,
		setConfirmationStartOverModal,
		setWebsiteOnboardingAIDetails,
	} = useDispatch( STORE_KEY );
	const { navigateTo } = useNavigateSteps();
	const { confirmationStartOverModal } = useSelect( ( select ) =&gt; {
		const { getConfirmationStartOverModalInfo } = select( STORE_KEY );
		return {
			confirmationStartOverModal: getConfirmationStartOverModalInfo(),
		};
	}, [] );

	const handleStartOver = () =&gt; {
		setConfirmationStartOverModal( { open: false } );
		removeLocalStorageItem( 'ai-builder-onboarding-details' );
		setWebsiteOnboardingAIDetails( defaultOnboardingAIState );
		setContinueProgressModal( { open: false } );
		deleteCookie( 'ai-show-start-over-warning' ); // Clear the cookie.
		navigateTo( {
			to: '/',
			replace: true,
		} ); // Navigate to the first step
	};

	const handleContinue = () =&gt; {
		setConfirmationStartOverModal( { open: false } );
		setContinueProgressModal( { open: false } );
	};

	const savedData = getLocalStorageItem( 'ai-builder-onboarding-details' );
	const { primaryText = '', errorText = '' } =
		savedData?.importSiteProgressData?.importErrorMessages || {};
	const error = `${
		primaryText?.message || primaryText
	} ${ errorText }`.trim();
	const errorString = error ? JSON.stringify( error ) : '';

	const handleCopyDetails = () =&gt; {
		const errorInfo =
			errorString ||
			__( 'Not enough information to display.', 'ai-builder' );
		const businessName = savedData?.websiteInfo?.businessName || '';
		const description = savedData?.websiteInfo?.businessDesc || '';
		const uuid = savedData?.websiteInfo?.uuid || '';
		const details = `Error: ${ errorInfo }\nBusiness Name: ${ businessName }\nDescription: ${ description }\nUUID: ${ uuid }`;

		copyToClipboard( details );
	};

	return (
		<modal open="{" confirmationstartovermodal setopen="{" toggle type> {
				if ( type === 'close-icon' ) {
					setConfirmationStartOverModal( { open: false } );
					setContinueProgressModal( { open: true } );
				}
			} }
			className="sm:w-full sm:max-w-2xl"
		&gt;
			<modaltitle>
				<exclamationtrianglecolorfulicon classname="w-6 h-6 text-alert-success"></exclamationtrianglecolorfulicon>
				<h5 classname="text-lg text-zip-app-heading">
					{ __( 'Start Over?', 'ai-builder' ) }
				</h5>
			</modaltitle>
			<div classname="!mt-3 text-sm leading-5 font-normal text-zip-body-text">
				{ __(
					'Starting over will reset your previous session and consume an additional AI credit.',
					'ai-builder'
				) }
			</div>
			<div classname="!mt-3 text-sm leading-5 font-normal text-zip-body-text">
				{ __(
					'Would you like to continue, or return to your previous session?',
					'ai-builder'
				) }
			</div>
			<div classname="!mt-3 text-sm leading-5 font-normal text-zip-body-text">
				{ __( 'Previous Session Details', 'ai-builder' ) }
			</div>
			<div classname="!my-4">
				<div classname="relative mb-4 p-3 border border-solid border-border-primary rounded-md">
					<button classname="absolute top-3 right-3 w-4" onclick="{" handlecopydetails title="{" __ details to clipboard aria-label="{">
						<clipboardicon></clipboardicon>
					</button>
					<p classname="text-zip-body-text text-xs font-normal leading-6 mr-5">
						<b>{ __( 'Error:', 'ai-builder' ) }</b>{ ' ' }
						{ errorString ||
							__(
								'Not enough information to display.',
								'ai-builder'
							) }
					</p>
					<p classname="text-zip-body-text text-xs font-normal leading-6">
						<b>{ __( 'Business Name:', 'ai-builder' ) }</b>{ ' ' }
						{ savedData?.websiteInfo?.businessName }
					</p>
					<p classname="text-zip-body-text text-xs font-normal leading-6">
						<b>{ __( 'Description:', 'ai-builder' ) }</b>{ ' ' }
						{ savedData?.websiteInfo?.businessDesc }
					</p>
					<p classname="text-zip-body-text text-xs font-normal leading-6">
						<b>{ __( 'UUID:', 'ai-builder' ) }</b>{ ' ' }
						<code classname="font-medium">
							{ savedData?.websiteInfo?.uuid }
						</code>
					</p>
				</div>

				<p classname="!mt-4 text-xs leading-5 font-normal text-secondary-text flex">
					<exclamationcircleicon classname="w-5 h-5 mr-2"></exclamationcircleicon>
					{ __(
						'Importing saved sites won&rsquo;t be exhausting your AI site generation count.',
						'ai-builder'
					) }
				</p>
				<p classname="!mt-4 text-xs leading-5 font-normal text-secondary-text flex">
					<exclamationcircleicon classname="min-w-5 h-5 mr-2"></exclamationcircleicon>
					<span dangerouslysetinnerhtml="{" __html: sprintf translators: contact us link __ the issue persists after multiple attempts please for assistance. copy and share above details with our support team to help resolve quickly. rendertostring supportlink></span>
				</p>

				<div classname="flex items-center gap-3 justify-center mt-8 flex-col xs:flex-row">
					<button type="submit" variant="primary" size="medium" classname="min-w-[206px] text-sm font-semibold leading-5 px-5 w-full xs:w-auto" onclick="{" handlecontinue>
						{ __( 'Resume Previous Session', 'ai-builder' ) }
					</button>
					<button variant="white" size="medium" onclick="{" handlestartover classname="min-w-[206px] text-sm font-semibold leading-5 w-full xs:w-auto">
						{ __( 'Start Over', 'ai-builder' ) }
					</button>
				</div>
			</div>
		</modal>
	);
};

export default ConfirmationStartOverModal;
</p></body></html>
